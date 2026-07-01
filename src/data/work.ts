import type { WorkEntry } from "@/lib/types";

export const work: WorkEntry[] = [
	{
		id: "layered-backend",
		title: "Layered backend: domain, application, infrastructure, presentation",
		summary:
			"Framework-free dataclass entities and repository protocols in the domain, use cases in the application layer, entity-to-document mappers isolating Mongo, and thin presentation routers, all wired through one AppContainer. The split paid off when middleware, subagents, and providers slotted into existing seams without rewriting the API.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "appcontainer-di",
		title: "Centralised dependency-injection container",
		summary:
			"AppContainer manages tool registry, LLM factory, agent service, and session services with lazy initialization. Replaced module-level singletons so tests no longer have to monkey-patch globals.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "per-user-multi-provider-keys",
		title: "Per-user, multi-provider API keys",
		summary:
			"Request-scoped resolution of user credentials behind a provider-neutral factory, with per-provider model validation. Each agent run uses the right user's keys without any global config.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "atomic-conversation-ownership",
		title: "Atomic conversation ownership across every read and write",
		summary:
			"Ownership filter pushed into the query, not layered on after, so a missing scope can't leak data. Safe-delete ordering and request-scoped checks fell out of the same pass.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "llm-profile-dto",
		title: "Typed LLMProfile DTO replacing untyped profile dicts",
		summary:
			"Pydantic model for external GraphQL profile data with camelCase aliasing, provider extraction, and reasoning-effort validation. Removed `dict[str, Any]` from the agent boundary.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "fulltext-conversation-search",
		title: "Conversation search via Mongo $text indexes",
		summary:
			"Search by title and message content with cursor pagination. Orchestration lives in a use case, not the repository, so the query path stays under domain control.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "langgraph-middleware-stack",
		title: "LangGraph middleware stack on top of LangChain",
		summary:
			"Composable layers (DynamicToolChoice, ToolMonitor, SubAgent, prompt context) instead of subclassing the agent. Each middleware is independently testable and addable.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "dynamic-tool-choice",
		title: "DynamicToolChoiceMiddleware mutating state at bind time",
		summary:
			"Forces a specific tool when the product needs it, by mutating LangGraph's `tool_choice` between turns. LangChain's built-in selector solves a different problem (filtering visible tools), so I wrote this layer.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "subagent-middleware",
		title: "SubAgentMiddleware for delegated execution",
		summary:
			"Ephemeral subagents share the parent's tool registry and streaming protocol, so the frontend only needs to know about one event shape. Lazy init keeps the cold path quiet.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "llm-instance-cache",
		title: "Per-(provider, model) LLM instance cache with TTL",
		summary:
			"Avoids reconnecting to the upstream provider on every turn, which was the dominant tail-latency source under streaming load.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "subagent-event-isolation",
		title: "Subagent event isolation in the parent stream",
		summary:
			"Distinct `SubagentStart`, `SubagentTextDelta`, and `SubagentToolCallStart` events let the frontend show delegated work without conflating it with the parent turn's tokens.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "framework-agnostic-sse",
		title: "Framework-agnostic SSE event shape",
		summary:
			"Text deltas, tool calls, tool results, token usage, finish reason, and disconnect signals. Designed against the contract, not the LangChain emitter, so the frontend code is portable across providers.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "three-layer-abort",
		title: "Three-layer abort: stop button, server, provider",
		summary:
			"User cancellation, request scope, and upstream provider abort wired together. OpenAI streaming cancellation isn't actually feasible through LangChain's adapter, so I documented that and made sure partial responses still persist.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "checkpointer-resume",
		title: "Resume-from-partial after abort with a LangGraph checkpointer",
		summary:
			"Mongo-backed checkpoint saver scoped by `conversation_id`. After an abort, the next turn starts from the last persisted message, not from a fresh transcript.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "chat-event-serializer",
		title:
			"Event translation and SSE serialization split from the stream service",
		summary:
			"An EventTranslator normalizes LangGraph events into framework-agnostic app events, and the SSE build functions own block-index correlation and framing. The stream service is now a thin transport that doesn't know about content blocks.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "ws-ticket-handshake",
		title: "WebSocket relay with one-time Redis ticket handshake",
		summary:
			"Origin-bound, hashed-key tickets with 60s TTL and atomic consume. Replaced JWT-in-query-param auth, which would have leaked tokens through extension logs.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-proxy-schema",
		title: "Browser proxy tool with dynamic schema-to-LangChain conversion",
		summary:
			"Converts JSON schemas from the extension into StructuredTools at session start. Depth, property-count, and enum-cardinality guards keep a hostile schema from blowing up the agent.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "live-tool-updates",
		title: "Live tool updates over the open WebSocket",
		summary:
			"An `update_tools` message rebinds the agent's available tools mid-session when the controlled tab changes. Avoided tearing down and reissuing tickets on every navigation.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-subagent-prompt-hardening",
		title: "Snapshot-first browser subagent prompt with raised step budget",
		summary:
			"Subagent now requires a fresh page snapshot before any interaction, addresses elements by visible text rather than row position, and verifies the post-navigation URL before claiming success. Per-spec step budget raised from 25 to 50 so multi-step form flows finish without hitting the cap.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-subagent-eval",
		title: "Eval suite for the browser subagent",
		summary:
			'26 browser tasks scored on five axes: correctness, faithfulness, efficiency, rule adherence, and recovery. Turns a vague "it broke" report into a specific failing case and gates every patch before it ships.',
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "feature-folder-spa",
		title: "Feature-folder SPA layout with module runtime facades",
		summary:
			"Each feature owns its module/, components/, hooks/, lib/, and __tests__/. A small create-feature script enforces the shape so new features always look the same.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "feature-toggles",
		title: "Environment-aware feature toggle system",
		summary:
			"Local-only flags (tool debug, SSE inspector) and always-on flags (suggestions, agent config) in one registry. Persists to localStorage; a settings tab exposes them with friendly names.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "tenant-user-api-client",
		title: "Tenant- and user-aware API client",
		summary:
			"Axios instance with `X-Tenant-ID`/`X-User-ID` headers, EAB-extension token fetch, and 401 retry. The rest of the app talks to one client, not five.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "ws-tool-registry",
		title: "Pluggable WebSocket client tool registry",
		summary:
			"Modules register and unregister tools at runtime through a `(name, definition, implementation)` signature. CDP tools, tab access, and content capture all live behind the same interface.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "create-feature-cli",
		title: "Interactive create-feature scaffolder script",
		summary:
			"Bun script generates a new feature module's directory shape, adds it to the toggle registry, and validates kebab-case naming. Stops new features from drifting in shape.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "composer",
		title: "Composer with mention pills, slash menu, and attachment chips",
		summary:
			"Multi-line input with Cmd+Enter to send, Shift+Enter for newline, queued sends while a turn is in flight, and a stop control wired to the abort protocol. The composer is where most of the chat polish lives.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "atomic-mention-pills",
		title: "Atomic @-mention pills with tab metadata",
		summary:
			"Contenteditable tokens with favicon, title, and URL. Caret-aware deletion, drag-select, and keyboard support. Feels like a real tag input, not a regex on a textarea.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "tool-indicator",
		title: "Tool indicator with running shimmer and parallel-tool view",
		summary:
			"Collapsible per-tool panel with a shimmer running state, a special web-search affordance, and a consolidated row when several tools fire in parallel. Replaced an early one-line spinner.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "streamdown-render",
		title: "Streamdown render with syntax-highlighted code",
		summary:
			"Replaced vanilla markdown with Streamdown plus the code plugin. Streaming-aware, doesn't reflow on every token, and code blocks finally look right under heavy delta load.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "command-palette",
		title: "Command palette with conversation search",
		summary:
			"Cmd+K (and Cmd+Shift+O) opens three modes: new chat, settings, and search. Relative date labels, request deduplication so stale results don't overwrite fresh ones.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "infinite-sidebar",
		title: "Sidebar with infinite-scroll cursor pagination",
		summary:
			"Date-grouped conversation list, rename and delete inline, optimistic updates, loading skeletons. Built on shadcn primitives so it matches the rest of the chrome.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "raf-stream-coalescer",
		title:
			"Stream coalescer with short-interval batching and smooth text reveal",
		summary:
			"Buffers keystroke-rate deltas and flushes them on a short interval to stabilise the order of multi-tool turns; a separate animation-frame loop reveals streamed text smoothly. Keeps the chat responsive under streaming load.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "frontend-three-layer-abort",
		title: "Three-layer abort wired through the conversation store",
		summary:
			"abortKey-keyed registry with AbortError handled gracefully. The stop button, route changes, and reload all converge on the same path so partial responses don't get orphaned.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "stream-processor",
		title: "Stream processor with partial-JSON tool input",
		summary:
			"Extracted from the conversation store. Accumulates partial JSON for tool inputs, embeds tool results into the right block, and tracks subagent state alongside the parent turn.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "cdp-session-manager",
		title: "CDP session manager with target resolution and idle release",
		summary:
			"Single CDP session per browser, resolves target tab (current vs. new), runs tool calls, and releases on 60s idle. Show/hide overlay and screenshot/snapshot caches hang off the session lifecycle.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "webgl-overlay-shader",
		title: "WebGL shader for the controlled-tab overlay",
		summary:
			"Replaced a CSS glowing frame that felt too quiet next to the rest of the UI. Custom vertex and fragment shaders, 60fps RAF loop, debounced fade-out after the last tool call.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "cdp-tool-suite",
		title: "CDP tool suite with narrowed schemas",
		summary:
			"Click, type, navigate, wait_for_selector, snapshot, and ~40 more, all schema-validated client-side before dispatch. Actionability checks live next to tool execution.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "ephemeral-tab-context",
		title: "Selected-tab ephemeral context attached to messages",
		summary:
			"Current tabs feed into a per-message context field and clear after send. Stops yesterday's selection from quietly riding along on tomorrow's question.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "cdp-fill-verb-split",
		title:
			"CDP fill and type split into separate verbs with a direct focus path",
		summary:
			"Replace versus append used to be a flag on a single verb, leaving the agent cycling through fallbacks. Splitting them deleted the ambiguity. Swapped the field-focus path from three simulated mouse events to a direct focus call: a fill dropped from 5.20s to 0.04s.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "react-compiler-vendor-chunks",
		title: "React Compiler with vendor chunk splitting",
		summary:
			"Auto-memoisation in production builds and a Vite chunking pass that keeps the streaming hot path off the cold path. Smaller, cache-friendlier bundles.",
		category: "Performance",
		surface: "Frontend",
	},
	{
		id: "streamdown-memo",
		title: "Streamdown isAnimating prop for mid-stream memoisation",
		summary:
			"Tells Streamdown to short-circuit re-renders mid-token-stream and only do a final pass when the turn finishes. Removed the worst of the message-list jank.",
		category: "Performance",
		surface: "Frontend",
	},
	{
		id: "background-stream-persistence",
		title: "Background stream persistence with local cache",
		summary:
			"A run keeps accumulating in a background-streams map when the user switches to another conversation, and re-attaches when they come back. Closes the loop where a long browser-tool turn used to look stuck.",
		category: "Performance",
		surface: "Frontend",
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
