import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as agents } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-QOY8nEDC.js
var import_jsx_runtime = require_jsx_runtime();
function AgentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Our Agents",
		subtitle: "Local specialists across Dar es Salaam, Zanzibar, Arusha, Mwanza, Dodoma and Tanga.",
		image: "/images/locations/dar-es-salaam.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-container grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3",
		children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/agents/$id",
			params: { id: agent.id },
			className: "overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: agent.photo,
				alt: agent.name,
				className: "h-56 w-full object-cover object-top"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-ink",
						children: agent.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: agent.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs font-medium text-brand",
						children: [agent.listings, " active listings"]
					})
				]
			})]
		}, agent.id))
	})] });
}
//#endregion
export { AgentsPage as component };
