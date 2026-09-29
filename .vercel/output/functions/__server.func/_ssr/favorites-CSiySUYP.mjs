import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as properties, c as toProperty, d as useUserListings, l as useFavorites } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CSiySUYP.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const ids = useFavorites((s) => s.ids);
	const saved = [...useUserListings((s) => s.extras).map(toProperty), ...properties].filter((p) => ids.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Saved properties",
		subtitle: "Homes you have hearted — stored on this device.",
		image: "/images/properties/luxury-apt.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-container py-12",
		children: saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-line bg-canvas px-6 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "You have not saved any properties yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/listings",
				className: "mt-5 inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover",
				children: "Browse listings"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: saved.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
		})
	})] });
}
//#endregion
export { FavoritesPage as component };
