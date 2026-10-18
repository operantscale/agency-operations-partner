import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";
import { SOLUTIONS } from "@/lib/offers";

const TITLE = "OperantScale | Websites & Booking Systems for Auto Detailers";
const DESCRIPTION =
  "Professional detailing websites, lead management dashboards, and tailored booking and lead recovery systems for auto-detailing businesses.";

const FAQS = [
  {
    q: "What does the $250 professional website include?",
    a: "A premium mobile-responsive website with up to five agreed pages or sections, service and package details, a gallery using supplied assets, contact and quote-request forms, basic on-page SEO, and launch setup.",
  },
  {
    q: "What is included in the $80 monthly Website Care plan?",
    a: "Optional technical maintenance, issue resolution, routine checks, and minor content updates within the agreed support scope. Hosting and the plan transition at cancellation are defined in the project agreement.",
  },
  {
    q: "What is the difference between the $250 and $500 packages?",
    a: "The $250 package is a customer-facing detailing website. The $500 package adds a secure dashboard with inquiry forms, customer and lead records, status and follow-up tracking, and basic reporting setup.",
  },
  {
    q: "What does the $150 monthly Website & Dashboard Care plan cover?",
    a: "Optional maintenance, technical support, bug fixes, and a limited allowance for minor approved improvements. Larger modules, integrations, redesigns, and extensive requests are scoped and quoted separately.",
  },
  {
    q: "Can I request additional features later?",
    a: "Yes. Small changes may fit an agreed dashboard care allowance. Major features, integrations, redesigns, and larger development requests need separate scoping and a quote.",
  },
  {
    q: "Are the monthly care plans optional?",
    a: "Yes. Development is a one-time project fee. Website Care and Website & Dashboard Care are separate, optional services.",
  },
  {
    q: "Are domain and hosting costs included?",
    a: "Domain, hosting, messaging, and other third-party charges are confirmed before work begins. The project agreement defines account access, ownership, and handoff arrangements.",
  },
  {
    q: "Does the $500 package include automated lead recovery?",
    a: "No. It provides a lightweight dashboard for capturing and organizing inquiries. Automated missed-lead recovery and advanced booking workflows are scoped as part of a custom system.",
  },
  {
    q: "How is the complete system priced?",
    a: "The Complete Booking & Lead Recovery System is custom scoped. Implementation, integrations, and ongoing support are discussed after a workflow review and technical feasibility check.",
  },
  {
    q: "What happens after launch?",
    a: "We review the agreed deliverables and handoff. The project agreement documents ownership, account access, and transition arrangements; ongoing care continues only if you choose a plan.",
  },
];

