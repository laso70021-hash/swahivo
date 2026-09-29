import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as faqs } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-CyDB5Gho.js
var import_jsx_runtime = require_jsx_runtime();
function FaqPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Frequently asked questions",
		subtitle: "Straight answers about listings, fees, and how Swahivo works.",
		image: "/images/blog/market.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-container max-w-3xl space-y-3 py-12",
		children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "group rounded-xl border border-line bg-paper px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer list-none font-semibold text-ink",
				children: f.q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-ink-soft",
				children: f.a
			})]
		}, f.q))
	})] });
}
//#endregion
export { FaqPage as component };
