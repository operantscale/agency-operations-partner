import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as __exportAll } from "./server-1hXjwGMJ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BCJVnwsE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DSLD4fVQ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "OperantScale" },
			{
				name: "description",
				content: "Operational Intelligence for Independent P&C Insurance Agencies."
			},
			{
				property: "og:site_name",
				content: "OperantScale"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
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
				href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Geist:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "OperantScale",
				url: "https://operantscale.com",
				email: "wajeeh@operantscale.com",
				description: "Operational Intelligence for Independent P&C Insurance Agencies."
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var FAQS = [
	{
		q: "Will you replace our AMS?",
		a: "No. OperantScale is designed to work around existing systems where appropriate and improve the workflows between people, processes and technology."
	},
	{
		q: "Do we need to change our existing software?",
		a: "Not necessarily. The goal is to improve how your existing systems, people and workflows work together."
	},
	{
		q: "Do we need to know exactly what we want automated?",
		a: "No. That's part of the discovery process. We first understand how your team works and identify where meaningful opportunities may exist."
	},
	{
		q: "What happens during the first conversation?",
		a: "We learn how your agency operates, understand the workflows that create the most friction, and determine whether there is a worthwhile opportunity for improvement."
	},
	{
		q: "How do you handle sensitive information?",
		a: "Information handling is considered as part of the workflow design. We aim to minimize unnecessary data movement, use appropriate access controls and design systems around the agency's existing technology and policies."
	},
	{
		q: "Will AI replace our staff?",
		a: "The focus is reducing repetitive work and increasing team capacity—not replacing the people who create value through judgment, relationships and client service."
	},
	{
		q: "Is every agency a good fit?",
		a: "No. Automation should only be applied where it creates meaningful operational value."
	},
	{
		q: "What systems can you work with?",
		a: "That depends on the agency's existing technology stack. Systems and workflows are evaluated before recommending an approach."
	},
	{
		q: "How much does an automation project cost?",
		a: "Every agency's workflows and technology environment are different, so we scope projects around the operational opportunity rather than selling a fixed automation package. Pricing is discussed after understanding the workflow and requirements."
	},
	{
		q: "How do we get started?",
		a: "Start with an operational discovery conversation. It's a working session, not a sales call."
	}
];
var $$splitComponentImporter$3 = () => import("./routes-NEdoMD1A.mjs");
var TITLE = "OperantScale | AI-Powered Operational Systems for P&C Insurance Agencies";
var DESCRIPTION = "OperantScale helps independent P&C insurance agencies reduce repetitive administrative work, improve workflows and create team capacity through practical AI-powered operational systems.";
var Route$3 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				property: "og:title",
				content: TITLE
			},
			{
				property: "og:description",
				content: DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ProfessionalService",
				name: "OperantScale",
				description: DESCRIPTION,
				url: "https://operantscale.com",
				email: "wajeeh@operantscale.com",
				areaServed: "US",
				serviceType: "Insurance agency workflow automation, operational systems and AI-assisted process design",
				audience: {
					"@type": "Audience",
					audienceType: "Independent Property & Casualty insurance agencies"
				}
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-BOk71AMP.mjs");
var Route$2 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact OperantScale | Operational Discovery for P&C Agencies" },
			{
				name: "description",
				content: "Start a conversation with OperantScale. Tell us about your agency and the operational challenge you're looking to understand."
			},
			{
				property: "og:title",
				content: "Start With a Conversation — OperantScale"
			},
			{
				property: "og:description",
				content: "Request an operational discovery conversation with OperantScale, a specialist in operational systems for independent P&C insurance agencies."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/contact"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}],
		scripts: [{
			src: "https://www.google.com/recaptcha/api.js",
			async: true,
			defer: true
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./privacy-DlPq9K-t.mjs");
var Route$1 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy | OperantScale" },
			{
				name: "description",
				content: "How OperantScale collects, uses and protects information submitted through operantscale.com."
			},
			{
				property: "og:title",
				content: "Privacy — OperantScale"
			},
			{
				property: "og:description",
				content: "How OperantScale handles information submitted through its website."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/privacy"
			}
		],
		links: [{
			rel: "canonical",
			href: "/privacy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./terms-af381rA6.mjs");
var Route = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms | OperantScale" },
			{
				name: "description",
				content: "Terms governing use of the OperantScale website and information published on it."
			},
			{
				property: "og:title",
				content: "Terms — OperantScale"
			},
			{
				property: "og:description",
				content: "Terms governing use of the OperantScale website."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/terms"
			}
		],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	ContactRoute: Route$2.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$4
	}),
	PrivacyRoute: Route$1.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$4
	}),
	TermsRoute: Route.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { FAQS as n, router_exports as t };
