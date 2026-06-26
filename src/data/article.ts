import type { ArticleSection } from "@/lib/types";

export const sections: ArticleSection[] = [
  {
    id: "opening",
    title: "What I built",
    paragraphs: [
      "RAMEN is the system I built to run browser-capable agents on real user tasks. I started it from an empty repository in late December 2025 and spent the next four months turning a rough idea into a working implementation. It grew into two halves that talk over HTTP and SSE: a FastAPI backend that runs the agent loop, and a React SPA paired with a Chrome extension that gives the agent access to the user's browser. I owned every step of that arc: planning the product, designing the architecture and UX, building it out, and validating it as it grew.",
      "I worked from a Notion doc that I kept open alongside the code, full of research, dated checklists, tradeoffs, and ideas that did not survive contact with the implementation. The article below walks the same arc, told from the parts I was personally responsible for.",
    ],
  },
  {
    id: "name",
    title: "Where the name came from",
    paragraphs: [
      "I wanted a name that named what the system does rather than what it is built from. RAMEN is a backronym for the loop the agent runs on every task:",
    ],
    items: [
      "**R**eason — Think before acting.",
      "**A**ct — Execute reliably.",
      "**M**onitor — Verify outcomes.",
      "**E**volve — Learn continuously.",
      "**N**avigate — Move toward the goal.",
    ],
  },
  {
    id: "agent-runtime",
    title: "The agent runtime",
    paragraphs: [
      "The first backend slice was a single request path, but I planned for a real runtime from the start: configurable agents, a tool registry, multiple model providers, and room for subagents. I spent the first week laying out the backend around domain-driven boundaries: domain entities, use cases, repositories, presentation schemas, and infrastructure adapters, wired together through a central dependency-injection module. That early discipline paid off later, when I added LangGraph middleware, swapped LLM providers, and introduced subagents without rewriting the API surface.",
      "On top of that scaffolding I built the agent layer as a thin wrapper over LangChain and LangGraph rather than reimplementing them. I added a tool registry exposed through middleware, reasoning-effort handling for OpenAI's reasoning models, and provider-specific LLM profiles so each agent can carry its own model configuration. When the product needed to force a specific tool, I customised LangGraph's state to mutate `tool_choice` at bind time. LangChain's built-in `LLMToolSelectorMiddleware` solves a different problem (selecting which tools the model sees), so it did not fit.",
      "Subagents came later. After reading Sydney Runkle's notes on multi-agent architectures, I decided RAMEN needed delegated execution rather than orchestrated handoffs. The new subagents share the same tool registry and streaming protocol as the main agent, which kept the frontend changes small and let me ship the capability incrementally.",
    ],
  },
  {
    id: "conversation-loop",
    title: "The conversation loop",
    paragraphs: [
      "Persistent, user-owned conversations are the part of the product users actually feel, so I treated them as the spine of the product. I built the conversation and message APIs with cursor pagination, ownership checks, title generation, and search, then wired them into the frontend sidebar, command palette, and reopen flows. Each conversation is scoped by tenant and user, and per-user provider keys are resolved at request time so the agent always runs against the right account.",
      "Streaming was the harder problem, and it shaped a lot of the rest of the work. I designed a framework-agnostic SSE event shape covering text deltas, tool calls, tool results, token usage, final state, and disconnect signals, then wired the frontend to coalesce keystroke-rate updates with `requestAnimationFrame` so the interface stays responsive under load. Aborts had to work at three layers: the user's stop button, the server's request cancellation, and the upstream provider. I learned along the way that OpenAI streaming cancellation is not actually feasible through the LangChain adapter, so I documented the limitation and made sure partial responses still persist correctly when a turn is interrupted.",
    ],
  },
  {
    id: "browser-automation",
    title: "Browser automation",
    paragraphs: [
      "Letting a remote agent use the user's local browser was the single most-discussed design problem in the project. Before writing any of it, I worked through five candidate paths in Notion: DevTools MCP, a network tunnel, a custom bridge, an extension paired with WebSocket RPC, and a Chromium-API-driven approach. I picked the extension and WebSocket route because it kept browser permissions in the user's hand, stayed inside Chrome's security model, and let me ship a working slice without operating shared infrastructure.",
      "From there the build split cleanly across the two repos. On the backend, I added a WebSocket relay with a one-time ticket handshake, browser-only routing safeguards, and live tool updates so the agent's view of browser state matches the user's. On the frontend, the extension surfaces controlled-tab context and writes it into ephemeral run context so the agent can act on whatever page the user is currently looking at. Once that core path was solid, I layered a browser-use subagent on top to delegate to a specialised browser agent through the same registry.",
    ],
  },
  {
    id: "browser-subagent",
    title: "Hardening the browser subagent",
    paragraphs: [
      "Once the browser subagent was running real sessions, traces showed it failing in repeatable ways: clicking empty upvote arrows, timing out on elements addressed by position, declaring success after a login redirect, inventing placeholder values for fields it could not read. I built an eval suite of roughly two dozen browser tasks scored on five axes (correctness, recovery, hallucination, latency, tool-use shape) and ran it against every patch.",
      "The backend fixes split across the prompt and the runtime. Rewriting the subagent's prompt around snapshot-first interaction and visible-text element naming, then raising its step budget from 25 to 50, cleared the visible failure modes. A subtler one lived in the Pydantic-translation layer between the extension's tool schemas and the agent framework: it had been silently injecting empty defaults the model never sent, which broke the extension's Zod validation on every call. Handing the schemas through directly deleted both the layer and the failure mode.",
      "On the frontend, the biggest win was an ergonomics problem dressed up as a perf problem. The single verb the model used to fill text inputs did double duty: a flag controlled replace versus append, but the agent had no clean way to signal intent and kept cycling through fallbacks. Splitting it into two verbs deleted the ambiguity, and swapping the focus path from three simulated mouse events to a direct focus call cut a fill from about 5,000ms to 40ms. The suite went from missing several cases to passing all of them; the worst case dropped from over a hundred seconds to under seventy.",
    ],
  },
  {
    id: "frontend-surface",
    title: "The frontend surface",
    paragraphs: [
      "I first used the frontend as a tiny SPA for exercising the backend, then turned it into the surface for starting, steering, and inspecting agent runs. I scaffolded the React app first with the architectural pieces I knew I would need: Zustand stores, an API client with tenant and user headers, a feature-folder layout, settings pages, a command palette, conversation search, responsive sidebar behaviour, and a small feature-flag system. Once that frame was in place, I started iterating on the main interaction surface itself.",
      "Most of the interaction polish lives in the composer: keyboard shortcuts, prompt suggestions, attachment chips, a slash menu, inline tab mentions with favicons, queued sends, and a stop control that maps cleanly onto the streaming-abort protocol. Markdown and Streamdown render the assistant's text; tool indicators and parallel-tool views render its actions. The smaller details, like focus handling, auto-scroll, mobile layout, and long-text overflow, are what make the surface feel finished.",
      "Automation visibility was its own thread of work. I added a CDP session indicator and a glowing frame around the controlled tab so users could see when the agent was actually driving their browser. The first version was plain CSS, but it felt too quiet next to the rest of the UI, so I rebuilt it as a WebGL pulsing-border shader.",
    ],
  },
  {
    id: "quality",
    title: "Quality, security, and performance",
    paragraphs: [
      "Validating the system grew into its own track of work as the surface area expanded. I added tests around domain and use-case behaviour, search repositories, streaming, and the agent services themselves, and treated the WebSocket and API-key paths as real security boundaries: request-scoped ownership checks, a one-time ticket for the relay, narrow tool schemas, and a clear separation between user-injected provider keys and internal config.",
      "Performance came in passes as the system grew. The streaming pipeline alone needed LLM-instance caching to avoid reconnect churn, RAF-batched store updates to keep React from re-rendering on every token, and stream coalescing so multi-tool turns render in a stable order. Memoisation and render cleanup in the message list closed the rest of the gap.",
    ],
  },
  {
    id: "next",
    title: "What's next",
    paragraphs: [
      "Looking back across the four months, the part I am most proud of is that the system is still growable. A handful of next steps have not shipped yet: context compaction through middleware, generative UI for tool output, agent skills, MCP integration, and a sandbox layer for tools that need stronger isolation. Each one slots into a seam I left open by design, rather than forcing a rewrite.",
    ],
  },
];
