import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as agents } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DEFkNPGT.js
var import_jsx_runtime = require_jsx_runtime();
var stats = [
	["12,000+", "Verified listings"],
	["6", "Cities covered"],
	["48", "Specialist agents"],
	["2019", "Year founded"]
];
var values = [
	{
		title: "Verified first",
		body: "We do not publish a listing until title, seller identity, and basic condition have been checked."
	},
	{
		title: "Local, not distant",
		body: "Every city has agents who live there. Advice is street-level, not a call centre script."
	},
	{
		title: "Clear numbers",
		body: "Prices in TZS, fees explained up front, and no surprise ‘viewing charges’."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "About Swahivo",
		subtitle: "A Tanzanian marketplace for people who want to buy, rent, or sell with confidence.",
		image: "/images/hero.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.16em] text-brand",
						children: "Our story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-2xl font-bold tracking-tight text-ink",
						children: "Built for Zanzibar & Tanzania"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-ink-soft",
						children: "Swahivo started in Dar es Salaam in 2019 after our founders spent months chasing unverified Facebook listings and incomplete titles. The idea was simple: a marketplace where every property is checked, every agent is named, and every price is honest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-ink-soft",
						children: "Today we cover six cities, with a Zanzibar desk for island investment and a growing Dodoma book as the capital expands. We still take the same view — if we would not send our own family to view it, it does not go live."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/locations/zanzibar.jpg",
					alt: "Zanzibar",
					className: "h-72 w-full rounded-2xl object-cover lg:h-full"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-2 gap-4 rounded-2xl bg-canvas px-6 py-8 sm:grid-cols-4",
				children: stats.map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-bold text-ink",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: l
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 text-xl font-bold text-ink",
				children: "What we stand for"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 md:grid-cols-3",
				children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-paper p-6 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-ink",
						children: v.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: v.body
					})]
				}, v.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 text-xl font-bold text-ink",
				children: "Leadership on the ground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
				children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.photo,
							alt: a.name,
							className: "mx-auto size-24 rounded-full object-cover object-top"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm font-semibold text-ink",
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: a.city
						})
					]
				}, a.id))
			})
		]
	})] });
}
//#endregion
export { AboutPage as component };
