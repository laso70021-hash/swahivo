import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import { w as cn } from "./router-DPAXHcoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-panel-H7rXXchN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	q: "",
	type: "",
	deal: "",
	price: "",
	beds: ""
};
function SearchPanel({ variant = "hero", initial }) {
	const navigate = useNavigate();
	const [values, setValues] = (0, import_react.useState)({
		...empty,
		...initial
	});
	(0, import_react.useEffect)(() => {
		setValues({
			...empty,
			...initial
		});
	}, [
		initial?.q,
		initial?.type,
		initial?.deal,
		initial?.price,
		initial?.beds
	]);
	function submit(e) {
		e.preventDefault();
		navigate({
			to: "/listings",
			search: {
				q: values.q || void 0,
				type: values.type || void 0,
				deal: values.deal || void 0,
				price: values.price || void 0,
				beds: values.beds || void 0
			}
		});
	}
	const selectClass = cn("h-11 rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none", variant === "hero" && "min-w-0 flex-1 shadow-sm");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex overflow-hidden rounded-full bg-paper shadow-card", variant === "page" && "rounded-xl border border-line"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: values.q,
					onChange: (e) => setValues((v) => ({
						...v,
						q: e.target.value
					})),
					placeholder: "Enter keyword or location",
					className: "h-12 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "m-1 rounded-full bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover",
				children: "Search"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: selectClass,
					value: values.type,
					onChange: (e) => setValues((v) => ({
						...v,
						type: e.target.value
					})),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Types"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "apartment",
							children: "Apartments"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "house",
							children: "Houses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "villa",
							children: "Villas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "plot",
							children: "Plots"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "commercial",
							children: "Commercial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "condo",
							children: "Condos"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: selectClass,
					value: values.deal,
					onChange: (e) => setValues((v) => ({
						...v,
						deal: e.target.value
					})),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Buy / Rent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "sale",
							children: "Buy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "rent",
							children: "Rent"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: selectClass,
					value: values.price,
					onChange: (e) => setValues((v) => ({
						...v,
						price: e.target.value
					})),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Any Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "100m",
							children: "Under TZS 100M"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "300m",
							children: "Under TZS 300M"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "500m",
							children: "Under TZS 500M"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "1b",
							children: "Under TZS 1B"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: selectClass,
					value: values.beds,
					onChange: (e) => setValues((v) => ({
						...v,
						beds: e.target.value
					})),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Bedrooms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "1",
							children: "1+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "2",
							children: "2+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "3",
							children: "3+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "4",
							children: "4+"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { SearchPanel as t };
