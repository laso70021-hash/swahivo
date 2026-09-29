import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as slugify, d as useUserListings, u as useSession } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/add-listing-CD0LfjSg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddListingPage() {
	const user = useSession((s) => s.user);
	const add = useUserListings((s) => s.add);
	const navigate = useNavigate();
	const [deal, setDeal] = (0, import_react.useState)("sale");
	const [type, setType] = (0, import_react.useState)("house");
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Add a listing",
		subtitle: "Sign in to publish a verified property on Swahivo.",
		image: "/images/properties/modern-house.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "You need to be logged in to list a property."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "mt-5 inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover",
			children: "Log in to continue"
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Add Listing",
		subtitle: "Reach serious buyers and renters across Tanzania. We review documents before going live.",
		image: "/images/properties/beach-villa.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "site-container max-w-2xl space-y-4 py-12",
		onSubmit: (e) => {
			e.preventDefault();
			const fd = new FormData(e.currentTarget);
			const title = String(fd.get("title") || "");
			const city = String(fd.get("city") || "");
			const areaName = String(fd.get("area") || "");
			const price = Number(fd.get("price") || 0);
			const bedsRaw = String(fd.get("beds") || "");
			const bathsRaw = String(fd.get("baths") || "");
			const area = Number(fd.get("size") || 0);
			const description = String(fd.get("description") || "");
			const id = `${slugify(title) || "listing"}-${Date.now()}`;
			add({
				id,
				title,
				city,
				areaName,
				price,
				listingType: deal,
				propertyType: type,
				beds: bedsRaw ? Number(bedsRaw) : null,
				baths: bathsRaw ? Number(bathsRaw) : null,
				area,
				description
			});
			toast.success("Listing submitted for review.");
			navigate({
				to: "/listings/$id",
				params: { id }
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "title",
					required: true,
					placeholder: "Modern 4-Bedroom House",
					className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["City", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "city",
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Dar es Salaam" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Zanzibar" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Arusha" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Mwanza" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Dodoma" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Tanga" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["Area / neighbourhood", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "area",
						required: true,
						placeholder: "Mbezi Beach",
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["Buy or rent", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: deal,
						onChange: (e) => setDeal(e.target.value),
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "sale",
							children: "For sale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "rent",
							children: "For rent"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["Property type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: type,
						onChange: (e) => setType(e.target.value),
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "house",
								children: "House"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "apartment",
								children: "Apartment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "villa",
								children: "Villa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "plot",
								children: "Plot"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "commercial",
								children: "Commercial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "condo",
								children: "Condo"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium sm:col-span-2",
						children: ["Price (TZS)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "price",
							required: true,
							type: "number",
							min: 1,
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium",
						children: ["Beds", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "beds",
							type: "number",
							min: 0,
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium",
						children: ["Baths", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "baths",
							type: "number",
							min: 0,
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Area (m²)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "size",
					required: true,
					type: "number",
					min: 1,
					className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "description",
					required: true,
					rows: 5,
					className: "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover",
				children: "Submit listing"
			})
		]
	})] });
}
//#endregion
export { AddListingPage as component };
