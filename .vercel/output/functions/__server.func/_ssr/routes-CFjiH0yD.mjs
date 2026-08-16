import { r as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_react, i as Root2, n as Header, r as Item, s as require_jsx_runtime, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ArrowRight, r as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-footer-DKpIWgTm.mjs";
import { t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./reveal-C3PsGeY_.mjs";
import { n as FAQS } from "./router-I5TLBfZI.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CFjiH0yD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
/**
* OperantScale visual language:
* fine 1px lines, square nodes, mono micro-labels, single blue accent,
* left-to-right or top-down progression. No decoration for its own sake.
*/
/** Hero: existing systems -> workflow layer -> AI + automation -> team capacity. */
function SystemVisual({ className }) {
	const reduced = useReducedMotion();
	const sysY = [
		56,
		104,
		152,
		200
	];
	const FLOW_X = 258;
	const AI_X = 420;
	const stages = [
		{
			x: 40,
			label: "Systems"
		},
		{
			x: FLOW_X,
			label: "Workflow layer"
		},
		{
			x: AI_X,
			label: "AI + automation"
		},
		{
			x: 632,
			label: "Capacity"
		}
	];
	const feed = sysY.map((y) => `M87 ${y} C 164 ${y}, 168 128, 242 128`);
	const mid = [`M274 128 C 328 128, 350 96, 406 96`, `M274 128 C 328 128, 350 160, 406 160`];
	const out = [`M434 96 C 480 96, 506 128, 552 128`, `M434 160 C 480 160, 506 128, 552 128`];
	const paths = [
		...feed,
		...mid,
		...out
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 640 280",
		className,
		role: "img",
		"aria-label": "Diagram: existing agency systems feed a workflow layer, where AI and automation are applied selectively, returning capacity to the team.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				stroke: "var(--color-line)",
				strokeWidth: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "20",
					x2: "640",
					y2: "20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "248",
					x2: "640",
					y2: "248"
				})]
			}),
			paths.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d,
				fill: "none",
				stroke: "var(--color-line)",
				strokeWidth: "1"
			}), !reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				r: "2.4",
				fill: "var(--color-accent)",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					1,
					1,
					0
				] },
				transition: {
					duration: 5,
					delay: i * .45,
					repeat: Infinity,
					repeatDelay: 1.2,
					ease: "linear"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
					dur: "5s",
					begin: `${i * .45}s`,
					repeatCount: "indefinite",
					path: d,
					keyPoints: "0;1",
					keyTimes: "0;1"
				})
			})] }, d)),
			sysY.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 61,
				y: y - 9,
				width: "26",
				height: "18",
				fill: "var(--color-background)",
				stroke: "var(--color-foreground)",
				strokeWidth: "1"
			}, y)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 242,
				y: "72",
				width: "32",
				height: "112",
				fill: "var(--color-background)",
				stroke: "var(--color-foreground)",
				strokeWidth: "1"
			}),
			[
				92,
				128,
				164
			].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 242,
				y1: y,
				x2: 274,
				y2: y,
				stroke: "var(--color-line)",
				strokeWidth: "1"
			}, y)),
			[96, 160].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 406,
				y: y - 14,
				width: "28",
				height: "28",
				fill: "var(--color-background)",
				stroke: "var(--color-accent)",
				strokeWidth: "1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: AI_X,
				cy: y,
				r: "3.6",
				fill: "var(--color-accent)"
			})] }, y)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 552,
				y: "114",
				width: "28",
				height: "28",
				fill: "color-mix(in oklab, var(--color-accent) 12%, transparent)",
				stroke: "var(--color-accent)",
				strokeWidth: "1"
			}),
			[
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 592,
				y1: 116 + i * 12,
				x2: 592 + (i === 1 ? 40 : 26),
				y2: 116 + i * 12,
				stroke: "var(--color-accent)",
				strokeWidth: "1",
				opacity: i === 1 ? .8 : .4
			}, i)),
			stages.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: s.x,
				y: "238",
				textAnchor: i === 0 ? "start" : i === stages.length - 1 ? "end" : "middle",
				fill: "var(--color-muted-foreground)",
				fontSize: "10",
				letterSpacing: "1.2",
				fontFamily: "var(--font-mono)",
				children: s.label.toUpperCase()
			}, s.label))
		]
	});
}
/** Operational reality: systems -> people and manual handoffs -> friction -> opportunity. */
function HandoffVisual({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3",
			children: [
				"AMS",
				"CRM",
				"Email",
				"Communication",
				"Quoting",
				"Internal workflows"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-background px-4 py-5 text-sm text-foreground",
				children: s
			}, s))
		}), [
			{
				label: "People + manual handoffs",
				note: "Re-entry, chasing, coordination"
			},
			{
				label: "Operational friction",
				note: "Time absorbed between systems"
			},
			{
				label: "Opportunity for improvement",
				note: "Where a system may help",
				accent: true
			}
		].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto h-8 w-px bg-border",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex flex-col gap-1 border px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${f.accent ? "border-accent bg-accent/5" : "border-border bg-surface"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-sm font-medium ${f.accent ? "text-accent" : "text-foreground"}`,
				children: f.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase",
				children: f.note
			})]
		})] }, f.label))]
	});
}
/** Existing-technology architecture: systems -> workflow layer -> AI + automation -> capacity. */
function StackVisual({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[0.65rem] tracking-[0.18em] text-ink-muted uppercase",
				children: "Existing systems"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-px border border-ink-border bg-ink-border sm:grid-cols-3",
				children: [
					"AMS",
					"CRM",
					"Email",
					"Communication",
					"Quoting",
					"Internal systems"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-ink px-4 py-4 text-sm text-ink-foreground",
					children: s
				}, s))
			}),
			[
				{
					label: "Workflow layer",
					note: "How the work actually moves"
				},
				{
					label: "AI + automation",
					note: "Applied only where it helps",
					accent: true
				},
				{
					label: "Team capacity",
					note: "Returned to client-facing work"
				}
			].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-7 w-px bg-ink-border",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex flex-col gap-1 border px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${row.accent ? "border-ink-accent bg-ink-accent/10" : "border-ink-border"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-ink-foreground",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[0.68rem] tracking-[0.14em] text-ink-muted uppercase",
					children: row.note
				})]
			})] }, row.label))
		]
	});
}
var WORK_AREAS = [
	{
		title: "Lead & Inquiry Handling",
		body: "New inquiries arrive across phone, email, web forms and referrals, and each one has to be routed, recorded and answered."
	},
	{
		title: "Quote Workflows",
		body: "Gathering information, re-entering it across systems, and moving a quote through to a decision."
	},
	{
		title: "Client Service",
		body: "Certificates, endorsements, questions and document requests that recur across the book."
	},
	{
		title: "Renewals",
		body: "Identifying upcoming renewals, preparing them, and coordinating client communication on time."
	},
	{
		title: "Internal Coordination",
		body: "Handoffs between producers, account managers and service staff, and the follow-up they generate."
	},
	{
		title: "Data & Documentation",
		body: "Moving information between the AMS and other systems, and keeping records consistent."
	}
];
var CAPABILITY_GROUPS = [
	{
		n: "01",
		title: "Client Acquisition",
		body: "Making sure nothing arriving at the agency is missed, delayed or handled twice.",
		items: [
			"Lead intake",
			"Qualification",
			"Follow-up",
			"Inquiry routing"
		]
	},
	{
		n: "02",
		title: "Client Service",
		body: "Keeping recurring service work moving without constant manual coordination.",
		items: [
			"Client communication workflows",
			"Request routing",
			"Task coordination",
			"Follow-up systems"
		]
	},
	{
		n: "03",
		title: "Agency Operations",
		body: "Reducing the administrative work that sits between your existing systems.",
		items: [
			"Administrative workflow automation",
			"Data movement",
			"Internal coordination",
			"Documentation workflows"
		]
	},
	{
		n: "04",
		title: "Growth Capacity",
		body: "Creating room to handle more volume with the team and systems you already have.",
		items: [
			"Renewal workflow support",
			"Operational visibility",
			"AI-assisted processes",
			"Custom integrations"
		]
	}
];
var STAGES = [
	{
		n: "01",
		title: "Understand",
		body: "Learn how the agency actually operates, day to day."
	},
	{
		n: "02",
		title: "Map",
		body: "Identify workflows, bottlenecks, handoffs and repetitive work."
	},
	{
		n: "03",
		title: "Design",
		body: "Determine where AI and automation can create practical value."
	},
	{
		n: "04",
		title: "Implement",
		body: "Build and integrate the system into the existing workflow."
	},
	{
		n: "05",
		title: "Optimize",
		body: "Monitor, refine and improve the system over time."
	}
];
var OUTCOMES = [
	{
		title: "Less repetitive work",
		body: "Designed to reduce the manual steps that recur every day."
	},
	{
		title: "Faster workflows",
		body: "Intended to shorten the path from inquiry to resolution."
	},
	{
		title: "Better visibility",
		body: "Clearer sight of where work sits and what is waiting."
	},
	{
		title: "More team capacity",
		body: "Time returned to producers and service staff."
	},
	{
		title: "Better client experience",
		body: "Helps responses stay timely and consistent."
	},
	{
		title: "Capacity to grow",
		body: "Supporting more volume without proportional headcount."
	}
];
var PRINCIPLES = [
	"Minimize unnecessary data movement",
	"Work with existing systems where appropriate",
	"Use controlled access",
	"Apply least-privilege principles where applicable",
	"Avoid unnecessary exposure of sensitive information",
	"Evaluate workflow and security requirements before implementation",
	"Design around the agency's existing technology and policies"
];
var NEXT_STEPS = [
	{
		n: "01",
		t: "Conversation",
		b: "Understand the agency."
	},
	{
		n: "02",
		t: "Workflow review",
		b: "Identify friction and repetitive work."
	},
	{
		n: "03",
		t: "Opportunity assessment",
		b: "Determine whether automation makes sense."
	},
	{
		n: "04",
		t: "Recommendation",
		b: "If there is a meaningful opportunity, recommend the appropriate system."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid-lines pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto max-w-[84rem] px-6 lg:px-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Operational intelligence · Independent P&C agencies"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-6 max-w-2xl text-[2.6rem] leading-[1.04] font-medium tracking-[-0.028em] sm:text-[3.4rem] lg:text-[4rem]",
									children: "AI-Powered Operational Systems for Independent P&C Insurance Agencies"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-[1.1875rem] leading-[1.62] text-muted-foreground",
									children: "We reduce the repetitive administrative work inside your agency, improve the workflows between your existing systems, and create capacity for your team to serve clients better and grow sustainably. AI is the mechanism—operational improvement is the product."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										className: "inline-flex h-16 items-center justify-center gap-3 whitespace-nowrap bg-primary px-10 text-[0.82rem] font-medium tracking-[0.11em] text-primary-foreground uppercase shadow-[0_18px_40px_-20px_var(--color-primary)] transition-colors hover:bg-primary/90",
										children: ["Book an operational discovery ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										hash: "approach",
										className: "inline-flex h-16 items-center justify-center whitespace-nowrap border border-foreground/25 px-9 text-[0.82rem] font-medium tracking-[0.11em] text-foreground uppercase transition-colors hover:bg-secondary",
										children: "See how we work"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-8 max-w-md border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground",
									children: "Built for established independent P&C agencies with growing operational complexity."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .15,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemVisual, { className: "w-full max-w-xl lg:max-w-none" })
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Operational reality"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Your Agency May Already Have the Right Tools."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 max-w-lg space-y-5 text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Most established agencies already run an AMS, a CRM, email, communication platforms, quoting tools and client portals. The technology is usually not the missing piece." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"The work that accumulates is often the work",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: "between"
											}),
											" those systems: information moved by hand, follow-ups chased, data re-entered, and coordination across tools that were never designed to talk to each other."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: "Not every agency experiences this the same way—which is exactly what discovery is for."
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandoffVisual, { className: "w-full" })
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Where the workload accumulates"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "The Work Behind the Work"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: "Potential opportunities may exist across the areas below. These are operational investigation areas—not assumptions about how your agency runs."
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 border-t border-border",
							children: WORK_AREAS.map((area, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .04,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 border-b border-border py-7 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.72rem] tracking-[0.18em] text-accent",
											children: String(i + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xl font-medium",
											children: area.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[1rem] leading-[1.7] text-muted-foreground",
											children: area.body
										})
									]
								})
							}, area.title))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "capabilities",
					className: "scroll-mt-16 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "What OperantScale does"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "We Design Systems Around How Your Agency Actually Works."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: "Four operational capability groups. We don't start with a pre-built automation and force it into your agency—we first understand the workflow, identify where capacity may be lost, and determine whether automation is actually the right answer."
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid gap-px border border-border bg-border md:grid-cols-2",
							children: CAPABILITY_GROUPS.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .06,
								className: "bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-full p-8 lg:p-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[0.72rem] tracking-[0.18em] text-accent",
												children: g.n
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-[1.375rem] font-medium",
												children: g.title
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 max-w-md text-[1rem] leading-[1.7] text-muted-foreground",
											children: g.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-6 grid gap-x-8 sm:grid-cols-2",
											children: g.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "border-t border-border py-3.5 text-[1rem] text-foreground",
												children: item
											}, item))
										})
									]
								})
							}, g.n))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Who OperantScale is built for"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-lg text-[2.25rem] leading-[1.08] font-medium sm:text-[2.75rem]",
									children: "Built for Established Independent P&C Agencies."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-lg text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: "Built for established independent P&C agencies with growing operational complexity — established teams, existing technology and multiple workflows running at once. There is no employee-count requirement; fit is about operational complexity, not size."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "grid gap-x-10 sm:grid-cols-2",
									children: [
										"Independent P&C agencies",
										"Established teams",
										"Existing AMS and business systems",
										"Multiple concurrent workflows",
										"Growing administrative complexity",
										"Service standards worth protecting"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "border-t border-border py-4 text-[1rem] text-foreground",
										children: item
									}, item))
								})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-ink text-ink-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-ink-muted",
									children: "Existing technology"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-lg text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Built Around Your Existing Technology"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 max-w-lg space-y-5 text-[1.125rem] leading-[1.7] text-ink-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-ink-foreground",
											children: "We aren't here to replace the systems your agency already relies on."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We examine how your people, processes and existing systems interact—and identify opportunities to improve the work between them." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: "The layers shown are conceptual. Actual systems and integration options are evaluated against your stack during discovery."
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackVisual, {})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "approach",
					className: "scroll-mt-16 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Approach"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Understand the Workflow. Then Build the System."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: "We don't start with a pre-built automation. We start by understanding how the work actually moves through your agency—then design only what earns its place."
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5",
							children: STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .09,
								className: "bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex h-full flex-col justify-between p-7 lg:min-h-64",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.72rem] tracking-[0.18em] text-accent",
										children: stage.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-6 text-xl font-medium",
										children: stage.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 text-[1rem] leading-[1.65] text-muted-foreground",
										children: stage.body
									})]
								})
							}, stage.n))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Outcomes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Create More Capacity From the Team and Systems You Already Have."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-sm text-[1rem] leading-[1.7] text-muted-foreground",
									children: "Results depend on the agency, its systems and the scope of work. The following are the kinds of improvement a well-designed operational system is intended to create."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "grid gap-x-12 sm:grid-cols-2",
									children: OUTCOMES.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border py-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-lg font-medium",
											children: o.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-2 text-[1rem] leading-[1.7] text-muted-foreground",
											children: o.body
										})]
									}, o.title))
								})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Responsible automation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Built With Operational Responsibility."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-lg text-[1.125rem] leading-[1.7] text-muted-foreground",
									children: "Insurance agencies work with sensitive client and business information. Automation should improve operations without compromising control."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								delay: .1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "border-t border-border",
									children: PRINCIPLES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-baseline gap-6 border-b border-border py-4 text-[1rem] text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.68rem] tracking-[0.18em] text-accent",
											children: String(i + 1).padStart(2, "0")
										}), p]
									}, p))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground",
									children: "These are working principles, not certifications. Specific security and information-handling requirements are evaluated with your agency before anything is implemented."
								})]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Why OperantScale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 max-w-xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
								children: "Built for Operations. Not Just Automation."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-10 md:grid-cols-3",
								children: [
									{
										t: "Industry focused",
										b: "We work specifically with independent P&C insurance agencies, not with everyone."
									},
									{
										t: "Workflow first",
										b: "We understand the process before recommending any technology."
									},
									{
										t: "Outcome oriented",
										b: "Automation is only useful when it improves the way the business operates."
									}
								].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: i * .08,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t-2 border-foreground pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "eyebrow text-foreground",
											children: p.t
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground",
											children: p.b
										})]
									})
								}, p.t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-16 max-w-3xl border-l-2 border-accent pl-6 text-[1.75rem] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[2.75rem]",
									children: "Don't automate for the sake of automation."
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "faq",
					className: "scroll-mt-16 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "FAQ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[2.75rem]",
								children: "Questions we're usually asked first"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .08,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									type: "single",
									collapsible: true,
									className: "w-full",
									children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										value: `item-${i}`,
										className: "border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											className: "py-6 text-left text-[1.125rem] font-medium hover:no-underline",
											children: f.q
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
											className: "max-w-2xl pb-7 text-[1.0625rem] leading-[1.75] text-muted-foreground",
											children: f.a
										})]
									}, f.q))
								})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-ink text-ink-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-ink-muted",
									children: "Next step"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 max-w-2xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]",
									children: "Let's Find Where Your Agency Is Losing Capacity."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-ink-muted",
									children: "We'll review how your team, systems and workflows currently operate and identify areas where unnecessary manual work may be limiting capacity."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 lg:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "inline-flex h-16 w-full items-center justify-center gap-3 whitespace-nowrap bg-ink-foreground px-10 text-[0.82rem] font-medium tracking-[0.11em] text-ink uppercase shadow-[0_18px_44px_-22px_var(--color-ink-accent)] transition-opacity hover:opacity-90 sm:w-auto",
									children: ["Book an operational discovery ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-sm text-sm leading-relaxed text-ink-muted lg:text-right",
									children: "No obligation. No pre-built automation package. Just a conversation about how your agency operates."
								})]
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-16 grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4",
							children: NEXT_STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .07,
								className: "bg-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "h-full p-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.72rem] tracking-[0.18em] text-ink-accent",
											children: s.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-5 text-lg font-medium text-ink-foreground",
											children: s.t
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[1rem] leading-[1.65] text-ink-muted",
											children: s.b
										})
									]
								})
							}, s.n))
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { HomePage as component };
