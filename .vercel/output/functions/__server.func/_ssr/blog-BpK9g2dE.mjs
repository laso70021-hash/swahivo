import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as blogPosts } from "./router-DPAXHcoz.mjs";
import { t as PageBanner } from "./section-CCysDrR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-BpK9g2dE.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const [featured, ...rest] = blogPosts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBanner, {
		title: "Swahivo Journal",
		subtitle: "Market notes, neighbourhood guides, and practical advice for buyers, renters, and sellers.",
		image: "/images/blog/tips.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-container py-12",
		children: [featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/blog/$slug",
			params: { slug: featured.slug },
			className: "grid overflow-hidden rounded-2xl border border-line bg-paper shadow-card md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: featured.image,
				alt: "",
				className: "h-64 w-full object-cover md:h-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-brand",
						children: featured.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-2xl font-bold text-ink",
						children: featured.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: featured.excerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-muted",
						children: [
							featured.date,
							" · ",
							featured.readMins,
							" min read"
						]
					})
				]
			})]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog/$slug",
				params: { slug: post.slug },
				className: "overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] hover:shadow-card-hover",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.image,
						alt: "",
						className: "size-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-3 top-3 rounded-md bg-paper px-2 py-1 text-[11px] font-semibold",
						children: post.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-ink",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-muted",
							children: post.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted",
							children: [
								post.date,
								" · ",
								post.readMins,
								" min read"
							]
						})
					]
				})]
			}, post.slug))
		})]
	})] });
}
//#endregion
export { BlogPage as component };
