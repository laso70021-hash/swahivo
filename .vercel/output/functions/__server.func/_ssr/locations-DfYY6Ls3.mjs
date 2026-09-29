import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as locations } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locations-DfYY6Ls3.js
var import_jsx_runtime = require_jsx_runtime();
function LocationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Popular locations",
		subtitle: "Explore verified stock in six Tanzanian cities — from Stone Town to the capital.",
		image: "/images/locations/arusha.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-container grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3",
		children: locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/locations/$slug",
			params: { slug: loc.slug },
			className: "group overflow-hidden rounded-2xl border border-line bg-paper shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-48",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: loc.image,
						alt: loc.name,
						className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-3 left-4 text-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: loc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-paper/80",
							children: [loc.count.toLocaleString(), " properties"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-4 text-sm leading-relaxed text-muted",
				children: loc.blurb
			})]
		}, loc.slug))
	})] });
}
//#endregion
export { LocationsPage as component };
