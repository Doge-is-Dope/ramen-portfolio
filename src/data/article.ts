import type { ArticleSection } from "@/lib/types";

export const sections: ArticleSection[] = [
	{
		id: "opening",
		title: "What I built",
		paragraphs: [
			"RAMEN is an enterprise platform for running browser-capable agents on real user tasks. I built it as the founding engineer, from an empty repository in December 2025 to a system running in production. It combines a FastAPI backend that runs the agent loop with a React SPA and Chrome extension that let the agent work through the user's browser.",
			"I owned the full arc: I planned the product, designed the architecture and the UX, built out the backend and frontend, wired in the browser, and evaluated the whole thing. I kept a Notion doc open alongside the code, full of research, dated checklists, tradeoffs, and ideas that did not survive contact with the implementation. Traces and measured failures kept revising the design as it grew.",
		],
	},
	{
		id: "system-architecture",
		title: "System architecture",
		paragraphs: [
			"I split the backend into layers and inverted the dependencies. The domain stays free of framework and persistence: plain dataclass entities and repository protocols, with entity-to-document mappers keeping Mongo out of everything above them. Use cases orchestrate on top, the routers stay thin, and one AppContainer wires it together. That discipline paid off later, when new middleware, subagents, and providers slotted into existing seams without reshaping the API.",
			"Each agent carries its own model profile, and I resolve credentials per request behind a provider-neutral factory: a user's stored keys win, and server settings are the fallback. I cache the default-config clients so they are not rebuilt on every turn, while any request that carries its own keys or a model override stays isolated from that cache.",
			"The agent runtime is a thin layer over LangChain and LangGraph rather than a reimplementation of them. Product behavior lives in middleware, so tool selection, monitoring, prompt context, and delegation each evolve on their own. When the product needed to force a specific tool, I mutated LangGraph's `tool_choice` at bind time; LangChain's built-in `LLMToolSelectorMiddleware` solves a different problem (filtering which tools the model sees), so it did not fit.",
			"Subagents came later. After reading [Sydney Runkle's article](https://www.langchain.com/blog/choosing-the-right-multi-agent-architecture) on multi-agent architectures, I chose delegated execution over orchestrated handoffs. The subagents reuse the main agent's tool registry and streaming protocol, which let me add specialised browser execution without touching the public chat interface.",
		],
		diagram: {
			kind: "system",
			caption:
				"Three planes and what connects them: the user's browser (a React SPA plus extension) reaches the FastAPI backend over HTTP and SSE for chat and a `ws-ticket`-gated WebSocket for browser tools, and the backend leans on Cognito, Redis, MongoDB, the model providers, and Tavily.",
		},
	},
	{
		id: "conversation-streaming",
		title: "Persistent conversations and streaming",
		paragraphs: [
			"Persistent, user-owned conversations are the spine of the product, so I treated them that way. I built the conversation and message APIs with cursor pagination, tenant-and-user ownership checks, title generation, and search across titles and message content, then wired them into the sidebar, command palette, and reopen flows. Each conversation is scoped by tenant and user, so the agent always runs against the right account.",
			"Streaming was the harder problem, and it shaped much of the rest of the work. I designed a framework-neutral event shape covering text deltas, tool calls, tool results, token usage, and final state, then translated it into SSE only at the presentation boundary, so the frontend never depends on LangChain's emitter. On the client, I correlate partial tool state into the right blocks and keep each turn ordered, even when the user moves between conversations.",
			"Stopping a run has to line up three layers: the user's stop button, the server's task cancellation, and the upstream provider. I found that OpenAI streaming cancellation is not actually feasible through the LangChain adapter, so I documented the limitation and made sure partial responses still persist. A LangGraph checkpointer then lets the next turn resume from the last recorded message instead of a fresh transcript.",
		],
		diagram: {
			kind: "runtime",
			caption:
				"The backend's clean-architecture layers, and the agent runtime that turns a chat request into an SSE stream.",
		},
	},
	{
		id: "browser-automation",
		title: "Browser automation",
		paragraphs: [
			"Letting a remote agent drive the user's local browser was the single most-discussed design problem in the project. I worked through five candidate paths in Notion before choosing an extension paired with a WebSocket relay: it keeps browser permissions in the user's hands, stays inside Chrome's security model, and ships a working slice without me operating shared infrastructure.",
			"The connection opens with an origin-bound, one-time ticket, which replaced a JWT-in-query-param scheme that would have leaked tokens through extension logs. From there the extension advertises a bounded set of browser capabilities, the backend validates them and exposes them to the delegated browser agent, and results return over the same socket. An `update_tools` message rebinds the available tools mid-session when the controlled tab changes, so a navigation does not force a reconnect.",
			"On the browser side, I manage a single `chrome.debugger` (CDP) session that resolves the controlled tab, runs validated commands, tracks network-idle state, and releases after inactivity. Its lifecycle also drives an in-app indicator and a controlled-tab overlay, so a security-sensitive background capability stays visible while the agent is driving.",
		],
		diagram: {
			kind: "browser-relay",
			caption:
				"One browser tool call, end to end: from the agent across the WebSocket into the extension's `chrome.debugger`, then back as a `ToolMessage`.",
		},
	},
	{
		id: "hardening-evaluation",
		title: "Hardening and evaluation",
		paragraphs: [
			"Once the browser subagent was running real sessions, traces showed it failing in repeatable ways: clicking empty upvote arrows, timing out on elements addressed by position, declaring success after a login redirect, and inventing placeholder values for fields it could not read. I turned those traces into a 26-case browser suite scored on five axes (correctness, faithfulness, efficiency, rule adherence, and recovery), then ran the affected cases and the full suite as regression gates before every patch.",
			"The fixes crossed prompting, runtime contracts, and browser execution. Rewriting the subagent's prompt around snapshot-first interaction and visible-text element naming cleared the visible failure modes. A subtler one lived in the Pydantic translation layer between the extension's tool schemas and the agent framework: it was silently injecting empty defaults the model never sent, which broke the extension's Zod validation on every call. Handing the schemas through directly deleted both the layer and the failure mode.",
			"The last class of fixes was ergonomic. One verb filled text inputs, with a flag switching replace versus append, and the agent kept cycling through fallbacks because it had no clean way to signal intent; splitting it into explicit fill and type verbs removed the ambiguity. Swapping the focus path from three simulated mouse events to a direct focus call cut a fill from 5.20 seconds to 0.04 seconds. The latest full run passed 26 of 26, with a 70-second p95.",
		],
	},
	{
		id: "frontend-runtime",
		title: "Frontend runtime",
		paragraphs: [
			"The frontend started as a tiny SPA for exercising the backend and became the surface for starting, steering, and inspecting agent runs. It coordinates three asynchronous boundaries: SSE for agent output, a WebSocket for browser work, and extension messaging for local tab context and control state. I kept each transport behind a feature-level runtime facade, so React components consume product state instead of constructing integration clients.",
			"A stream processor correlates partial-JSON tool input, results, and delegated subagent work into the right message block. Foreground, background, and message caches keep a run alive when the user opens another conversation. To stay smooth under load, I batch keystroke-rate deltas on a short timer and reveal streamed text on a separate animation-frame loop, so React does not re-render on every packet. The same state model drives text, tool, and browser-control views across desktop and mobile.",
			"Most of the interaction polish lives in the composer: a slash menu, attachment chips, queued sends, and atomic tab mentions that carry favicon and URL and clear after each send, so yesterday's selection never rides along on tomorrow's question. The controlled-tab overlay started as plain CSS, but it felt too quiet next to the rest of the UI, so I rebuilt it as a WebGL shader.",
		],
	},
	{
		id: "what-this-proved",
		title: "What this proved",
		paragraphs: [
			"RAMEN took an ambiguous agent product from research to an enterprise platform in production, and I owned every layer of it: backend architecture, model integration, streaming protocols, browser security, and interaction design. The decisions I am proudest of were not features but the seams, the ones that let me add middleware, another provider, and a browser subagent without reshaping the API or the frontend's event handling.",
			"It also sharpened how I debug cross-layer systems. I leaned on traces to separate model mistakes from contract and execution failures, turned those findings into repeatable evals, and measured the paths where performance actually mattered. Owning the full stack is what made it possible to fix the real bottleneck instead of optimising whichever layer was easiest to see.",
		],
	},
	{
		id: "name",
		title: "Why the name RAMEN",
		paragraphs: [
			"I wanted a name that described what the system does rather than what it is built from. RAMEN is a backronym for the loop the agent runs on every task:",
		],
		items: [
			"**R**eason: Think before acting.",
			"**A**ct: Execute reliably.",
			"**M**onitor: Verify outcomes.",
			"**E**volve: Refine the strategy from feedback.",
			"**N**avigate: Move toward the goal.",
		],
	},
];
