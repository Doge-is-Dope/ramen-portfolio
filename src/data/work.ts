import type { WorkEntry } from "@/lib/types";

export const work: WorkEntry[] = [
	{
		id: "ddd-layered-backend",
		title: "DDD-layered backend with five clean boundaries",
		summary:
			"Domain entities, use cases, protocols, repositories, and presentation schemas wired through a single DI module. The split paid off when middleware, subagents, and providers slotted into existing seams without rewriting the API.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-01",
	},
	{
		id: "appcontainer-di",
		title: "Centralised dependency-injection container",
		summary:
			"AppContainer manages tool registry, LLM factory, agent service, and session services with lazy initialization. Replaced module-level singletons so tests no longer have to monkey-patch globals.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "per-user-multi-provider-keys",
		title: "Per-user, multi-provider API keys",
		summary:
			"Request-scoped resolution of OpenAI, Anthropic, and Google credentials, with a model allowlist per provider. Each agent run uses the right user's keys without any global config.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-04",
	},
	{
		id: "atomic-conversation-ownership",
		title: "Atomic conversation ownership across every read and write",
		summary:
			"Ownership filter pushed into the query, not layered on after, so a missing scope can't leak data. Safe-delete ordering and request-scoped checks fell out of the same pass.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-03",
	},
	{
		id: "llm-profile-dto",
		title: "Typed LLMProfile DTO replacing untyped profile dicts",
		summary:
			"Pydantic model for external GraphQL profile data with camelCase aliasing, provider extraction, and reasoning-effort validation. Removed `dict[str, Any]` from the agent boundary.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-03",
	},
	{
		id: "fulltext-conversation-search",
		title: "Conversation search via Mongo $text indexes",
		summary:
			"Search by title and message content with cursor pagination. Orchestration lives in a use case, not the repository, so the query path stays under domain control.",
		category: "Architecture",
		surface: "Backend",
		shippedAt: "2026-02",
	},
	{
		id: "langgraph-middleware-stack",
		title: "LangGraph middleware stack on top of LangChain",
		summary:
			"Composable layers (DynamicToolChoice, ToolMonitor, SubAgent, prompt context) instead of subclassing the agent. Each middleware is independently testable and addable.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-01",
	},
	{
		id: "dynamic-tool-choice",
		title: "DynamicToolChoiceMiddleware mutating state at bind time",
		summary:
			"Forces a specific tool when the product needs it, by mutating LangGraph's `tool_choice` between turns. LangChain's built-in selector solves a different problem (filtering visible tools), so I wrote this layer.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-01",
	},
	{
		id: "subagent-middleware",
		title: "SubAgentMiddleware for delegated execution",
		summary:
			"Ephemeral subagents share the parent's tool registry and streaming protocol, so the frontend only needs to know about one event shape. Lazy init keeps the cold path quiet.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "llm-instance-cache",
		title: "Per-(provider, model) LLM instance cache with TTL",
		summary:
			"Avoids reconnecting to the upstream provider on every turn, which was the dominant tail-latency source under streaming load.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "reasoning-effort-typing",
		title: "Typed reasoning-effort and tool-choice across the codebase",
		summary:
			"Literal unions enforce OpenAI and LangChain spec compliance at the type level. Removed a class of `KeyError`s that only surfaced at LLM call time.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-01",
	},
	{
		id: "subagent-event-isolation",
		title: "Subagent event isolation in the parent stream",
		summary:
			"Distinct `SubagentStart`, `SubagentTextDelta`, and `SubagentToolCallStart` events let the frontend show delegated work without conflating it with the parent turn's tokens.",
		category: "Agent loop",
		surface: "Backend",
		shippedAt: "2026-02",
	},
	{
		id: "framework-agnostic-sse",
		title: "Framework-agnostic SSE event shape",
		summary:
			"Text deltas, tool calls, tool results, token usage, finish reason, and disconnect signals. Designed against the contract, not the LangChain emitter, so the frontend code is portable across providers.",
		category: "Streaming",
		surface: "Backend",
		shippedAt: "2026-01",
	},
	{
		id: "three-layer-abort",
		title: "Three-layer abort: stop button, server, provider",
		summary:
			"User cancellation, request scope, and upstream provider abort wired together. OpenAI streaming cancellation isn't actually feasible through LangChain's adapter, so I documented that and made sure partial responses still persist.",
		category: "Streaming",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "checkpointer-resume",
		title: "Resume-from-partial after abort with a LangGraph checkpointer",
		summary:
			"Mongo-backed checkpoint saver scoped by `conversation_id`. After an abort, the next turn starts from the last persisted message, not from a fresh transcript.",
		category: "Streaming",
		surface: "Backend",
		shippedAt: "2026-02",
	},
	{
		id: "chat-event-serializer",
		title: "Pulled the SSE serializer out of the stream service",
		summary:
			"ChatEventSerializer owns block-index correlation, orphan event filtering, and text coalescing. Stream service is now a thin transport that doesn't know about content blocks.",
		category: "Streaming",
		surface: "Backend",
		shippedAt: "2026-03",
	},
	{
		id: "ws-ticket-handshake",
		title: "WebSocket relay with one-time Redis ticket handshake",
		summary:
			"Origin-bound, hashed-key tickets with 60s TTL and atomic consume. Replaced JWT-in-query-param auth, which would have leaked tokens through extension logs.",
		category: "Browser automation",
		surface: "Backend",
		shippedAt: "2026-03",
	},
	{
		id: "browser-proxy-schema",
		title: "Browser proxy tool with dynamic schema-to-LangChain conversion",
		summary:
			"Converts JSON schemas from the extension into StructuredTools at session start. Depth, property-count, and enum-cardinality guards keep a hostile schema from blowing up the agent.",
		category: "Browser automation",
		surface: "Backend",
		shippedAt: "2026-03",
	},
	{
		id: "live-tool-updates",
		title: "Live tool updates over the open WebSocket",
		summary:
			"An `update_tools` message rebinds the agent's available tools mid-session when the controlled tab changes. Avoided tearing down and reissuing tickets on every navigation.",
		category: "Browser automation",
		surface: "Backend",
		shippedAt: "2026-03",
	},
	{
		id: "browser-subagent-prompt-hardening",
		title: "Snapshot-first browser subagent prompt with raised step budget",
		summary:
			"Subagent now requires a fresh page snapshot before any interaction, addresses elements by visible text rather than row position, and verifies the post-navigation URL before claiming success. Per-spec step budget raised from 25 to 50 so multi-step form flows finish without hitting the cap.",
		category: "Browser automation",
		surface: "Backend",
		shippedAt: "2026-04",
	},
	{
		id: "browser-subagent-eval",
		title: "Eval suite for the browser subagent",
		summary:
			'Roughly two dozen browser tasks scored on five axes: correctness, recovery, hallucination, latency, and tool-use shape. Turns vague "it broke" reports into a specific failing case and gates every patch before it ships.',
		category: "Browser automation",
		surface: "Backend",
		shippedAt: "2026-04",
	},
	{
		id: "singleton-middleware-perf",
		title: "Singleton middleware instances and lazy subagent init",
		summary:
			"Reused middleware across requests instead of reconstructing them per turn. Combined with lazy SubAgentMiddleware init, this cut the streaming hot path significantly.",
		category: "Performance",
		surface: "Backend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "feature-folder-spa",
		title: "Feature-folder SPA layout with module runtime facades",
		summary:
			"Each feature owns its module/, components/, hooks/, lib/, and __tests__/. A small create-feature script enforces the shape so new features always look the same.",
		category: "Architecture",
		surface: "Frontend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "feature-toggles",
		title: "Environment-aware feature toggle system",
		summary:
			"Local-only flags (tool debug, SSE inspector) and always-on flags (suggestions, agent config) in one registry. Persists to localStorage; a settings tab exposes them with friendly names.",
		category: "Architecture",
		surface: "Frontend",
		shippedAt: "2026-02",
	},
	{
		id: "tenant-user-api-client",
		title: "Tenant- and user-aware API client",
		summary:
			"Axios instance with `X-Tenant-ID`/`X-User-ID` headers, EAB-extension token fetch, and 401 retry. The rest of the app talks to one client, not five.",
		category: "Architecture",
		surface: "Frontend",
		shippedAt: "2026-01",
	},
	{
		id: "ws-tool-registry",
		title: "Pluggable WebSocket client tool registry",
		summary:
			"Modules register and unregister tools at runtime through a `(name, definition, implementation)` signature. CDP tools, tab access, and content capture all live behind the same interface.",
		category: "Architecture",
		surface: "Frontend",
		shippedAt: "2026-03",
	},
	{
		id: "create-feature-cli",
		title: "Interactive create-feature scaffolder script",
		summary:
			"Bun script generates a new feature module's directory shape, adds it to the toggle registry, and validates kebab-case naming. Stops new features from drifting in shape.",
		category: "Architecture",
		surface: "Frontend",
		shippedAt: "2026-02",
	},
	{
		id: "composer",
		title: "Composer with mention pills, slash menu, and attachment chips",
		summary:
			"Multi-line input with Cmd+Enter to send, Shift+Enter for newline, queued sends while a turn is in flight, and a stop control wired to the abort protocol. The composer is where most of the chat polish lives.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-03",
		updatedAt: "2026-04",
	},
	{
		id: "atomic-mention-pills",
		title: "Atomic @-mention pills with tab metadata",
		summary:
			"Contenteditable tokens with favicon, title, and URL. Caret-aware deletion, drag-select, and keyboard support. Feels like a real tag input, not a regex on a textarea.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "tool-indicator",
		title: "Tool indicator with running shimmer and parallel-tool view",
		summary:
			"Collapsible per-tool panel with a shimmer running state, a special web-search affordance, and a consolidated row when several tools fire in parallel. Replaced an early one-line spinner.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-02",
		updatedAt: "2026-03",
	},
	{
		id: "streamdown-render",
		title: "Streamdown render with syntax-highlighted code",
		summary:
			"Replaced vanilla markdown with Streamdown plus the code plugin. Streaming-aware, doesn't reflow on every token, and code blocks finally look right under heavy delta load.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "command-palette",
		title: "Command palette with conversation search",
		summary:
			"Cmd+K (and Cmd+Shift+O) opens three modes: new chat, settings, and search. Relative date labels, request deduplication so stale results don't overwrite fresh ones.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-02",
	},
	{
		id: "infinite-sidebar",
		title: "Sidebar with infinite-scroll cursor pagination",
		summary:
			"Date-grouped conversation list, rename and delete inline, optimistic updates, loading skeletons. Built on shadcn primitives so it matches the rest of the chrome.",
		category: "Chat UI",
		surface: "Frontend",
		shippedAt: "2026-02",
	},
	{
		id: "raf-stream-coalescer",
		title: "Stream coalescer with requestAnimationFrame batching",
		summary:
			"Buffers keystroke-rate text deltas and flushes them once per frame. Keeps the chat smooth under streaming load and stabilises the order of multi-tool turns.",
		category: "Streaming",
		surface: "Frontend",
		shippedAt: "2026-02",
		updatedAt: "2026-04",
	},
	{
		id: "frontend-three-layer-abort",
		title: "Three-layer abort wired through the conversation store",
		summary:
			"abortKey-keyed registry with AbortError handled gracefully. The stop button, route changes, and reload all converge on the same path so partial responses don't get orphaned.",
		category: "Streaming",
		surface: "Frontend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "stream-processor",
		title: "Stream processor with partial-JSON tool input",
		summary:
			"Extracted from the conversation store. Accumulates partial JSON for tool inputs, embeds tool results into the right block, and tracks subagent state alongside the parent turn.",
		category: "Streaming",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "cdp-session-manager",
		title: "CDP session manager with target resolution and idle release",
		summary:
			"Single CDP session per browser, resolves target tab (current vs. new), runs tool calls, and releases on 60s idle. Show/hide overlay and screenshot/snapshot caches hang off the session lifecycle.",
		category: "Browser automation",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "webgl-overlay-shader",
		title: "WebGL pulsing-border shader for the controlled-tab overlay",
		summary:
			"Replaced a CSS glowing frame that felt too quiet next to the rest of the UI. Custom vertex and fragment shaders, 60fps RAF loop, debounced fade-out after the last tool call.",
		category: "Browser automation",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "cdp-tool-suite",
		title: "CDP tool suite with narrowed schemas",
		summary:
			"Click, type, navigate, wait_for_selector, snapshot, and ~25 more, all schema-validated client-side before dispatch. Actionability checks live next to tool execution.",
		category: "Browser automation",
		surface: "Frontend",
		shippedAt: "2026-03",
		updatedAt: "2026-04",
	},
	{
		id: "ephemeral-tab-context",
		title: "Selected-tab ephemeral context attached to messages",
		summary:
			"Current tabs feed into a per-message context field and clear after send. Stops yesterday's selection from quietly riding along on tomorrow's question.",
		category: "Browser automation",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "cdp-fill-verb-split",
		title:
			"CDP fill and type split into separate verbs with a direct focus path",
		summary:
			"Replace versus append used to be a flag on a single verb, leaving the agent cycling through fallbacks. Splitting them deleted the ambiguity. Swapped the field-focus path from three simulated mouse events to a direct focus call: fill operations went from about 5,000ms to 40ms.",
		category: "Browser automation",
		surface: "Frontend",
		shippedAt: "2026-04",
	},
	{
		id: "react-compiler-vendor-chunks",
		title: "React Compiler with vendor chunk splitting",
		summary:
			"Auto-memoisation in production builds and a Vite chunking pass that keeps the streaming hot path off the cold path. Smaller, cache-friendlier bundles.",
		category: "Performance",
		surface: "Frontend",
		shippedAt: "2026-01",
		updatedAt: "2026-02",
	},
	{
		id: "streamdown-memo",
		title: "Streamdown isAnimating prop for mid-stream memoisation",
		summary:
			"Tells Streamdown to short-circuit re-renders mid-token-stream and only do a final pass when the turn finishes. Removed the worst of the message-list jank.",
		category: "Performance",
		surface: "Frontend",
		shippedAt: "2026-02",
	},
	{
		id: "background-stream-persistence",
		title: "Background stream persistence with local cache",
		summary:
			"Streams keep going when the tab loses focus, and results re-attach when the user comes back. Closes the loop where a long browser-tool turn used to look stuck.",
		category: "Performance",
		surface: "Frontend",
		shippedAt: "2026-01",
	},
];

if (import.meta.env.DEV) {
	const seen = new Set<string>();
	for (const entry of work) {
		if (seen.has(entry.id)) {
			throw new Error(`Duplicate work id: ${entry.id}`);
		}
		seen.add(entry.id);
	}
}