const SCREENSHOTS = [
  {
    label: "Overview",
    title: "A clear view of the work in motion.",
    description: "See incoming leads, open quotes, bookings, and follow-ups in one workspace.",
    src: "/demo-screenshots/overview.jpeg",
    alt: "DetailingOS demo overview with lead pipeline, quote, booking, and follow-up views",
    width: 1600,
    height: 780,
  },
  {
    label: "Leads",
    title: "Keep each inquiry attached to its details.",
    description: "Review customer, vehicle, requested service, source, and lead status together.",
    src: "/demo-screenshots/leads.jpeg",
    alt: "DetailingOS demo lead list showing customer, vehicle, service, source, and status",
    width: 1600,
    height: 780,
  },
  {
    label: "Vehicles",
    title: "Keep useful vehicle context close.",
    description: "A sample vehicle view connects customer records with service history.",
    src: "/demo-screenshots/vehicles.jpeg",
    alt: "DetailingOS demo vehicle records with owners and recent service history",
    width: 1600,
    height: 780,
  },
  {
    label: "Messages",
    title: "Keep conversations in context.",
    description: "A sample inbox organizes customer conversations across communication channels.",
    src: "/demo-screenshots/messages.jpeg",
    alt: "DetailingOS demo messages inbox with customer conversations",
    width: 1600,
    height: 780,
  },
  {
    label: "Services",
    title: "Make the service menu easy to manage.",
    description:
      "Review example service descriptions, durations, and prices in the demo workspace.",
    src: "/demo-screenshots/services.jpeg",
    alt: "DetailingOS demo service list with example detailing prices and durations",
    width: 1600,
    height: 780,
  },
  {
    label: "Automation",
    title: "Map the steps behind a consistent follow-up.",
    description:
      "Review sample automation rules for lead response, missed inquiry recovery, quote follow-up, and appointment reminders.",
    src: "/demo-screenshots/automation.jpeg",
    alt: "DetailingOS demo automation center showing sample inquiry and appointment workflows",
    width: 1600,
    height: 780,
  },
  {
    label: "Quotes",
    title: "Keep quotes and their status in view.",
    description:
      "See how a demo workspace can organize draft, sent, viewed, accepted, declined, and expired quotes.",
    src: "/demo-screenshots/quotes.jpeg",
    alt: "DetailingOS demo quotes list with sample quote statuses and vehicle services",
    width: 1600,
    height: 780,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/") },
      { property: "og:image", content: getAbsoluteImageUrl() },
      { property: "og:image:alt", content: "OperantScale systems for auto-detailing businesses" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: getAbsoluteImageUrl() },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "OperantScale",
          description: DESCRIPTION,
          url: "https://operantscale.com",
          publisher: { "@id": "https://operantscale.com/#organization" },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const selected = SCREENSHOTS[activeScreenshot]!;
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section id="platform" className="scroll-mt-24 overflow-hidden pt-16">
          <div className="mx-auto grid max-w-[82rem] items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-10 lg:py-24">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                Built for auto-detailing businesses
              </p>
              <h1 className="mt-6 max-w-2xl text-[clamp(2.75rem,6vw,5.1rem)] leading-[0.99] font-medium tracking-[-0.055em] text-foreground">
                Turn more detailing inquiries into{" "}
                <span className="font-serif italic text-accent">booked appointments.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                OperantScale builds professional websites and practical lead systems that help
                detailing businesses capture inquiries, organize follow-up, and simplify the journey
                from first contact to confirmed booking.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  onClick={() =>
                    trackEvent("cta_click", { cta_name: "book_workflow_review", location: "hero" })
                  }
                  className="inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                >
                  Book a Workflow Review <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/"
                  hash="solutions"
                  className="inline-flex min-h-13 items-center justify-center gap-3 border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:border-primary"
                >
                  Explore our solutions <ArrowDownRight className="size-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-5 -z-10 bg-[radial-gradient(ellipse_at_55%_45%,rgba(107,157,245,0.16),transparent_68%)]" />
                <motion.div
                  {...(reducedMotion ? {} : { whileHover: { y: -5 } })}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden border border-border bg-white shadow-[0_30px_80px_-42px_rgba(11,37,69,0.48)]"
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-amber-400" />
                      <span className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                        Product demo
                      </span>
                    </div>
                    <span className="border border-amber-200 bg-amber-50 px-2 py-1 font-mono text-[0.6rem] tracking-[0.1em] text-amber-800 uppercase">
                      Demo mode
                    </span>
                  </div>
                  <img
                    src={SCREENSHOTS[0]!.src}
                    alt={SCREENSHOTS[0]!.alt}
                    width={SCREENSHOTS[0]!.width}
                    height={SCREENSHOTS[0]!.height}
                    fetchPriority="high"
                    className="w-full"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
                    <span className="text-xs text-muted-foreground">
                      DetailingOS sample workspace
                    </span>
                    <Link
                      to="/"
                      hash="demo"
                      className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-accent"
                    >
                      Explore the demo <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-[#f2f3f3]">
          <div className="mx-auto grid max-w-[82rem] gap-9 px-5 py-14 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-10 lg:py-20">
            <Reveal>
              <p className="eyebrow">The gap between inquiry and appointment</p>
              <h2 className="mt-5 max-w-lg text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Good work deserves a customer journey that keeps up.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                A missed call, a quote that sits too long, or a booking with no clear next step can
                leave a potential customer uncertain. A clear online presence and a dependable way
                to track follow-up make it easier for your team to keep the conversation moving.
              </p>
              <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
                {[
                  ["Capture", "Make services and the next step easy to find."],
                  ["Organize", "Keep inquiry details and status together."],
                  ["Follow through", "Give each lead a clear path toward booking."],
                ].map(([title, body]) => (
                  <div key={title}>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-20">
          <div className="mx-auto max-w-[82rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
            <Reveal>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Our solutions</p>
                  <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                    The right starting point for your detailing business.
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  From a professional website to a fully connected booking and lead recovery system,
                  choose the solution that fits your business today.
                </p>
              </div>
            </Reveal>
            <div className="mt-11 grid gap-4 lg:grid-cols-3">
              {SOLUTIONS.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.07} className="h-full">
                  <article
                    id={item.id}
                    className={`flex h-full scroll-mt-28 flex-col border p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-38px_rgba(11,37,69,0.45)] sm:p-7 ${item.featured ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white hover:border-accent"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs tracking-[0.14em] ${item.featured ? "text-primary-foreground/65" : "text-muted-foreground"}`}
                      >
                        {item.number} / {item.category}
                      </span>
                    </div>
                    <h3 className="mt-6 min-h-16 text-2xl leading-tight font-medium sm:text-[1.7rem]">
                      {item.name}
                    </h3>
                    <div className="mt-4 border-b border-current/15 pb-5">
                      <p className="text-4xl font-medium tracking-tight">{item.price}</p>
                      <span
                        className={`mt-1 block text-xs ${item.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {item.billing}
                      </span>
                    </div>
                    <p
                      className={`mt-5 text-sm leading-6 ${item.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {item.description}
                    </p>
                    {"featureIntro" in item && (
                      <p
                        className={`mt-6 text-xs font-medium ${item.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {item.featureIntro}
                      </p>
                    )}
                    <ul className="mt-4 space-y-3">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check
                            className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-blue-200" : "text-accent"}`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`mt-7 border p-4 ${item.featured ? "border-white/20 bg-white/[0.06]" : "border-border bg-surface/50"}`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="text-sm font-semibold">{item.care.name}</h4>
                        {"price" in item.care && (
                          <span className="text-sm font-medium">{item.care.price}</span>
                        )}
                      </div>
                      <p
                        className={`mt-2 text-xs leading-5 ${item.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                      >
                        {item.care.description}
                      </p>
                      {"scope" in item.care && (
                        <p
                          className={`mt-2 border-t pt-2 text-[0.68rem] leading-5 ${item.featured ? "border-white/15 text-primary-foreground/65" : "border-border text-muted-foreground"}`}
                        >
                          {item.care.scope}
                        </p>
                      )}
                      {"price" in item.care && (
                        <p
                          className={`mt-2 text-[0.68rem] ${item.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                        >
                          Optional monthly service
                        </p>
                      )}
                    </div>
                    <Link
                      to="/contact"
                      search={{ package: item.package }}
                      onClick={() =>
                        trackEvent("cta_click", {
                          cta_name: `pricing_${item.package}`,
                          location: "pricing_card",
                        })
                      }
                      className={`mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 text-center text-sm font-medium transition-colors ${item.featured ? "bg-white text-primary hover:bg-blue-50" : "border border-primary bg-primary text-primary-foreground hover:bg-accent"}`}
                    >
                      {item.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-xs leading-5 text-muted-foreground">
              Development is billed as a one-time project fee. Monthly care plans provide ongoing
              support within an agreed scope and are optional. Domain, hosting, third-party
              subscriptions, messaging, and other external service costs are confirmed before work
              begins. Ownership, account access, handoff, and cancellation transitions are defined
              in the project agreement.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[82rem] px-5 py-16 sm:px-8 sm:py-22 lg:px-10">
            <Reveal>
              <p className="eyebrow text-ink-muted">How it works</p>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="max-w-xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                  A clearer path from first conversation to launch.
                </h2>
                <p className="max-w-xl text-base leading-7 text-ink-muted">
                  We start with the way your detailing business operates, then shape a practical
                  solution around the real need.
                </p>
              </div>
            </Reveal>
            <ol className="mt-12 grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Review", "Talk through your services, inquiries, and current process."],
                ["02", "Plan", "Agree on the right package, scope, and priorities."],
                ["03", "Build", "Create the website or workflow system to the agreed plan."],
                ["04", "Launch", "Review the finished work and prepare it for handoff."],
              ].map(([n, title, body]) => (
                <li key={n} className="bg-ink p-6 sm:p-7">
                  <span className="font-mono text-xs tracking-[0.15em] text-ink-accent">{n}</span>
                  <h3 className="mt-7 text-xl font-medium">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 border-b border-border bg-[#f2f3f3]">
          <div className="mx-auto max-w-[82rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                <div>
                  <p className="eyebrow">Product demonstration</p>
                  <h2 className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                    See what happens after the inquiry.
                  </h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  Explore real screenshots from the project demo workspace. The records and activity
                  shown are sample demo data; messaging delivery is simulated in demo mode.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 overflow-hidden border border-border bg-white shadow-[0_32px_75px_-45px_rgba(11,37,69,0.42)]">
                <div
                  className="flex flex-wrap items-center gap-2 border-b border-border p-3 sm:px-5 sm:py-4"
                  role="tablist"
                  aria-label="Demo screenshots"
                >
                  {SCREENSHOTS.map((shot, index) => (
                    <button
                      key={shot.label}
                      id={`demo-tab-${index}`}
                      type="button"
                      role="tab"
                      tabIndex={activeScreenshot === index ? 0 : -1}
                      aria-selected={activeScreenshot === index}
                      aria-controls="demo-panel"
                      onKeyDown={(event) => {
                        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                          event.preventDefault();
                          const next =
                            (index + (event.key === "ArrowRight" ? 1 : SCREENSHOTS.length - 1)) %
                            SCREENSHOTS.length;
                          setActiveScreenshot(next);
                          trackEvent("demo_interaction", {
                            demo_view: SCREENSHOTS[next]!.label.toLowerCase(),
                            input_method: "keyboard",
                          });
                          document.getElementById(`demo-tab-${next}`)?.focus();
                        }
                      }}
                      onClick={() => {
                        if (activeScreenshot !== index) {
                          trackEvent("demo_interaction", {
                            demo_view: shot.label.toLowerCase(),
                            input_method: "pointer",
                          });
                        }
                        setActiveScreenshot(index);
                      }}
                      className={`min-h-10 border px-4 text-sm transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${activeScreenshot === index ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"}`}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
                <div
                  id="demo-panel"
                  role="tabpanel"
                  aria-labelledby={`demo-tab-${activeScreenshot}`}
                  className="grid lg:grid-cols-[0.34fr_0.66fr]"
                >
                  <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                    <p className="eyebrow">DetailingOS / {selected.label}</p>
                    <h3 className="mt-5 text-2xl leading-tight font-medium sm:text-3xl">
                      {selected.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {selected.description}
                    </p>
                    <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                      Sample workspace only. Features and integrations depend on the agreed project
                      scope.
                    </p>
                  </div>
                  <div className="group min-w-0 border-t border-border bg-[#f7f8fa] lg:border-t-0 lg:border-l">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={selected.src}
                        src={selected.src}
                        alt={selected.alt}
                        width={selected.width}
                        height={selected.height}
                        loading="lazy"
                        decoding="async"
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.99, x: 12 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        {...(reducedMotion ? {} : { exit: { opacity: 0, scale: 0.995, x: -8 } })}
                        transition={{
                          duration: reducedMotion ? 0 : 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full transition-transform duration-500 group-hover:scale-[1.012]"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="our-work" className="scroll-mt-20">
          <div className="mx-auto grid max-w-[82rem] gap-10 px-5 py-16 sm:px-8 sm:py-22 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:px-10">
            <Reveal>
              <p className="eyebrow">Selected project</p>
              <h2 className="mt-5 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                A connected experience for a detailing business.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                The Precision Toronto project brings together a customer-facing website and booking
                flow with an internal view of customer, vehicle, and appointment details.
              </p>
              <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">
                {[
                  "Service discovery and selection",
                  "Appointment booking flow",
                  "Customer and vehicle records",
                  "Admin workflow visibility",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <Check className="size-4 text-accent" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Project overview; no performance results are implied.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden border border-border bg-white">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <span className="font-mono text-xs tracking-[0.12em] uppercase">
                    Precision Toronto
                  </span>
                  <span className="text-xs text-muted-foreground">Project overview</span>
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  {[
                    ["Customer website", "A clear home for detailing services."],
                    ["Booking flow", "Service selection and appointment requests."],
                    ["Operations", "A structured view of upcoming work."],
                    ["Customer records", "Vehicle and service context together."],
                  ].map(([title, body], index) => (
                    <div
                      key={title}
                      className={`bg-white p-6 ${index > 1 ? "border-t border-border" : ""}`}
                    >
                      <span className="font-mono text-xs text-accent">0{index + 1}</span>
                      <h3 className="mt-4 font-medium">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-[#f2f3f3] px-5 py-4 text-xs text-muted-foreground">
                  Automotive detailing web application and booking workflow
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-t border-border bg-white">
          <div className="mx-auto grid max-w-[82rem] gap-10 px-5 py-16 sm:px-8 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-10">
            <Reveal>
              <p className="eyebrow">Frequently asked</p>
              <h2 className="mt-5 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Questions from detailing business owners.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl pb-6 text-sm leading-7 text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-[82rem] flex-col gap-8 px-5 py-14 sm:px-8 sm:py-18 md:flex-row md:items-center md:justify-between lg:px-10">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-white/65 uppercase">
                Your next step
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Let's make every inquiry easier to manage.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Tell us a little about your business and what you'd like to improve. We'll help
                identify a useful starting point.
              </p>
            </div>
            <Link
              to="/contact"
              onClick={() =>
                trackEvent("cta_click", { cta_name: "book_workflow_review", location: "final_cta" })
              }
              className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-blue-50"
            >
              Book a Workflow Review <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
