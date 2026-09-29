import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { w as ArrowRight } from "../_libs/lucide-react.mjs";
import { w as cn } from "./router-DPAXHcoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/section-CCysDrR7.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("py-14 sm:py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "site-container",
			children
		})
	});
}
function SectionHeading({ title, to, linkLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-7 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-bold tracking-tight text-ink sm:text-[22px]",
			children: title
		}), to ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-brand",
			children: [linkLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		}) : null]
	});
}
function PageBanner({ title, subtitle, image }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative isolate overflow-hidden bg-ink",
		children: [
			image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-50"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-container relative py-14 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight text-paper sm:text-4xl",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-paper/80 sm:text-base",
					children: subtitle
				}) : null]
			})
		]
	});
}
//#endregion
export { Section as n, SectionHeading as r, PageBanner as t };
