import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, f as Mail, l as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BmLz5I0j.js
var import_jsx_runtime = require_jsx_runtime();
var offices = [
	{
		city: "Dar es Salaam",
		address: "Plot 14, Haile Selassie Road, Masaki",
		phone: "+255 22 266 4100",
		image: "/images/locations/dar-es-salaam.jpg"
	},
	{
		city: "Zanzibar",
		address: "Malindi, Stone Town",
		phone: "+255 24 223 1188",
		image: "/images/locations/zanzibar.jpg"
	},
	{
		city: "Arusha",
		address: "Njiro, near the Clock Tower road",
		phone: "+255 27 250 4410",
		image: "/images/locations/arusha.jpg"
	}
];
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Contact",
		subtitle: "Visit a desk, call an agent, or send a note — we reply within one working day.",
		image: "/images/locations/zanzibar.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8",
			onSubmit: (e) => {
				e.preventDefault();
				toast.success("Thanks — we will get back to you shortly.");
				e.currentTarget.reset();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-ink",
					children: "Send a message"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-medium",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm font-medium",
					children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm font-medium",
					children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 6,
						className: "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "mt-5 h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover",
					children: "Send message"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-canvas p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-brand" }), " +255 22 266 4100"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 inline-flex items-center gap-2 text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-brand" }), " hello@swahivo.com"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 inline-flex items-center gap-2 text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-brand" }), " Open Mon–Sat, 8:00–18:00 EAT"]
					})
				]
			}), offices.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-xl border border-line bg-paper shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: o.image,
					alt: "",
					className: "h-32 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-ink",
							children: o.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: o.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-soft",
							children: o.phone
						})
					]
				})]
			}, o.city))]
		})]
	})] });
}
//#endregion
export { ContactPage as component };
