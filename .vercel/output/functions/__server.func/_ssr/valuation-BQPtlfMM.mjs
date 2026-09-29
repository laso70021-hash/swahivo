import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as formatTzs } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/valuation-BQPtlfMM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cityMult = {
	"Dar es Salaam": 1,
	Zanzibar: 1.15,
	Arusha: .85,
	Mwanza: .7,
	Dodoma: .65,
	Tanga: .6
};
var typeBase = {
	apartment: 12e5,
	house: 9e5,
	villa: 16e5,
	plot: 25e4,
	commercial: 11e5,
	condo: 14e5
};
function ValuationPage() {
	const [city, setCity] = (0, import_react.useState)("Dar es Salaam");
	const [type, setType] = (0, import_react.useState)("house");
	const [area, setArea] = (0, import_react.useState)(180);
	const [beds, setBeds] = (0, import_react.useState)(3);
	const [ready, setReady] = (0, import_react.useState)(false);
	const estimate = (0, import_react.useMemo)(() => {
		const base = typeBase[type] ?? 9e5;
		const loc = cityMult[city] ?? 1;
		const bedBoost = 1 + Math.max(0, beds - 1) * .08;
		return Math.round(base * area * loc * bedBoost);
	}, [
		city,
		type,
		area,
		beds
	]);
	const low = Math.round(estimate * .9);
	const high = Math.round(estimate * 1.12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Free property valuation",
		subtitle: "A comparable-based estimate using Swahivo listing data. Not a bank appraisal.",
		image: "/images/misc/valuation.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container grid gap-8 py-12 lg:grid-cols-[1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4 rounded-2xl border border-line bg-paper p-6 shadow-card",
			onSubmit: (e) => {
				e.preventDefault();
				setReady(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["City", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: city,
						onChange: (e) => setCity(e.target.value),
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm",
						children: Object.keys(cityMult).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Internal area (m²)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 20,
						value: area,
						onChange: (e) => setArea(Number(e.target.value)),
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Bedrooms", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						value: beds,
						onChange: (e) => setBeds(Number(e.target.value)),
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover",
					children: "Get estimate"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl bg-brand-soft p-8",
			children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-[0.16em] text-brand",
					children: "Indicative range"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-3xl font-bold tabular-nums text-ink",
					children: [
						formatTzs(low),
						" – ",
						formatTzs(high)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: [
						"Midpoint ",
						formatTzs(estimate),
						" for a ",
						beds,
						"-bed ",
						type,
						" of ",
						area,
						" ",
						"m² in ",
						city,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs leading-relaxed text-muted",
					children: "This is a model based on comparable Swahivo listings, not a formal valuation. Condition, title, and exact street still move the number. Ask an agent for a walkthrough."
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-ink-soft",
				children: "Enter the basics on the left. We will return a range you can use as a starting point for a sale, refinance, or curiosity check."
			})
		})]
	})] });
}
//#endregion
export { ValuationPage as component };
