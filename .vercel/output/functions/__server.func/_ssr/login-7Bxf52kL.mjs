import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as House } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { u as useSession } from "./router-DPAXHcoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-7Bxf52kL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const user = useSession((s) => s.user);
	const login = useSession((s) => s.login);
	const logout = useSession((s) => s.logout);
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "site-container flex min-h-[60vh] items-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md rounded-2xl border border-line bg-paper p-8 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-bold text-ink",
					children: ["Welcome back, ", user.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: user.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/add-listing",
						className: "inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover",
						children: "Add a listing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							logout();
							toast.success("Signed out.");
						},
						className: "h-11 rounded-lg border border-line px-5 text-sm font-semibold",
						children: "Sign out"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-[calc(100dvh-72px)] lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/45" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-10 text-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-bold",
						children: "Find your place in Tanzania."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-sm text-paper/80",
						children: "Save homes, list a property, and pick up where you left off."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center px-6 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "w-full max-w-md",
				onSubmit: (e) => {
					e.preventDefault();
					login(email, name);
					toast.success("You are in.");
					navigate({ to: "/" });
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-lg bg-brand text-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-bold",
							children: "Swahivo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight text-ink",
						children: "Log in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Demo access — any email works. Nothing is sent to a server."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-8 block text-sm font-medium",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Amina Hassan",
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-sm font-medium",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@email.com",
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-sm font-medium",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "password",
							defaultValue: "swahivo",
							className: "mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "mt-6 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-paper hover:bg-brand-hover",
						children: "Continue"
					})
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
