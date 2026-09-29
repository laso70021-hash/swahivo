import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Store, g as House, m as LandPlot, n as Warehouse, w as ArrowRight, x as Building2, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { C as propertyTypes, b as properties, p as blogPosts, y as locations } from "./router-DPAXHcoz.mjs";
import { n as Section, r as SectionHeading } from "./section-CCysDrR7.mjs";
import { t as PropertyCard } from "./property-card-Se2iWSQF.mjs";
import { t as SearchPanel } from "./search-panel-H7rXXchN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-zw--ArbG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var typeIcons = {
	apartment: Building2,
	house: House,
	villa: House,
	plot: LandPlot,
	commercial: Store,
	condo: Warehouse
};
function HomePage() {
	const featured = properties.filter((p) => p.featured).slice(0, 8);
	const locRail = (0, import_react.useRef)(null);
	const areaRail = (0, import_react.useRef)(null);
	function scroll(ref, dir) {
		ref.current?.scrollBy({
			left: dir * 280,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate min-h-[520px] overflow-hidden sm:min-h-[580px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "Luxury living room in a tropical villa",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "site-container relative flex min-h-[520px] flex-col justify-center py-16 sm:min-h-[580px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl font-extrabold leading-[1.1] tracking-tight text-paper sm:text-5xl",
								children: "Your Dream Home Awaits, Start Living Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-paper/85 sm:text-base",
								children: "Discover verified properties for sale or rent across Zanzibar & Tanzania."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 max-w-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {})
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Explore Popular Locations",
			to: "/locations",
			linkLabel: "View all locations"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: locRail,
				className: "flex gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/locations/$slug",
					params: { slug: loc.slug },
					className: "group relative h-44 w-40 shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-44",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: loc.image,
							alt: loc.name,
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-3 text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: loc.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-paper/80",
								children: [loc.count.toLocaleString(), " Properties"]
							})]
						})
					]
				}, loc.slug))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Next locations",
				onClick: () => scroll(locRail, 1),
				className: "absolute -right-2 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-ink shadow-card sm:grid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
			})]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Latest Properties on the Market",
				to: "/listings",
				linkLabel: "View all properties"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						image: "/images/features/dream.jpg",
						title: "Find Your Dream Home",
						body: "Browse thousands of verified properties for sale or rent in the best locations.",
						to: "/listings",
						cta: "Explore Listings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						image: "/images/features/sell.jpg",
						title: "Sell Your Property Fast",
						body: "List your property and reach serious buyers or renters quickly and easily.",
						to: "/add-listing",
						cta: "List Your Property"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						image: "/images/features/invest.jpg",
						title: "Invest in Real Estate",
						body: "Discover high-return investment opportunities in growing markets.",
						to: "/investments",
						cta: "Explore Investments"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-7 text-xl font-bold tracking-tight text-ink sm:text-[22px]",
				children: "Browse Properties by Type"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: propertyTypes.map((t) => {
					const Icon = typeIcons[t.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/listings",
						search: { type: t.id },
						className: "flex flex-col items-center rounded-xl border border-line bg-paper px-3 py-6 text-center shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 place-items-center rounded-xl bg-brand-soft text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-ink",
								children: t.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: [t.count.toLocaleString(), " Listings"]
							})
						]
					}, t.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-brand-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center md:grid-cols-[1.1fr_1.2fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/misc/valuation.jpg",
						alt: "Modern living room",
						className: "h-56 w-full object-cover md:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-8 sm:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-[0.16em] text-brand",
								children: "Free tool"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[28px]",
								children: "Get Your Property Valuation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm leading-relaxed text-ink-soft",
								children: "Find out how much your property is worth in today's market. Our tool uses real data to provide accurate and up-to-date estimates."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/valuation",
								className: "mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover",
								children: ["Get Free Valuation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "pointer-events-none absolute -right-4 bottom-4 size-36 text-brand/15" })
						]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-7 text-xl font-bold tracking-tight text-ink sm:text-[22px]",
				children: "Popular Areas in Tanzania"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: areaRail,
					className: "flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/locations/$slug",
						params: { slug: loc.slug },
						className: "w-44 shrink-0 sm:w-48",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-2xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: loc.image,
									alt: loc.name,
									className: "h-28 w-full object-cover sm:h-32"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-semibold text-ink",
								children: loc.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [loc.count.toLocaleString(), " Properties"]
							})
						]
					}, loc.slug))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Next areas",
					onClick: () => scroll(areaRail, 1),
					className: "absolute -right-2 top-12 hidden size-9 place-items-center rounded-full border border-line bg-paper shadow-card sm:grid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Latest from Our Blog",
				to: "/blog",
				linkLabel: "View all articles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: blogPosts.slice(0, 3).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: post.slug },
					className: "group overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/10] overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.image,
							alt: "",
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3 rounded-md bg-paper px-2 py-1 text-[11px] font-semibold text-ink",
							children: post.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold leading-snug text-ink",
							children: post.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								post.date,
								" · ",
								post.readMins,
								" min read"
							]
						})]
					})]
				}, post.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "pt-0 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-canvas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center md:grid-cols-[1.1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-8 sm:p-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight text-ink sm:text-3xl",
								children: "Ready to Find Your Perfect Property?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md text-sm leading-relaxed text-ink-soft",
								children: "Join thousands of satisfied clients who found their dream properties with Swahivo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/listings",
								className: "mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover",
								children: ["Browse All Listings", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/misc/cta-villa.jpg",
						alt: "Luxury villa with pool at dusk",
						className: "h-56 w-full object-cover md:h-full"
					})]
				})
			})
		})
	] });
}
function FeatureCard({ image, title, body, to, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl border border-line bg-paper shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: image,
			alt: "",
			className: "h-44 w-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-ink",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					className: "mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink",
					children: [cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
				})
			]
		})]
	});
}
//#endregion
export { HomePage as component };
