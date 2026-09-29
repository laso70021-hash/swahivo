import { X as notFound, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getPost, i as Route$2, p as blogPosts } from "./router-DPAXHcoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog_._slug-F0fawin-.js
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	const { slug } = Route$2.useParams();
	const post = getPost(slug);
	if (!post) throw notFound();
	const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "site-container py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog",
						className: "hover:text-ink",
						children: "Blog"
					}),
					" ",
					"/ ",
					post.category
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto mt-6 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-brand",
						children: post.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							post.date,
							" · ",
							post.readMins,
							" min read"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.image,
						alt: "",
						className: "mt-8 h-72 w-full rounded-2xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-4",
						children: post.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] leading-7 text-ink-soft",
							children: p
						}, p.slice(0, 24)))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-16 mb-5 text-xl font-bold text-ink",
				children: "More from the journal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: others.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: p.slug },
					className: "overflow-hidden rounded-xl border border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: "",
						className: "h-36 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-ink",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: p.date
						})]
					})]
				}, p.slug))
			})
		]
	});
}
//#endregion
export { PostPage as component };
