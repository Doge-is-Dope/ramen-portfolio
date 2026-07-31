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
		title: "System architecture",
		paragraphs: [
			"I split the backend into domain, application, infrastructure, and presentation layers. Plain dataclass entities and repository protocols keep the domain independent of FastAPI and MongoDB; use cases orchestrate the work, thin routers expose it, and one AppContainer wires the system together. Those boundaries let new providers, middleware, and subagents slot into existing seams without reshaping the API.",
			"Each agent carries a model profile, while a provider-neutral factory resolves credentials per request so user keys and model overrides never leak into shared state. Product behavior sits in composable LangGraph middleware rather than a custom agent framework. Delegated subagents reuse the same tool registry and streaming protocol, adding specialised browser execution without creating a second public interface.",
		],
		diagram: {
			kind: "system",
			caption:
				"The browser, agent backend, and supporting services are separated by explicit HTTP, SSE, and WebSocket boundaries.",
		},
	},
	{
		id: "streaming-runtime",
		title: "Streaming and frontend runtime",
		paragraphs: [
			"Streaming crosses the whole product, so I defined an application event contract before choosing a transport. An EventTranslator normalises LangGraph output into text, tool, usage, and completion events; SSE framing happens only at the presentation boundary. On the client, a stream processor assembles partial tool input, results, and subagent activity into ordered message blocks, even when the user moves to another conversation.",
			"React coordinates three asynchronous paths: SSE for agent output, a WebSocket for browser work, and extension messages for local tab state. Cancellation connects the stop control, server task, and provider where supported, while partial responses persist and a LangGraph checkpointer resumes the next turn. Short-interval batching and a separate animation-frame reveal keep token-heavy streams smooth without re-rendering on every packet.",
		],
		diagram: {
			kind: "runtime",
			caption:
				"A chat request moves through clean-architecture layers into a transport-neutral agent event stream.",
		},
	},
	{
		id: "browser-automation",
		title: "Browser automation",
		paragraphs: [
			"The hardest boundary was letting a remote agent control a local browser without moving browser permissions to the server. After comparing five approaches, I paired a Chrome extension with a WebSocket relay. The extension stays inside Chrome's security model, exposes a bounded tool set, and keeps the controlled capability visible to the user while the backend delegates browser work to a specialised subagent.",
			"The socket opens with an origin-bound, one-time Redis ticket instead of a JWT in the URL. Tool schemas are validated before they become agent tools, and an `update_tools` message refreshes them when the active tab changes without reconnecting. In the extension, one `chrome.debugger` session resolves the target, runs CDP commands, tracks network idle, and releases after inactivity.",
		],
		diagram: {
			kind: "browser-relay",
			caption:
				"A browser tool call travels from the delegated agent to Chrome over the ticket-gated WebSocket and returns as a tool result.",
		},
	},
	{
		id: "hardening-evaluation",
		title: "Hardening and evaluation",
		paragraphs: [
			"Real sessions exposed repeatable failures: empty-name clicks, position-based element references, fabricated login values, and actions taken without a fresh page read. I turned those traces into 26 scored browser tasks covering correctness, faithfulness, efficiency, rule adherence, and recovery. Every fix ran against the affected cases and then the full suite before it could merge.",
			"The fixes crossed prompting, runtime contracts, and browser execution. Snapshot-first instructions removed visible interaction errors; passing tool schemas through directly stopped an intermediate Pydantic layer from injecting defaults that failed Zod validation. Splitting fill and type into explicit verbs removed model ambiguity, and replacing simulated mouse focus with direct focus cut one fill from 5.20 seconds to 0.04. The final suite passed 26/26 with zero hallucinations.",
		],
		diagram: {
			kind: "evaluation",
			caption:
				"Observed failures become scored cases, targeted fixes, and a full-suite regression gate.",
		},
	},
];
