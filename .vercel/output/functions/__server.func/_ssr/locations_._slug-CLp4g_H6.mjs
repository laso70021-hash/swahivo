import { X as notFound, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as propertiesForCity, g as getLocation, n as Route } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locations_._slug-CLp4g_H6.js
var import_jsx_runtime = require_jsx_runtime();
function LocationPage() {
	const { slug } = Route.useParams();
	const loc = getLocation(slug);
	if (!loc) throw notFound();
	const list = propertiesForCity(loc.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: loc.name,
		subtitle: loc.blurb,
		image: loc.image
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					list.length,
					" featured ",
					list.length === 1 ? "listing" : "listings"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/listings",
				search: {
					city: loc.name,
					q: loc.name
				},
				className: "text-sm font-medium text-brand hover:text-brand-hover",
				children: ["View all in ", loc.name]
			})]
		}), list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "rounded-xl border border-line bg-canvas px-6 py-12 text-center text-sm text-muted",
			children: [
				"New listings for ",
				loc.name,
				" are coming soon."
			]
		})]
	})] });
}
//#endregion
export { LocationPage as component };
