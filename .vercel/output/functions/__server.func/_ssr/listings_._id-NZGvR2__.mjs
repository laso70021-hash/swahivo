import { i as __toESM } from "../_runtime.mjs";
import { X as notFound, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Bath, S as BedDouble, _ as Heart, d as MapPin, l as Phone, m as LandPlot, o as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as formatTzs, b as properties, c as toProperty, d as useUserListings, h as getAgent, l as useFavorites, r as Route$1, v as getProperty, w as cn } from "./router-DPAXHcoz.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listings_._id-NZGvR2__.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PropertyPage() {
	const { id } = Route$1.useParams();
	const extras = useUserListings((s) => s.extras).map(toProperty);
	const property = getProperty(id) ?? extras.find((p) => p.id === id);
	if (!property) throw notFound();
	const agent = getAgent(property.agentId);
	const similar = properties.filter((p) => p.id !== property.id && p.city === property.city).slice(0, 3);
	const fav = useFavorites((s) => s.has(property.id));
	const toggle = useFavorites((s) => s.toggle);
	const [active, setActive] = (0, import_react.useState)(property.gallery[0] ?? property.image);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "site-container py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listings",
						className: "hover:text-ink",
						children: "Listings"
					}),
					" ",
					"/ ",
					property.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl bg-canvas",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: active,
							alt: property.title,
							className: "block aspect-[16/10] h-auto w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-4 gap-2",
						children: (property.gallery.length ? property.gallery : [property.image]).map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActive(src),
							className: cn("overflow-hidden rounded-lg border-2", active === src ? "border-brand" : "border-transparent"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "block h-20 w-full object-cover"
							})
						}, src))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("inline-flex rounded-md px-2 py-1 text-[11px] font-semibold text-paper", property.listingType === "sale" ? "bg-brand" : "bg-rent"),
								children: property.listingType === "sale" ? "For Sale" : "For Rent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 text-3xl font-bold tracking-tight text-ink",
								children: property.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 inline-flex items-center gap-1 text-sm text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
									" ",
									property.location
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-bold tabular-nums text-ink",
								children: [formatTzs(property.price), property.listingType === "rent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-muted",
									children: " / month"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(property.id),
								className: "mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", fav && "fill-brand text-brand") }), fav ? "Saved" : "Save"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-6 rounded-xl border border-line bg-canvas px-5 py-4 text-sm text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-4" }),
									" ",
									property.beds ?? "—",
									" Beds"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-4" }),
									" ",
									property.baths ?? "—",
									" Baths"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandPlot, { className: "size-4" }),
									" ",
									property.area,
									" m²"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-brand" }), " Verified listing"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 text-lg font-bold text-ink",
						children: "About this property"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft",
						children: property.description
					}),
					property.yearBuilt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["Year built: ", property.yearBuilt]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 text-lg font-bold text-ink",
						children: "Amenities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: property.amenities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink-soft",
							children: a
						}, a))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-paper p-5 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted",
								children: "Listed by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/agents/$id",
								params: { id: agent.id },
								className: "mt-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: agent.photo,
									alt: agent.name,
									className: "size-14 rounded-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-ink",
									children: agent.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: agent.role
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${agent.phone}`,
								className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
									" ",
									agent.phone
								]
							})
						]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "rounded-xl border border-line bg-paper p-5 shadow-card",
						onSubmit: (e) => {
							e.preventDefault();
							toast.success("Enquiry sent. An agent will call you shortly.");
							e.currentTarget.reset();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-ink",
							children: "Request a viewing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									name: "name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									name: "phone",
									type: "tel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									name: "email",
									type: "email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium text-ink",
									children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "message",
										rows: 4,
										defaultValue: `I am interested in ${property.title}.`,
										className: "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "h-11 w-full rounded-lg bg-brand text-sm font-semibold text-paper hover:bg-brand-hover",
									children: "Send enquiry"
								})
							]
						})]
					})]
				})]
			}),
			similar.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-5 text-xl font-bold text-ink",
					children: "Similar nearby"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: similar.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
				})]
			}) : null
		]
	});
}
function Field({ label, name, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-medium text-ink",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			required: true,
			className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
		})]
	});
}
//#endregion
export { PropertyPage as component };
