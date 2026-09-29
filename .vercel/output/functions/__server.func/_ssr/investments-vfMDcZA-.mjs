import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as properties } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investments-vfMDcZA-.js
var import_jsx_runtime = require_jsx_runtime();
function InvestmentsPage() {
	const picks = properties.filter((p) => [
		"villa",
		"condo",
		"commercial",
		"plot"
	].includes(p.propertyType));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Invest in real estate",
		subtitle: "Yield-led villas, hotel-managed condos, commercial floors, and titled land.",
		image: "/images/misc/cta-villa.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					["Zanzibar yield", "Hotel-managed condos and beach villas with audited occupancy."],
					["Dar commercial", "CBD floors and light industrial along the Morogoro corridor."],
					["Capital growth", "Dodoma apartments and Arusha plots as the map of demand shifts."]
				].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line p-6 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-ink",
						children: t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: b
					})]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 mb-5 text-xl font-bold text-ink",
				children: "Investment listings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: picks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					"Talk to",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/agents",
						className: "font-medium text-brand",
						children: "an agent"
					}),
					" ",
					"before you underwrite a deal."
				]
			})
		]
	})] });
}
//#endregion
export { InvestmentsPage as component };
