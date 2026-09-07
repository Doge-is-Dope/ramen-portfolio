import type { WorkEntry } from "@/lib/types";

export const work: WorkEntry[] = [
	{
		id: "layered-backend",
		title: "A layered backend that can grow with the product",
		summary:
			"Separated domain models, application use cases, infrastructure, and API routes, with dependencies wired through AppContainer. This gave middleware, subagents, and new providers a clear place to fit as the product grew.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "appcontainer-di",
		title: "One place to manage backend dependencies",
		summary:
			"Replaced module-level singletons with AppContainer, which creates tools, models, and services when they are needed. Tests can now supply their own dependencies without patching global state.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "per-user-multi-provider-keys",
		title: "API keys scoped to each user and provider",
		summary:
			"Each request resolves the user’s credentials and validates the selected model through a shared provider interface. Agent runs use that user’s keys without relying on global configuration.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "atomic-conversation-ownership",
		title: "Ownership checks built into conversation queries",
		summary:
			"Added ownership filters directly to every conversation read and write, so access is checked as part of the database operation. The same work covered deletion order and request-level checks.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "llm-profile-dto",
		title: "Typed model profiles at the agent boundary",
		summary:
			"Replaced untyped profile dictionaries with a Pydantic model for incoming GraphQL data. It handles field aliases, extracts the provider, and validates reasoning effort before the profile reaches the agent.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "fulltext-conversation-search",
		title: "Search across conversation titles and messages",
		summary:
			"Added full-text search with Mongo indexes and cursor pagination. An application use case coordinates the search, keeping that logic separate from database access.",
		category: "Architecture",
		surface: "Backend",
	},
	{
		id: "langgraph-middleware-stack",
		title: "An agent loop built from composable middleware",
		summary:
			"Added tool selection, tool monitoring, subagents, and prompt context as separate middleware layers. Each layer can be added and tested independently as the agent’s behavior evolves.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "dynamic-tool-choice",
		title: "Tool selection that can change between turns",
		summary:
			"Built middleware that updates LangGraph’s `tool_choice` when a flow requires a specific tool. This gives the application control over which tool runs next, beyond choosing which tools are available.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "subagent-middleware",
		title: "Subagents that share the parent’s tools and event format",
		summary:
			"Added short-lived subagents that use the parent’s tool registry and streaming protocol. The frontend handles a shared event format, and subagents are initialized only when needed.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "llm-instance-cache",
		title: "Reusing model instances across turns",
		summary:
			"Cached LLM instances by provider and model, with a time-to-live. Reusing them avoids reconnecting on every turn and addresses the main source of tail latency observed under streaming load.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "subagent-event-isolation",
		title: "Keeping subagent activity distinct in the stream",
		summary:
			"Added dedicated events for subagent starts, text updates, and tool calls. The frontend can show delegated work separately while it arrives through the parent’s stream.",
		category: "Agent loop",
		surface: "Backend",
	},
	{
		id: "framework-agnostic-sse",
		title: "A shared event format for streaming responses",
		summary:
			"Defined an SSE contract for text, tool calls and results, token usage, completion, and disconnects. The frontend consumes application events without depending on LangChain’s internal event format.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "three-layer-abort",
		title: "Connecting the stop button to server cancellation",
		summary:
			"Connected user cancellation to the request lifecycle and provider abort handling. Where the OpenAI streaming adapter in LangChain could not cancel upstream work, I documented the limitation and preserved partial responses.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "checkpointer-resume",
		title: "Picking up a conversation after a stopped response",
		summary:
			"Added Mongo-backed LangGraph checkpoints scoped to each conversation. After a response is stopped, the next turn resumes from the last saved message.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "chat-event-serializer",
		title: "Separating event translation from stream delivery",
		summary:
			"Moved LangGraph event translation and SSE formatting out of the stream service. Dedicated functions now handle content-block indexing and framing, leaving the service focused on delivering events.",
		category: "Streaming",
		surface: "Backend",
	},
	{
		id: "ws-ticket-handshake",
		title: "One-time tickets for the browser relay",
		summary:
			"Replaced JWTs in WebSocket URLs with origin-bound Redis tickets that expire after 60 seconds and can be used only once. Ticket keys are hashed, and authentication no longer puts JWTs in URLs that could appear in extension logs.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-proxy-schema",
		title: "Turning browser tool schemas into agent tools",
		summary:
			"Converted the extension’s JSON schemas into LangChain StructuredTools at session start. Limits on nesting, property counts, and enum sizes protect the conversion from oversized or hostile schemas.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "live-tool-updates",
		title: "Updating browser tools as the tab changes",
		summary:
			"Added an `update_tools` message so the agent’s available tools can change during a session. Navigation can refresh the tool set over the existing WebSocket connection without another ticket exchange.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-subagent-prompt-hardening",
		title: "Grounding browser actions in a fresh page snapshot",
		summary:
			"Updated the browser subagent’s instructions to require a fresh snapshot before interacting, locate elements by visible text, and verify the URL after navigation. Raised the per-spec step limit from 25 to 50 to give longer form flows room to finish.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "browser-subagent-eval",
		title: "An evaluation suite for browser tasks",
		summary:
			"Built a suite of 26 browser tasks scored on correctness, faithfulness, efficiency, rule adherence, and recovery. It provides specific cases to investigate when something breaks and a check for each patch before release.",
		category: "Browser automation",
		surface: "Backend",
	},
	{
		id: "feature-folder-spa",
		title: "A consistent home for each frontend feature",
		summary:
			"Organized each feature around its own module, components, hooks, utilities, and tests, with a facade for runtime access. A small scaffolding script gives new features the same starting structure.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "feature-toggles",
		title: "Feature controls in one shared registry",
		summary:
			"Brought local debugging tools and always-on product features into one environment-aware registry. Settings are saved in localStorage and exposed with readable names in a settings tab.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "tenant-user-api-client",
		title: "A shared API client with user and tenant context",
		summary:
			"Centralized tenant and user headers, extension token retrieval, and retries after a 401 response in one Axios client. Features use that client without repeating authentication and request setup.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "ws-tool-registry",
		title: "A shared registry for browser tools",
		summary:
			"Created a common interface for modules to register and unregister tools at runtime. CDP actions, tab access, and content capture each provide a name, definition, and implementation through the same registry.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "create-feature-cli",
		title: "A script to scaffold new frontend features",
		summary:
			"Built an interactive Bun script that creates a feature’s folders, adds it to the toggle registry, and checks its kebab-case name. It keeps routine setup consistent as new features are added.",
		category: "Architecture",
		surface: "Frontend",
	},
	{
		id: "composer",
		title: "A chat composer for messages, mentions, and attachments",
		summary:
			"Built a multiline composer with mention pills, a slash menu, and attachment chips. It supports keyboard shortcuts, queues messages during an active turn, and connects the stop button to response cancellation.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "atomic-mention-pills",
		title: "Tab mentions that behave as editable tokens",
		summary:
			"Built contenteditable mention pills that carry a tab’s favicon, title, and URL. Caret-aware deletion, drag selection, and keyboard support let users edit them naturally within a message.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "tool-indicator",
		title: "Showing tool activity as it happens",
		summary:
			"Replaced a one-line spinner with collapsible tool panels, an animated running state, and a dedicated web-search display. When several tools run in parallel, a combined row keeps their activity easy to follow.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "streamdown-render",
		title: "Markdown and code rendering during streaming",
		summary:
			"Integrated Streamdown and its code plugin to render incoming responses with syntax-highlighted code blocks. This reduced reflow as tokens arrived and kept code readable during longer streams.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "command-palette",
		title: "A command palette for chat, settings, and search",
		summary:
			"Added keyboard access through Cmd+K and Cmd+Shift+O, with modes for starting a chat, opening settings, and searching conversations. Results include relative dates, and request handling prevents older results from replacing newer ones.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "infinite-sidebar",
		title: "A conversation sidebar with incremental loading",
		summary:
			"Built a date-grouped conversation list with cursor pagination, inline rename and delete, optimistic updates, and loading placeholders. Shared shadcn components keep it consistent with the rest of the interface.",
		category: "Chat UI",
		surface: "Frontend",
	},
	{
		id: "raf-stream-coalescer",
		title: "Smoother text updates during busy streams",
		summary:
			"Batched incoming events at short intervals to keep multi-tool turns in order, then used a separate animation-frame loop to reveal text smoothly. This keeps chat responsive while responses and tool activity arrive together.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "frontend-three-layer-abort",
		title: "A shared cancellation path for active responses",
		summary:
			"Added an abort registry to the conversation store and handled cancellation errors explicitly. The stop button, navigation, and reload use the same cleanup path to preserve partial responses.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "stream-processor",
		title: "Processing tool inputs and results as they arrive",
		summary:
			"Extracted stream processing from the conversation store. It assembles partial JSON tool inputs, places results in the correct content block, and tracks subagent activity alongside the parent turn.",
		category: "Streaming",
		surface: "Frontend",
	},
	{
		id: "cdp-session-manager",
		title: "Managing browser sessions from connection to cleanup",
		summary:
			"Built a manager that maintains one CDP session per browser, selects the current or a new target tab, and releases the session after 60 seconds of inactivity. Overlays and screenshot and snapshot caches follow the same session lifecycle.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "webgl-overlay-shader",
		title: "A clearer visual cue for the controlled tab",
		summary:
			"Replaced the CSS frame with a WebGL overlay to make browser activity more visible. Custom shaders run on a 60fps animation loop, with a debounced fade-out after the last tool call.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "cdp-tool-suite",
		title: "Browser actions with validated inputs",
		summary:
			"Built tools for clicking, typing, navigation, selector waits, snapshots, and around 40 other actions. Inputs are checked against their schemas before dispatch, with actionability checks alongside execution.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "ephemeral-tab-context",
		title: "Tab context scoped to each message",
		summary:
			"Attached selected tabs to a per-message context field and cleared the selection after sending. Each message carries the tabs chosen for it, without silently reusing an earlier selection.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "cdp-fill-verb-split",
		title: "Separate fill and type actions for browser forms",
		summary:
			"Split replacing a field’s value and appending text into separate tools, removing a flag that had led the agent through repeated fallbacks. Replacing three simulated mouse events with a direct focus call also reduced a measured fill operation from 5.20s to 0.04s.",
		category: "Browser automation",
		surface: "Frontend",
	},
	{
		id: "react-compiler-vendor-chunks",
		title: "React Compiler and smaller vendor bundles",
		summary:
			"Enabled React Compiler for automatic memoization in production and split vendor code into Vite chunks. This separates frequently used streaming code from less-used code and produces smaller, more cache-friendly bundles.",
		category: "Performance",
		surface: "Frontend",
	},
	{
		id: "streamdown-memo",
		title: "Reducing re-renders while a response streams",
		summary:
			"Used Streamdown’s `isAnimating` prop to skip unnecessary rendering work during streaming and run a final pass when the response finishes. This reduced stuttering in the message list.",
		category: "Performance",
		surface: "Frontend",
	},
	{
		id: "background-stream-persistence",
		title: "Keeping responses running between conversations",
		summary:
			"Kept active responses in a background stream map when the user switches conversations, then reattached them on return. Long browser-tool runs continue collecting updates while the user is elsewhere in the app.",
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
