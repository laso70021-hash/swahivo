import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Bath, S as BedDouble, _ as Heart, m as LandPlot } from "../_libs/lucide-react.mjs";
import { T as formatTzs, l as useFavorites, w as cn } from "./router-DPAXHcoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property-card-Se2iWSQF.js
var import_jsx_runtime = require_jsx_runtime();
function PropertyCard({ property }) {
	const fav = useFavorites((s) => s.has(property.id));
	const toggle = useFavorites((s) => s.toggle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow,transform] duration-200 hover:shadow-card-hover",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/listings/$id",
			params: { id: property.id },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[4/3] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: property.image,
						alt: property.title,
						className: "size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold text-paper", property.listingType === "sale" ? "bg-brand" : "bg-rent"),
						children: property.listingType === "sale" ? "For Sale" : "For Rent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": fav ? "Remove from saved" : "Save property",
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							toggle(property.id);
						},
						className: "absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-paper/95 text-ink-soft shadow-sm transition-colors hover:text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", fav && "fill-brand text-brand") })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base font-bold tabular-nums text-ink",
						children: [formatTzs(property.price), property.listingType === "rent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-muted",
							children: " / month"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-[15px] font-semibold text-ink",
						children: property.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: property.location
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-4 text-xs text-muted",
						children: [
							property.beds != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-3.5" }),
									" ",
									property.beds
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-3.5" }), " —"]
							}),
							property.baths != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-3.5" }),
									" ",
									property.baths
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-3.5" }), " —"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandPlot, { className: "size-3.5" }),
									" ",
									property.area,
									" m²"
								]
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { PropertyCard as t };
