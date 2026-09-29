import { X as notFound, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Mail, l as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Route$3, h as getAgent, x as propertiesForAgent } from "./router-DPAXHcoz.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents_._id-DUpL2wb4.js
var import_jsx_runtime = require_jsx_runtime();
function AgentPage() {
	const { id } = Route$3.useParams();
	const agent = getAgent(id);
	if (!agent) throw notFound();
	const listings = propertiesForAgent(agent.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "site-container py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/agents",
					className: "hover:text-ink",
					children: "Agents"
				}),
				" ",
				"/ ",
				agent.name
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-8 lg:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-xl border border-line bg-paper p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: agent.photo,
						alt: agent.name,
						className: "aspect-[3/4] w-full rounded-lg object-cover object-top"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-xl font-bold text-ink",
						children: agent.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: agent.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: ["Languages: ", agent.languages.join(", ")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${agent.phone}`,
						className: "mt-4 flex items-center gap-2 text-sm font-medium text-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
							" ",
							agent.phone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${agent.email}`,
						className: "mt-2 flex items-center gap-2 text-sm text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
							" ",
							agent.email
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm leading-relaxed text-ink-soft",
					children: agent.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 max-w-md space-y-3 rounded-xl border border-line bg-canvas p-5",
					onSubmit: (e) => {
						e.preventDefault();
						toast.success(`Message sent to ${agent.name}.`);
						e.currentTarget.reset();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold text-ink",
							children: ["Contact ", agent.name.split(" ")[0]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							placeholder: "Your name",
							className: "h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							placeholder: "Email",
							className: "h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 4,
							placeholder: "How can they help?",
							className: "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover",
							children: "Send message"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-10 mb-5 text-xl font-bold text-ink",
					children: ["Listings by ", agent.name.split(" ")[0]]
				}),
				listings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: listings.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No listings at the moment."
				})
			] })]
		})]
	});
}
//#endregion
export { AgentPage as component };
