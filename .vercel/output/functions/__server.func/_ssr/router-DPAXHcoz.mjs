import { i as __toESM } from "../_runtime.mjs";
import { C as useRouter, Z as require_react, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Heart, b as ChevronDown, c as Plus, g as House, h as Instagram, i as TriangleAlert, p as Linkedin, r as Twitter, t as X, u as Menu, v as Facebook } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DPAXHcoz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-brand",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
function AppNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted",
				children: "That page does not exist on Swahivo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 inline-flex h-10 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-paper",
				children: "Back home"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTzs(amount) {
	return `TZS ${amount.toLocaleString("en-US")}`;
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var locations = [
	{
		slug: "zanzibar",
		name: "Zanzibar",
		count: 1120,
		image: "/images/locations/zanzibar.jpg",
		blurb: "Stone Town heritage homes, beachfront villas, and investment condos along the Indian Ocean."
	},
	{
		slug: "dar-es-salaam",
		name: "Dar es Salaam",
		count: 2340,
		image: "/images/locations/dar-es-salaam.jpg",
		blurb: "Tanzania’s commercial capital — Masaki apartments, Mbezi family homes, and Kigamboni waterfront."
	},
	{
		slug: "arusha",
		name: "Arusha",
		count: 680,
		image: "/images/locations/arusha.jpg",
		blurb: "Gateway to the northern circuit. Cool-climate houses, safari lodges, and hillside plots."
	},
	{
		slug: "mwanza",
		name: "Mwanza",
		count: 530,
		image: "/images/locations/mwanza.jpg",
		blurb: "Lake Victoria living with growing residential estates and lakeside commercial space."
	},
	{
		slug: "dodoma",
		name: "Dodoma",
		count: 410,
		image: "/images/locations/dodoma.jpg",
		blurb: "The capital’s new government quarter is driving demand for houses, plots, and offices."
	},
	{
		slug: "tanga",
		name: "Tanga",
		count: 350,
		image: "/images/locations/tanga.jpg",
		blurb: "Quiet coastal city with beach plots, colonial bungalows, and emerging holiday rentals."
	}
];
var propertyTypes = [
	{
		id: "apartment",
		label: "Apartments",
		count: 1240
	},
	{
		id: "house",
		label: "Houses",
		count: 2150
	},
	{
		id: "villa",
		label: "Villas",
		count: 890
	},
	{
		id: "plot",
		label: "Plots",
		count: 1020
	},
	{
		id: "commercial",
		label: "Commercial",
		count: 560
	},
	{
		id: "condo",
		label: "Condos",
		count: 320
	}
];
var agents = [
	{
		id: "aisha-mwinyi",
		name: "Aisha Mwinyi",
		role: "Senior Agent, Dar es Salaam",
		city: "Dar es Salaam",
		phone: "+255 754 221 190",
		email: "aisha@swahivo.com",
		photo: "/images/agents/aisha.jpg",
		bio: "Aisha has closed more than 180 residential deals across Masaki, Oysterbay, and Mbezi Beach. She specialises in verified family homes and waterfront apartments.",
		listings: 42,
		languages: ["English", "Swahili"]
	},
	{
		id: "daniel-msuya",
		name: "Daniel Msuya",
		role: "Luxury Specialist, Zanzibar",
		city: "Zanzibar",
		phone: "+255 765 441 008",
		email: "daniel@swahivo.com",
		photo: "/images/agents/daniel.jpg",
		bio: "Daniel advises investors on beachfront villas and boutique hotels from Nungwi to Paje, with a focus on clear title and rental yield.",
		listings: 28,
		languages: [
			"English",
			"Swahili",
			"Italian"
		]
	},
	{
		id: "neema-lyimo",
		name: "Neema Lyimo",
		role: "Arusha & Northern Circuit",
		city: "Arusha",
		phone: "+255 713 908 442",
		email: "neema@swahivo.com",
		photo: "/images/agents/neema.jpg",
		bio: "Neema knows every hillside plot from Njiro to Usa River. She helps families and safari operators find land with clean documentation.",
		listings: 35,
		languages: ["English", "Swahili"]
	},
	{
		id: "omar-juma",
		name: "Omar Juma",
		role: "Commercial Lead",
		city: "Dar es Salaam",
		phone: "+255 784 112 670",
		email: "omar@swahivo.com",
		photo: "/images/agents/omar.jpg",
		bio: "Omar places offices, warehouses, and retail in CBD, Mwenge, and the new Kigamboni corridor. Ten years in Tanzanian commercial real estate.",
		listings: 19,
		languages: [
			"English",
			"Swahili",
			"Arabic"
		]
	},
	{
		id: "zahra-hassan",
		name: "Zahra Hassan",
		role: "Rentals Manager",
		city: "Dar es Salaam",
		phone: "+255 622 331 909",
		email: "zahra@swahivo.com",
		photo: "/images/agents/zahra.jpg",
		bio: "Zahra matches tenants with verified apartments in Sinza, Mikocheni, and Masaki. Fast viewings, honest condition reports, no surprise fees.",
		listings: 51,
		languages: ["English", "Swahili"]
	},
	{
		id: "jabari-mwakasege",
		name: "Jabari Mwakasege",
		role: "Lake Zone Agent",
		city: "Mwanza",
		phone: "+255 758 220 114",
		email: "jabari@swahivo.com",
		photo: "/images/agents/jabari.jpg",
		bio: "Jabari covers Mwanza and the lake zone — family homes, lakeside plots, and growing estate developments around Ilemela.",
		listings: 22,
		languages: ["English", "Swahili"]
	}
];
var galleryHouse = [
	"/images/properties/modern-house.jpg",
	"/images/properties/interior-kitchen.jpg",
	"/images/properties/interior-bedroom.jpg",
	"/images/properties/bathroom.jpg"
];
var galleryApt = [
	"/images/properties/luxury-apt.jpg",
	"/images/properties/dark-apt.jpg",
	"/images/properties/interior-kitchen.jpg",
	"/images/properties/studio.jpg"
];
var galleryVilla = [
	"/images/properties/beach-villa.jpg",
	"/images/properties/house-dusk.jpg",
	"/images/misc/cta-villa.jpg",
	"/images/properties/bathroom.jpg"
];
var properties = [
	{
		id: "modern-4-bedroom-house",
		title: "Modern 4-Bedroom House",
		location: "Mbezi Beach, Dar es Salaam",
		city: "Dar es Salaam",
		price: 45e7,
		listingType: "sale",
		propertyType: "house",
		beds: 4,
		baths: 3,
		area: 250,
		image: "/images/properties/modern-house.jpg",
		gallery: galleryHouse,
		agentId: "aisha-mwinyi",
		featured: true,
		yearBuilt: 2022,
		amenities: [
			"Parking",
			"Generator",
			"Garden",
			"Security",
			"Water tank"
		],
		description: "A contemporary family house in Mbezi Beach with open-plan living, a covered terrace, and landscaped tropical gardens. Quiet cul-de-sac, minutes from the beach road."
	},
	{
		id: "luxury-apartment-masaki",
		title: "Luxury Apartment",
		location: "Masaki, Dar es Salaam",
		city: "Dar es Salaam",
		price: 25e5,
		listingType: "rent",
		propertyType: "apartment",
		beds: 3,
		baths: 2,
		area: 180,
		image: "/images/properties/luxury-apt.jpg",
		gallery: galleryApt,
		agentId: "zahra-hassan",
		featured: true,
		yearBuilt: 2021,
		amenities: [
			"Pool",
			"Gym",
			"24/7 security",
			"Backup power",
			"Sea view"
		],
		description: "Bright corner apartment in a gated Masaki compound. Floor-to-ceiling windows, fitted kitchen, and shared pool. Walking distance to restaurants and the peninsula."
	},
	{
		id: "beachfront-villa-kigamboni",
		title: "Beachfront Villa",
		location: "Kigamboni, Dar es Salaam",
		city: "Dar es Salaam",
		price: 68e7,
		listingType: "sale",
		propertyType: "villa",
		beds: 5,
		baths: 4,
		area: 400,
		image: "/images/properties/beach-villa.jpg",
		gallery: galleryVilla,
		agentId: "aisha-mwinyi",
		featured: true,
		yearBuilt: 2023,
		amenities: [
			"Private pool",
			"Beach access",
			"Staff quarters",
			"Garage",
			"Smart home"
		],
		description: "A 5-bedroom villa with a private pool and direct beach access in Kigamboni. Ideal as a family compound or a high-yield holiday let."
	},
	{
		id: "3-bedroom-house-mbagala",
		title: "3-Bedroom House",
		location: "Mbagala, Dar es Salaam",
		city: "Dar es Salaam",
		price: 12e7,
		listingType: "sale",
		propertyType: "house",
		beds: 3,
		baths: 2,
		area: 150,
		image: "/images/properties/house-dusk.jpg",
		gallery: galleryHouse,
		agentId: "aisha-mwinyi",
		featured: true,
		yearBuilt: 2019,
		amenities: [
			"Parking",
			"Walled compound",
			"Water tank"
		],
		description: "Solid 3-bedroom house in a walled Mbagala compound. Ready to occupy, with space to extend at the rear."
	},
	{
		id: "2-bedroom-apartment-oysterbay",
		title: "2-Bedroom Apartment",
		location: "Oysterbay, Dar es Salaam",
		city: "Dar es Salaam",
		price: 18e5,
		listingType: "rent",
		propertyType: "apartment",
		beds: 2,
		baths: 2,
		area: 120,
		image: "/images/properties/dark-apt.jpg",
		gallery: galleryApt,
		agentId: "zahra-hassan",
		featured: true,
		yearBuilt: 2020,
		amenities: [
			"Security",
			"Backup power",
			"Parking",
			"Fibre"
		],
		description: "Stylish 2-bedroom apartment in Oysterbay with city views. Fibre-ready, assigned parking, and a quiet block of only twelve units."
	},
	{
		id: "elegant-family-home-mwanza",
		title: "Elegant Family Home",
		location: "Mwanza",
		city: "Mwanza",
		price: 35e7,
		listingType: "sale",
		propertyType: "house",
		beds: 4,
		baths: 3,
		area: 280,
		image: "/images/properties/family-home.jpg",
		gallery: galleryHouse,
		agentId: "jabari-mwakasege",
		featured: true,
		yearBuilt: 2018,
		amenities: [
			"Garden",
			"Garage",
			"Generator",
			"Lake view"
		],
		description: "A generous family home on a landscaped plot overlooking Lake Victoria. Four bedrooms, formal lounge, and a shaded garden for entertaining."
	},
	{
		id: "residential-plot-arusha",
		title: "Residential Plot",
		location: "Arusha",
		city: "Arusha",
		price: 85e6,
		listingType: "sale",
		propertyType: "plot",
		beds: null,
		baths: null,
		area: 600,
		image: "/images/properties/plot.jpg",
		gallery: [
			"/images/properties/plot.jpg",
			"/images/locations/arusha.jpg",
			"/images/properties/family-home.jpg"
		],
		agentId: "neema-lyimo",
		featured: true,
		yearBuilt: null,
		amenities: [
			"Title deed",
			"Road access",
			"Electricity nearby"
		],
		description: "600 m² surveyed plot with a clean title in a growing Arusha neighbourhood. Road access and power at the boundary."
	},
	{
		id: "studio-apartment-sinza",
		title: "Studio Apartment",
		location: "Sinza, Dar es Salaam",
		city: "Dar es Salaam",
		price: 95e4,
		listingType: "rent",
		propertyType: "apartment",
		beds: 1,
		baths: 1,
		area: 60,
		image: "/images/properties/studio.jpg",
		gallery: galleryApt,
		agentId: "zahra-hassan",
		featured: true,
		yearBuilt: 2021,
		amenities: [
			"Furnished",
			"Security",
			"Water"
		],
		description: "Compact furnished studio in Sinza — ideal for young professionals. Kitchenette, fast water supply, and a secure compound."
	},
	{
		id: "oceanview-condo-zanzibar",
		title: "Oceanview Condo",
		location: "Nungwi, Zanzibar",
		city: "Zanzibar",
		price: 42e7,
		listingType: "sale",
		propertyType: "condo",
		beds: 2,
		baths: 2,
		area: 110,
		image: "/images/properties/condo.jpg",
		gallery: galleryVilla,
		agentId: "daniel-msuya",
		yearBuilt: 2024,
		amenities: [
			"Hotel-managed",
			"Pool",
			"Beach club",
			"Rental programme"
		],
		description: "Hotel-managed condo with ocean views in Nungwi. Optional rental programme with audited occupancy reports."
	},
	{
		id: "cbd-commercial-floor",
		title: "CBD Commercial Floor",
		location: "City Centre, Dar es Salaam",
		city: "Dar es Salaam",
		price: 85e5,
		listingType: "rent",
		propertyType: "commercial",
		beds: null,
		baths: 2,
		area: 320,
		image: "/images/properties/commercial.jpg",
		gallery: [
			"/images/properties/commercial.jpg",
			"/images/properties/condo.jpg",
			"/images/locations/dar-es-salaam.jpg"
		],
		agentId: "omar-juma",
		yearBuilt: 2017,
		amenities: [
			"Lift",
			"Parking",
			"Backup power",
			"Fibre"
		],
		description: "An entire office floor in a well-managed CBD tower. Open plan, two meeting rooms, and assigned basement parking."
	},
	{
		id: "garden-villa-arusha",
		title: "Garden Villa",
		location: "Njiro, Arusha",
		city: "Arusha",
		price: 51e7,
		listingType: "sale",
		propertyType: "villa",
		beds: 4,
		baths: 4,
		area: 340,
		image: "/images/properties/family-home.jpg",
		gallery: galleryHouse,
		agentId: "neema-lyimo",
		yearBuilt: 2020,
		amenities: [
			"Garden",
			"Fireplace",
			"Staff quarters",
			"Borehole"
		],
		description: "Cool-climate villa in Njiro with mature gardens, a fireplace lounge, and mountain views on clear mornings."
	},
	{
		id: "penthouse-masaki",
		title: "Masaki Penthouse",
		location: "Masaki, Dar es Salaam",
		city: "Dar es Salaam",
		price: 89e7,
		listingType: "sale",
		propertyType: "apartment",
		beds: 4,
		baths: 4,
		area: 310,
		image: "/images/properties/luxury-apt.jpg",
		gallery: galleryApt,
		agentId: "aisha-mwinyi",
		yearBuilt: 2023,
		amenities: [
			"Private terrace",
			"Sea view",
			"Smart home",
			"2 parking"
		],
		description: "Full-floor penthouse with a wraparound terrace and peninsula views. Specced for a lock-up-and-leave lifestyle."
	},
	{
		id: "townhouse-mwanza",
		title: "Ilemela Townhouse",
		location: "Ilemela, Mwanza",
		city: "Mwanza",
		price: 12e5,
		listingType: "rent",
		propertyType: "house",
		beds: 3,
		baths: 2,
		area: 160,
		image: "/images/properties/house-dusk.jpg",
		gallery: galleryHouse,
		agentId: "jabari-mwakasege",
		yearBuilt: 2021,
		amenities: [
			"Gated estate",
			"Playground",
			"Parking"
		],
		description: "3-bedroom townhouse in a gated Ilemela estate. Shared playground, reliable water, and a short drive to the lake."
	},
	{
		id: "beach-plot-tanga",
		title: "Coastal Plot",
		location: "Tanga",
		city: "Tanga",
		price: 64e6,
		listingType: "sale",
		propertyType: "plot",
		beds: null,
		baths: null,
		area: 800,
		image: "/images/locations/tanga.jpg",
		gallery: [
			"/images/locations/tanga.jpg",
			"/images/properties/plot.jpg",
			"/images/properties/beach-villa.jpg"
		],
		agentId: "daniel-msuya",
		yearBuilt: null,
		amenities: [
			"Beach proximity",
			"Title deed",
			"Surveyed"
		],
		description: "800 m² coastal plot a short walk from the Tanga shoreline. Clean title, ready for a holiday home or small lodge."
	},
	{
		id: "family-apartment-dodoma",
		title: "Capital Family Apartment",
		location: "Dodoma",
		city: "Dodoma",
		price: 78e4,
		listingType: "rent",
		propertyType: "apartment",
		beds: 3,
		baths: 2,
		area: 140,
		image: "/images/properties/studio.jpg",
		gallery: galleryApt,
		agentId: "zahra-hassan",
		yearBuilt: 2022,
		amenities: [
			"Generator",
			"Parking",
			"Security"
		],
		description: "New 3-bedroom apartment near the government quarter in Dodoma. Assigned parking and a backup generator."
	},
	{
		id: "warehouse-ubungo",
		title: "Light Industrial Warehouse",
		location: "Ubungo, Dar es Salaam",
		city: "Dar es Salaam",
		price: 185e6,
		listingType: "sale",
		propertyType: "commercial",
		beds: null,
		baths: 1,
		area: 720,
		image: "/images/properties/commercial.jpg",
		gallery: ["/images/properties/commercial.jpg", "/images/locations/dar-es-salaam.jpg"],
		agentId: "omar-juma",
		yearBuilt: 2015,
		amenities: [
			"Yard",
			"3-phase power",
			"Truck access"
		],
		description: "720 m² warehouse with a loading yard on the Morogoro Road corridor. 3-phase power and high eaves."
	}
];
var blogPosts = [
	{
		slug: "10-tips-first-time-home-buyers",
		title: "10 Tips for First-Time Home Buyers",
		excerpt: "From title checks to mortgage pre-approval — a practical checklist for buying your first home in Tanzania.",
		category: "Real Estate Tips",
		date: "May 15, 2024",
		readMins: 5,
		image: "/images/blog/tips.jpg",
		body: [
			"Buying your first home in Tanzania is exciting — and it is also a legal process. Start with a budget that includes stamp duty, legal fees, and a 10% contingency, not just the advertised price.",
			"Always instruct an independent advocate to run a land registry search. A beautiful house on disputed land is not a bargain. Ask for the title number, survey plan, and seller identification before you pay a reservation fee.",
			"Pre-approval from a bank or SACCOS tells you exactly what you can offer. It also signals to the seller that you are a serious buyer, which matters in competitive pockets like Masaki and Mbezi Beach.",
			"Walk the property at two times of day. Check water pressure, backup power, drainage after rain, and the neighbour situation. Photos never capture a noisy bar two doors down.",
			"Finally, do not skip the inspection. A structural engineer’s half-day visit is cheaper than a cracked foundation. Swahivo agents can arrange verified inspectors in every city we cover."
		]
	},
	{
		slug: "tanzania-market-trends-2024",
		title: "Real Estate Market Trends in Tanzania 2024",
		excerpt: "Where prices are firming, where rental yields still surprise, and what the capital move means for Dodoma.",
		category: "Market Insights",
		date: "May 10, 2024",
		readMins: 6,
		image: "/images/blog/market.jpg",
		body: [
			"2024 has been a year of two markets. Prime Dar es Salaam stock — Masaki, Oysterbay, Mikocheni — remains tight, with well-finished apartments letting quickly and sale prices holding.",
			"Kigamboni and the southern beach road continue to attract villa buyers who want land and a pool without Masaki prices. Title quality varies, so due diligence is not optional.",
			"Dodoma is the structural story. Government relocation is pulling housing and office demand into the capital. Purpose-built apartments near the new ministries are seeing stronger occupancy than a year ago.",
			"Zanzibar’s tourism rebound supports condo and villa yields, particularly in hotel-managed schemes. Investors should model occupancy conservatively and confirm the leasehold remaining on the title.",
			"Across the country, buyers are more documentation-aware. Listings with scanned titles, utility bills, and a named advocate close faster — which is why Swahivo verifies every property before it goes live."
		]
	},
	{
		slug: "why-zanzibar-real-estate-investment",
		title: "Why Zanzibar is Perfect for Real Estate Investment",
		excerpt: "Tourism, unique architecture, and a growing professional rental market — a clear-eyed look at the islands.",
		category: "Zanzibar Living",
		date: "May 5, 2024",
		readMins: 4,
		image: "/images/blog/zanzibar.jpg",
		body: [
			"Zanzibar combines a year-round tourism season with a growing local professional class. That mix supports both short-let villas and longer residential leases in Stone Town and the north.",
			"Beachfront is not the only play. Restored coral-stone houses in Stone Town and well-run condos in Nungwi and Paje have different risk and yield profiles — match the asset to your time horizon.",
			"Foreign buyers typically take leasehold. Understand the remaining term, the land department process, and any hotel-management contract before you sign. A good local advocate is worth more than a discounted asking price.",
			"Swahivo’s Zanzibar desk works with surveyed titles only. If you want a viewing itinerary — Stone Town, Nungwi, Paje — Daniel Msuya can arrange it in a single trip."
		]
	},
	{
		slug: "renting-in-dar-neighbourhood-guide",
		title: "A Neighbourhood Guide to Renting in Dar es Salaam",
		excerpt: "Masaki vs Mikocheni vs Sinza — who each area is for, and what you should expect to pay.",
		category: "City Guides",
		date: "April 22, 2024",
		readMins: 7,
		image: "/images/locations/dar-es-salaam.jpg",
		body: [
			"Dar is a city of villages. The right neighbourhood depends on your commute, your budget, and whether you want a compound with a pool or a walkable high street.",
			"Masaki and Oysterbay remain the premium peninsula: sea air, restaurants, and embassy-adjacent security. Expect to pay for it, and inspect backup power — outages still happen.",
			"Mikocheni and Mbezi Beach offer more house for the money, with family compounds and improving roads. Sinza and Ubungo are practical for professionals who want a short daladala or BRT hop.",
			"Always confirm who pays TANESCO and DAWASCO, whether the rent is quoted in TZS or USD, and how many months deposit the landlord wants. Three months is common; six is a conversation."
		]
	},
	{
		slug: "selling-your-home-fast",
		title: "How to Sell Your Property Fast in Tanzania",
		excerpt: "Pricing, photography, and paperwork — the three things that actually move a listing.",
		category: "Selling",
		date: "April 8, 2024",
		readMins: 5,
		image: "/images/blog/market.jpg",
		body: [
			"Overpricing is the number-one reason homes linger. We compare your property to closed sales, not asking prices, in the same street and condition band.",
			"Photography is not vanity. Bright, honest photos with a measured floor plan get more serious enquiries than a dark phone snapshot. We shoot every Swahivo listing.",
			"Have your title, land rent receipts, and ID ready. Buyers who can complete due diligence in a week do not wait for a seller who cannot find the file."
		]
	},
	{
		slug: "plots-vs-built-homes",
		title: "Should You Buy a Plot or a Built Home?",
		excerpt: "Control versus convenience — a framework for first-time land buyers in Arusha, Dodoma, and the coast.",
		category: "Land",
		date: "March 28, 2024",
		readMins: 6,
		image: "/images/properties/plot.jpg",
		body: [
			"A plot gives you control: orientation, finishes, and the chance to build in stages. It also gives you contractor risk, holding costs, and a longer path to living there.",
			"A built home is faster and usually easier to finance. You can see the cracks. You also pay for someone else’s choices — and sometimes their shortcuts.",
			"If you buy land, insist on a surveyed beaconed plot and walk the boundaries with the seller and a surveyor. In Arusha and Dodoma especially, ‘almost titled’ is not titled."
		]
	}
];
var faqs = [
	{
		q: "Does Swahivo verify every listing?",
		a: "Yes. Every property is checked for title, seller identity, and basic condition before it is published. Verified listings carry a badge on the card and the detail page."
	},
	{
		q: "What fees do buyers pay?",
		a: "Swahivo does not charge buyers to browse or enquire. Your advocate’s fees, stamp duty, and registration costs are separate and explained before you commit."
	},
	{
		q: "Can I list a property if I am not an agent?",
		a: "Yes. Homeowners can list directly. We review the documents, then publish. You can also ask one of our agents to represent you."
	},
	{
		q: "Do you work outside Dar es Salaam and Zanzibar?",
		a: "We cover Dar es Salaam, Zanzibar, Arusha, Mwanza, Dodoma, and Tanga, with visiting agents for Mbeya and Moshi on request."
	},
	{
		q: "Is the valuation tool a formal appraisal?",
		a: "No. It is an estimate based on comparable Swahivo listings. For a bank or court, commission a licensed valuer — we can introduce one."
	}
];
function getAgent(id) {
	return agents.find((a) => a.id === id);
}
function getProperty(id) {
	return properties.find((p) => p.id === id);
}
function getLocation(slug) {
	return locations.find((l) => l.slug === slug);
}
function getPost(slug) {
	return blogPosts.find((p) => p.slug === slug);
}
function propertiesForAgent(agentId) {
	return properties.filter((p) => p.agentId === agentId);
}
function propertiesForCity(city) {
	return properties.filter((p) => p.city.toLowerCase() === city.toLowerCase());
}
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	return hydrated;
}
var useSession = create()(persist((set) => ({
	user: null,
	login: (email, name) => set({ user: {
		email,
		name: name?.trim() || email.split("@")[0] || "Guest"
	} }),
	logout: () => set({ user: null })
}), { name: "swahivo-session" }));
var useFavorites = create()(persist((set, get) => ({
	ids: [],
	toggle: (id) => set({ ids: get().ids.includes(id) ? get().ids.filter((x) => x !== id) : [...get().ids, id] }),
	has: (id) => get().ids.includes(id)
}), { name: "swahivo-favorites" }));
var useUserListings = create()(persist((set) => ({
	extras: [],
	add: (listing) => set((s) => ({ extras: [listing, ...s.extras] }))
}), { name: "swahivo-user-listings" }));
function toProperty(listing) {
	return {
		id: listing.id,
		title: listing.title,
		location: `${listing.areaName}, ${listing.city}`,
		city: listing.city,
		price: listing.price,
		listingType: listing.listingType,
		propertyType: listing.propertyType,
		beds: listing.beds,
		baths: listing.baths,
		area: listing.area,
		image: "/images/properties/modern-house.jpg",
		gallery: [
			"/images/properties/modern-house.jpg",
			"/images/properties/luxury-apt.jpg",
			"/images/properties/interior-kitchen.jpg"
		],
		agentId: "aisha-mwinyi",
		description: listing.description,
		amenities: [
			"Parking",
			"Security",
			"Water tank"
		],
		yearBuilt: 2024,
		featured: true
	};
}
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/listings",
		label: "Listings",
		dropdown: true
	},
	{
		to: "/agents",
		label: "Agents"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/blog",
		label: "Blog"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const user = useSession((s) => s.user);
	const favCount = useFavorites((s) => s.ids.length);
	const hydrated = useHydrated();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [listingsOpen, setListingsOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-container flex h-16 items-center justify-between gap-4 lg:h-[72px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-brand text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							className: "size-4",
							strokeWidth: 2.4
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold tracking-tight text-ink",
						children: "Swahivo"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 lg:flex",
					children: nav.map((item) => "dropdown" in item && item.dropdown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						onMouseEnter: () => setListingsOpen(true),
						onMouseLeave: () => setListingsOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							search: {},
							className: cn("inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150", pathname.startsWith("/listings") ? "text-ink" : "text-ink-soft hover:text-ink"),
							children: ["Listings", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("absolute left-1/2 top-full z-40 w-52 -translate-x-1/2 pt-3 transition-opacity duration-150", listingsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/listings",
										search: {},
										className: "block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
										children: "All listings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/listings",
										search: { deal: "sale" },
										className: "block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
										children: "For sale"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/listings",
										search: { deal: "rent" },
										className: "block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
										children: "For rent"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-line" }),
									propertyTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/listings",
										search: { type: t.id },
										className: "block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
										children: t.label
									}, t.id))
								]
							})
						})]
					}, item.to) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("text-sm font-medium transition-colors duration-150", pathname === item.to ? "text-ink" : "text-ink-soft hover:text-ink"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/favorites",
							"aria-label": "Saved properties",
							className: "relative grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-canvas hover:text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" }), hydrated && favCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-brand text-[10px] font-semibold text-paper",
								children: favCount
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline",
							children: hydrated && user ? user.name : "Log In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/add-listing",
							className: "inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-brand-hover active:scale-[0.96] sm:px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add Listing"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-10 place-items-center rounded-full text-ink lg:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line bg-paper lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "site-container flex flex-col py-3",
				children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					className: "py-3 text-sm font-medium text-ink",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					onClick: () => setOpen(false),
					className: "py-3 text-sm font-medium text-ink",
					children: hydrated && user ? "Account" : "Log In"
				})]
			})
		}) : null]
	});
}
function SiteFooter() {
	const [email, setEmail] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-footer text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-brand text-paper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
									className: "size-4",
									strokeWidth: 2.4
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold",
								children: "Swahivo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xs text-sm leading-relaxed text-footer-muted",
							children: "Your trusted partner in finding, buying, renting and selling properties across Zanzibar & Tanzania."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-3 text-footer-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://facebook.com",
									"aria-label": "Facebook",
									className: "hover:text-paper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://instagram.com",
									"aria-label": "Instagram",
									className: "hover:text-paper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://x.com",
									"aria-label": "X",
									className: "hover:text-paper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://linkedin.com",
									"aria-label": "LinkedIn",
									className: "hover:text-paper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Home"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: {},
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Listings"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/agents",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Agents"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "About Us"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Property Types"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: { type: "apartment" },
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Apartments"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: { type: "house" },
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Houses"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: { type: "villa" },
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Villas"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: { type: "plot" },
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Plots"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listings",
							search: { type: "commercial" },
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Commercial"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Support"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "FAQ"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Privacy Policy"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Terms & Conditions"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Blog"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ticket",
							className: "text-sm text-footer-muted hover:text-paper",
							children: "Submit a Ticket"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Newsletter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-footer-muted",
						children: "Subscribe to get the latest property updates and news."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							if (!email.trim()) return;
							toast.success("You are on the list.");
							setEmail("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "Your email address",
							className: "h-11 rounded-lg border border-white/15 bg-transparent px-3 text-sm text-paper outline-none placeholder:text-footer-muted focus:border-white/40"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 rounded-lg bg-brand text-sm font-semibold text-paper transition-colors hover:bg-brand-hover",
							children: "Subscribe"
						})]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10 py-5 text-center text-xs text-footer-muted",
			children: "© 2024 Swahivo. All Rights Reserved."
		})]
	});
}
var styles_default = "/assets/styles-HxKT1qax.css";
var APP_NAME = "Swahivo";
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Discover verified properties for sale or rent across Zanzibar and Tanzania."
			},
			{
				name: "theme-color",
				content: "#E53935"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-dvh flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					richColors: true,
					position: "top-center"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$19 = () => import("./routes-zw--ArbG.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./about-DEFkNPGT.mjs");
var Route$18 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./add-listing-CD0LfjSg.mjs");
var Route$17 = createFileRoute("/add-listing")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./agents-QOY8nEDC.mjs");
var Route$16 = createFileRoute("/agents")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./blog-BpK9g2dE.mjs");
var Route$15 = createFileRoute("/blog")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./contact-BmLz5I0j.mjs");
var Route$14 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./faq-CyDB5Gho.mjs");
var Route$13 = createFileRoute("/faq")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./favorites-CSiySUYP.mjs");
var Route$12 = createFileRoute("/favorites")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./investments-vfMDcZA-.mjs");
var Route$11 = createFileRoute("/investments")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
function validateListingsSearch(s) {
	const str = (key) => typeof s[key] === "string" && s[key] ? s[key] : void 0;
	return {
		q: str("q"),
		type: str("type"),
		deal: str("deal"),
		price: str("price"),
		beds: str("beds"),
		city: str("city")
	};
}
var priceCap = {
	"100m": 1e8,
	"300m": 3e8,
	"500m": 5e8,
	"1b": 1e9
};
function filterProperties(list, search) {
	return list.filter((p) => {
		if (search.q) {
			const q = search.q.toLowerCase();
			if (!`${p.title} ${p.location} ${p.city} ${p.propertyType}`.toLowerCase().includes(q)) return false;
		}
		if (search.type && p.propertyType !== search.type) return false;
		if (search.deal && p.listingType !== search.deal) return false;
		if (search.city && p.city.toLowerCase() !== search.city.toLowerCase()) return false;
		if (search.beds) {
			const min = Number(search.beds);
			if (p.beds == null || p.beds < min) return false;
		}
		if (search.price && priceCap[search.price] != null) {
			if (p.price > priceCap[search.price]) return false;
		}
		return true;
	});
}
var $$splitComponentImporter$10 = () => import("./listings-7wfSXjuF.mjs");
var Route$10 = createFileRoute("/listings")({
	validateSearch: validateListingsSearch,
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./locations-DfYY6Ls3.mjs");
var Route$9 = createFileRoute("/locations")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./login-7Bxf52kL.mjs");
var Route$8 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./privacy-CBrdmxhA.mjs");
var Route$7 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./terms-BGRdKhoA.mjs");
var Route$6 = createFileRoute("/terms")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./ticket-DvLd_z-s.mjs");
var Route$5 = createFileRoute("/ticket")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./valuation-BQPtlfMM.mjs");
var Route$4 = createFileRoute("/valuation")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./agents_._id-DUpL2wb4.mjs");
var Route$3 = createFileRoute("/agents_/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./blog_._slug-F0fawin-.mjs");
var Route$2 = createFileRoute("/blog_/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./listings_._id-NZGvR2__.mjs");
var Route$1 = createFileRoute("/listings_/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./locations_._slug-CLp4g_H6.mjs");
var Route = createFileRoute("/locations_/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$19.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$20
	}),
	AboutRoute: Route$18.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$20
	}),
	AddListingRoute: Route$17.update({
		id: "/add-listing",
		path: "/add-listing",
		getParentRoute: () => Route$20
	}),
	AgentsRoute: Route$16.update({
		id: "/agents",
		path: "/agents",
		getParentRoute: () => Route$20
	}),
	BlogRoute: Route$15.update({
		id: "/blog",
		path: "/blog",
		getParentRoute: () => Route$20
	}),
	ContactRoute: Route$14.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$20
	}),
	FaqRoute: Route$13.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$20
	}),
	FavoritesRoute: Route$12.update({
		id: "/favorites",
		path: "/favorites",
		getParentRoute: () => Route$20
	}),
	InvestmentsRoute: Route$11.update({
		id: "/investments",
		path: "/investments",
		getParentRoute: () => Route$20
	}),
	ListingsRoute: Route$10.update({
		id: "/listings",
		path: "/listings",
		getParentRoute: () => Route$20
	}),
	LocationsRoute: Route$9.update({
		id: "/locations",
		path: "/locations",
		getParentRoute: () => Route$20
	}),
	LoginRoute: Route$8.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$20
	}),
	PrivacyRoute: Route$7.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$20
	}),
	TermsRoute: Route$6.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$20
	}),
	TicketRoute: Route$5.update({
		id: "/ticket",
		path: "/ticket",
		getParentRoute: () => Route$20
	}),
	ValuationRoute: Route$4.update({
		id: "/valuation",
		path: "/valuation",
		getParentRoute: () => Route$20
	}),
	AgentsIdRoute: Route$3.update({
		id: "/agents_/$id",
		path: "/agents/$id",
		getParentRoute: () => Route$20
	}),
	BlogSlugRoute: Route$2.update({
		id: "/blog_/$slug",
		path: "/blog/$slug",
		getParentRoute: () => Route$20
	}),
	ListingsIdRoute: Route$1.update({
		id: "/listings_/$id",
		path: "/listings/$id",
		getParentRoute: () => Route$20
	}),
	LocationsSlugRoute: Route.update({
		id: "/locations_/$slug",
		path: "/locations/$slug",
		getParentRoute: () => Route$20
	})
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: AppNotFound
	});
}
//#endregion
export { propertyTypes as C, slugify as E, propertiesForCity as S, formatTzs as T, getPost as _, Route$3 as a, properties as b, toProperty as c, useUserListings as d, agents as f, getLocation as g, getAgent as h, Route$2 as i, useFavorites as l, faqs as m, Route as n, Route$10 as o, blogPosts as p, Route$1 as r, filterProperties as s, router_exports as t, useSession as u, getProperty as v, cn as w, propertiesForAgent as x, locations as y };
