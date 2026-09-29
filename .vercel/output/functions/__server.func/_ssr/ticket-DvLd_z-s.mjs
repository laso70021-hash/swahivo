import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-DvLd_z-s.js
var import_jsx_runtime = require_jsx_runtime();
function TicketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Submit a ticket",
		subtitle: "Something wrong with a listing, an enquiry, or your account? Tell us.",
		image: "/images/locations/mwanza.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "site-container max-w-xl space-y-4 py-12",
		onSubmit: (e) => {
			e.preventDefault();
			toast.success("Ticket received. Support will reply by email.");
			e.currentTarget.reset();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					type: "email",
					className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Topic", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Listing issue" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Payment / fees" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Account" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					rows: 6,
					className: "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover",
				children: "Submit ticket"
			})
		]
	})] });
}
//#endregion
export { TicketPage as component };
