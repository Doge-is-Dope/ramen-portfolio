import type { ArticleSection } from "@/lib/types";

export const sections: ArticleSection[] = [
	{
		id: "opening",
		title: "What I built",
		paragraphs: [
			"RAMEN is an enterprise platform for browser-capable agents. As the founding engineer, I took it from an empty repository to production, shaping the product and architecture while building the FastAPI backend, React SPA, and Chrome extension. The system runs the agent loop, streams its work into chat, and lets delegated agents act through the user's own browser. Research, traces, and measured failures drove the design from the first prototype to the production runtime.",
		],
	},
	{
		id: "system-architecture",
		title: "System overview",
		paragraphs: [
			"RAMEN connects a remote agent runtime to the user's own browser. I separated the chat client, backend execution, and local browser control so each has an explicit responsibility: the client presents the work, the backend reasons and delegates, and the extension executes browser actions inside Chrome's permission model.",
		],
		diagram: {
			kind: "system",
			caption: "The agent runs remotely; browser actions stay local.",
		},
		details: [
			"The React client sends chat requests over HTTP and receives SSE responses, or uses WebSocket for both chat and streamed events. In the extension, that same WebSocket also carries browser tool calls and results. The frontend forwards those calls to the service worker through Chrome runtime messages; the service worker controls the target tab through CDP.",
			"The backend uses MongoDB for conversations, messages, and checkpoints; Redis for one-time WebSocket tickets; and Cognito for authentication. Model providers and Tavily supply inference and web search. These supporting services sit behind the backend boundary.",
		],
	},
	{
		id: "backend-architecture",
		title: "Backend boundaries",
		paragraphs: [
			"I split the backend into presentation, application, domain, and infrastructure responsibilities so changes to providers or storage would have clear places to land. Use cases coordinate product behavior through domain contracts, while adapters supply the concrete runtime and persistence implementations.",
		],
		diagram: {
			kind: "backend",
			caption: "Use cases depend on contracts; adapters implement them.",
		},
		details: [
			"Thin routers expose use cases such as `ChatUseCase`. Plain dataclass entities such as `Conversation` and `Message`, together with repository and service protocols, live in the domain. Application events define what a running turn emits. Infrastructure adapts LangGraph output to those events and implements the domain's service and repository contracts. `AppContainer` wires the concrete implementations together.",
			"Each agent carries a model profile, while a provider-neutral factory resolves credentials per request so user keys and model overrides never leak into shared state. Composable LangGraph middleware adds tool monitoring and delegation. Subagents reuse the tool registry and event protocol, keeping specialised browser execution within the existing public interface.",
		],
	},
	{
		id: "streaming-runtime",
		title: "Streaming and frontend runtime",
		paragraphs: [
			"Streaming crosses the whole product, so I defined an application event contract that both transports can carry. A turn enters through HTTP or WebSocket, runs through the same use case and agent runtime, then returns as ordered message blocks in the client.",
		],
		diagram: {
			kind: "runtime",
			caption: "One event pipeline serves both SSE and WebSocket.",
		},
		details: [
			"`EventTranslator` normalises LangGraph output into application events for text, tools, usage, and subagent activity. `ChatUseCase` manages message lifecycle and persistence; `ChatEventSerializer` produces shared payloads before the transport frames them as SSE or WebSocket JSON. On the client, a stream processor assembles partial tool input and results into message blocks, even when the user moves to another conversation.",
			"Cancellation connects the stop control, server task, and provider where supported. Partial responses persist, and a LangGraph checkpointer retains state for the next turn. Short-interval batching and a separate animation-frame reveal keep token-heavy streams smooth without re-rendering on every packet.",
		],
	},
	{
		id: "browser-automation",
		title: "Browser automation",
		paragraphs: [
			"The hardest boundary was letting a remote agent control a local browser without moving browser permissions to the server. After comparing five approaches, I paired a Chrome extension with a WebSocket relay. A specialised subagent requests tools; the extension frontend relays them to the service worker that actually executes them.",
		],
		diagram: {
			kind: "browser-relay",
			caption:
				"The frontend relays calls; the service worker executes them locally.",
		},
		details: [
			"The frontend opens the socket with an origin-bound, one-time Redis ticket instead of a JWT in the URL. It registers tool schemas, which the backend validates before creating proxy tools. An `update_tools` message refreshes the available tool set when the active tab changes without reconnecting.",
			"For each call, the frontend sends a `CDP_TOOL_CALL` Chrome runtime message to the service worker. One `chrome.debugger` session resolves the target, runs CDP commands, tracks network idle, and releases after inactivity. The returned result travels back over WebSocket and resolves the dispatcher’s pending tool call, allowing the agent to continue.",
		],
	},
	{
		id: "hardening-evaluation",
		title: "Hardening and evaluation",
		paragraphs: [
			"Real sessions exposed repeatable failures: empty-name clicks, position-based element references, fabricated login values, and actions taken without a fresh page read. I turned those traces into 26 scored browser tasks and used affected-case reruns followed by full-suite checks to assess fixes across prompting, runtime contracts, and browser execution.",
		],
		diagram: {
			kind: "evaluation",
			caption: "Turn observed failures into fixes, then check the full suite.",
		},
		details: [
			"Snapshot-first instructions addressed interaction errors; passing tool schemas through directly stopped an intermediate Pydantic layer from injecting defaults that failed Zod validation. Splitting fill and type into explicit verbs removed model ambiguity, and replacing simulated mouse focus with direct focus cut one measured fill from 5.20 seconds to 0.04.",
			"The documented 2026-04-29 summary reports 26/26 passing after reruns and zero hallucinations. Some captures required driver fixes, and the multi-tab case remained flagged as unstable. This is a dated evaluation result with follow-ups, not a claim that every run passes. The five scoring dimensions are correctness, faithfulness, efficiency, rule adherence, and recovery; the 1.5× minimum-step threshold is an efficiency criterion, not a reported suite-wide measurement.",
		],
	},
];
