import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as properties, c as toProperty, d as useUserListings, o as Route$10, s as filterProperties } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
import { t as SearchPanel } from "./search-panel-H7rXXchN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listings-7wfSXjuF.js
var import_jsx_runtime = require_jsx_runtime();
function ListingsPage() {
	const search = Route$10.useSearch();
	const extras = useUserListings((s) => s.extras).map(toProperty);
	const results = filterProperties([...extras, ...properties], search);
	const title = search.deal === "rent" ? "Properties for Rent" : search.deal === "sale" ? "Properties for Sale" : "All Listings";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title,
		subtitle: "Verified homes, apartments, villas, plots and commercial space across Tanzania.",
		image: "/images/locations/dar-es-salaam.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {
				variant: "page",
				initial: search
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: [
					results.length,
					" ",
					results.length === 1 ? "property" : "properties",
					" ",
					"found"
				]
			}),
			results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-xl border border-line bg-canvas px-6 py-12 text-center text-sm text-muted",
				children: "No properties match those filters. Try a wider search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
			})
		]
	})] });
}
//#endregion
export { ListingsPage as component };
