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
import { HeroEntrance, Reveal } from "@/components/site/reveal";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";
import { SOLUTIONS } from "@/lib/offers";

const TITLE = "OperantScale | Detailing Websites & Inquiry Workflows";
const DESCRIPTION =
  "Professional websites and practical inquiry workflows for independent auto detailing businesses.";

const FAQS = [
  {
    q: "What does the free website preview include?",
    a: "A personalized one-page staging website with business-specific styling and service information, an interactive quote-request journey, and a short walkthrough. The preview is available for seven calendar days once it is ready. It is for evaluation, not a production website, and does not include live customer-data collection, notifications, complete integrations, or unlimited hosting or revisions.",
  },
  {
    q: "Do I need a website to request a preview?",
    a: "No. You can share your business details and an optional website or social profile. A website is not required.",
  },
  {
    q: "What is included in a paid website implementation?",
    a: "The website scope is agreed with you and can include up to five pages or sections, service and gallery content, business and service-area information, a quote-request form, click-to-call and click-to-text options, and basic technical and on-page SEO setup.",
  },
  {
    q: "What does inquiry management add?",
    a: "It connects quote-request capture with business notifications, customer and inquiry records, agreed lead stages, follow-up reminders, and basic inquiry reporting. The exact setup is confirmed during scoping.",
  },
  {
    q: "Are booking and follow-up automations included?",
    a: "Booking integrations, appointment reminders, missed-inquiry follow-up, review requests, and rebooking workflows are optional capabilities. We confirm feasibility and scope before implementation.",
  },
  {
    q: "How do website care and ongoing support work?",
    a: "Ongoing care and support are discussed separately and defined in an agreed scope. They are not automatically included with a website or workflow build, and do not mean unlimited development.",
  },
  {
    q: "How are hosting, domain, and third-party fees handled?",
    a: "Hosting, domain registration, and third-party service fees are reviewed before implementation and agreed separately as part of the project scope.",
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
        <section id="platform" className="scroll-mt-24 relative overflow-hidden pt-[4.5rem]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="page-container grid grid-cols-[minmax(0,1fr)] items-center gap-10 pb-16 pt-8 sm:gap-12 sm:pb-20 sm:pt-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 lg:pb-24 lg:pt-14">
            <div className="w-full min-w-0">
              <HeroEntrance delay={0}>
                <div className="inline-flex items-center gap-3 rounded-full border border-border bg-white/80 px-3 py-2 shadow-[0_12px_30px_-22px_rgba(19,30,49,0.35)] backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                  <p className="eyebrow !mb-0 !mt-0 text-[0.62rem] tracking-[0.18em] text-muted-foreground">
                    WEBSITES & INQUIRY SYSTEMS FOR AUTO DETAILERS
                  </p>
                </div>
              </HeroEntrance>
              <HeroEntrance delay={0.08}>
                <h1 className="mt-6 max-w-[16ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.055em] text-foreground sm:max-w-[14ch] lg:max-w-[13ch]">
                  Turn More Detailing Inquiries Into Booked Jobs.
                </h1>
              </HeroEntrance>
              <HeroEntrance delay={0.16}>
                <p className="mt-6 w-full max-w-[36rem] text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
                  We build professional detailing websites and simple quote-request workflows for
                  independent and mobile detailers who currently rely on calls, texts, and DMs to
                  manage customer inquiries.
                </p>
              </HeroEntrance>
              <HeroEntrance delay={0.24}>
                <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-9 sm:flex-row">
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_name: "free_website_preview",
                        location: "hero",
                      })
                    }
                    className="arrow-link inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent sm:w-auto"
                  >
                    Request a Free Website Preview <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/"
                    hash="solutions"
                    className="arrow-link inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary sm:w-auto"
                  >
                    Explore Solutions <ArrowDownRight className="size-4" />
                  </Link>
                </div>
              </HeroEntrance>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
                <p className="max-w-lg text-xs leading-5 text-muted-foreground sm:text-sm">
                  Start with a personalized website preview. Add inquiry management when your
                  business needs it.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase sm:mt-9">
                {[
                  "Mobile-friendly",
                  "Lead-ready",
                  "Built for detailers",
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-border bg-white px-3 py-2 shadow-[0_10px_22px_-22px_rgba(19,30,49,0.5)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <Reveal delay={0.2} className="relative w-full min-w-0 lg:translate-y-2">
              <div className="relative isolate w-full min-w-0 max-w-full px-0 pb-0 sm:px-2 sm:pb-2">
                <div className="absolute inset-3 -z-10 translate-x-4 translate-y-4 rounded-[1.75rem] border border-border bg-surface" />
                <motion.div
                  {...(reducedMotion ? {} : { whileHover: { y: -2 } })}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_24px_55px_-36px_rgba(11,37,69,0.4)]"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                        <span className="size-2 rounded-full bg-border" />
                        <span className="size-2 rounded-full bg-border" />
                        <span className="size-2 rounded-full bg-border" />
                      </div>
                      <span className="truncate font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase sm:text-[0.68rem]">
                        INQUIRY WORKFLOW PREVIEW
                      </span>
                    </div>
                    <span className="shrink-0 border border-border px-2 py-1 font-mono text-[0.57rem] tracking-[0.08em] text-muted-foreground uppercase">
                      Sample data
                    </span>
                  </div>
                  <img
                    src={SCREENSHOTS[0]!.src}
                    alt={SCREENSHOTS[0]!.alt}
                    width={SCREENSHOTS[0]!.width}
                    height={SCREENSHOTS[0]!.height}
                    fetchPriority="high"
                    className="block w-full max-w-full"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
                    <span className="text-xs text-muted-foreground">DetailingOS demo workspace</span>
                    <Link
                      to="/"
                      hash="demo"
                      className="arrow-link inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-accent"
                    >
                      Explore the demo <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </motion.div>
                <Reveal
                  delay={0.38}
                  className="absolute -right-1 bottom-5 z-10 hidden w-[15.5rem] rounded-2xl border border-border bg-card p-4 shadow-[0_18px_36px_-28px_rgba(11,37,69,0.46)] xl:block"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                      Example inquiry
                    </span>
                    <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">Interior + Exterior Detail</p>
                  <p className="mt-1 text-xs text-muted-foreground">Awaiting response · Sample</p>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="page-container section-space">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="eyebrow">The gap between inquiry and appointment</p>
                  <h2 className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">
                    Good work deserves a customer journey that keeps up.
                  </h2>
                </div>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Calls, texts, and messages often arrive while you're working on a vehicle. It can
                  be hard to answer every question and keep each quote moving. A clear online
                  presence and a simple inquiry process give customers a better next step and help
                  you keep track of conversations.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="relative mt-10 grid gap-3 sm:mt-12 md:grid-cols-3 md:gap-4">
                <div
                  aria-hidden="true"
                  className="absolute left-[16.7%] right-[16.7%] top-10 hidden border-t border-dashed border-border md:block"
                />
                {[
                  ["01", "Capture", "Make services and the next step easy to find."],
                  ["02", "Organize", "Keep inquiry details and status together."],
                  ["03", "Follow through", "Give each lead a clear path toward booking."],
                ].map(([number, title, body]) => (
                  <li
                    key={title}
                    className="relative rounded-xl border border-border bg-card p-5 shadow-[0_16px_34px_-30px_rgba(19,30,49,0.42)] sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-full border border-border bg-card font-mono text-[0.65rem] tracking-[0.08em] text-accent">
                        {number}
                      </span>
                      <span className="eyebrow !text-[0.62rem] !tracking-[0.14em]">
                        Step {number}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-20">
          <div className="page-container section-space">
            <Reveal>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Our solutions</p>
                  <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                    The right starting point for your detailing business.
                  </h2>
                </div>
                <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Start with a professional online presence, organize incoming leads, or connect
                  your entire booking workflow.
                </p>
              </div>
            </Reveal>
            <div className="mt-9 grid gap-5 sm:mt-11 lg:grid-cols-3 lg:gap-6">
              {SOLUTIONS.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.07} className="h-full">
                  <article
                    id={item.id}
                    className={`flex h-full scroll-mt-28 flex-col border p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-34px_rgba(11,37,69,0.34)] sm:p-6 lg:p-7 ${item.featured ? "border-t-2 border-t-accent border-primary bg-primary text-primary-foreground" : "border-border bg-white hover:border-accent"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs tracking-[0.14em] ${item.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[1.6rem] leading-tight font-medium sm:text-[1.7rem]">
                      {item.name}
                    </h3>
                    <p
                      className={`mt-3 text-[0.9375rem] leading-6 ${item.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {item.description}
                    </p>
                    <ul className="mt-7 space-y-3.5">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm leading-5">
                          <Check
                            className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-blue-200" : "text-accent"}`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      search={{ package: item.package }}
                      onClick={() =>
                        trackEvent("cta_click", {
                          cta_name: `engagement_${item.package}`,
                          location: "engagement_card",
                        })
                      }
                      className={`arrow-link mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 text-center text-sm font-medium transition-colors ${item.featured ? "bg-white text-primary hover:bg-blue-50" : "border border-primary bg-primary text-primary-foreground hover:bg-accent"}`}
                    >
                      {item.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-6 text-muted-foreground">
              Every business works differently. We'll recommend the right setup based on your
              services, inquiry process, and goals. Implementation and ongoing support are scoped
              after a consultation.
            </p>
            <Link
              to="/"
              hash="demo"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent"
            >
              See how it works <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-ink text-ink-foreground">
          <div className="page-container section-space">
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
            <Reveal delay={0.12}>
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
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 grid gap-8 border-t border-ink-border pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
                <div>
                  <p className="eyebrow text-ink-muted">Your free website preview</p>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    A personalized one-page staging website with your services and business details,
                    an interactive quote-request journey, and a short walkthrough. The preview is
                    available for seven calendar days once it is ready.
                  </p>
                </div>
                <div>
                  <ol className="grid gap-5 sm:grid-cols-3">
                    {[
                      "Tell us about your detailing business.",
                      "We review your details and prepare the preview.",
                      "Walk through it and discuss a paid build if it fits.",
                    ].map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-6 text-ink-foreground">
                        <span className="font-mono text-xs text-ink-accent">0{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-ink-muted">
                    For evaluation only, not a production website. The preview does not collect live
                    customer data or send live notifications. Production hosting, a domain,
                    integrations, and unlimited revisions are not included.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-foreground underline underline-offset-4 hover:text-ink-accent"
                  >
                    Request a Free Website Preview <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 border-b border-border bg-surface">
          <div className="page-container section-space">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                <div>
                  <p className="eyebrow">Product demonstration</p>
                  <h2 className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                    See what happens after the inquiry.
                  </h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  This sample workflow shows how an inquiry can be captured, given a status, and
                  followed up. The records are example demo data, and messaging delivery is
                  simulated.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 overflow-hidden border border-border bg-white shadow-[0_20px_52px_-38px_rgba(11,37,69,0.32)]">
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
                      className={`min-h-11 border px-4 text-sm transition-[color,background-color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${activeScreenshot === index ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"}`}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
                <div
                  id="demo-panel"
                  role="tabpanel"
                  aria-labelledby={`demo-tab-${activeScreenshot}`}
                  className="grid min-w-0 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]"
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
                  <div className="group min-w-0 border-t border-border bg-background lg:border-t-0 lg:border-l">
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
          <div className="page-container grid gap-10 section-space lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
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
                <div className="border-t border-border bg-surface px-5 py-4 text-xs text-muted-foreground">
                  Automotive detailing web application and booking workflow
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-t border-border bg-white">
          <div className="page-container grid gap-10 section-space lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
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
          <div className="page-container flex flex-col gap-8 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-white/65 uppercase">
                Your next step
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Give your detailing business a more professional online start.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Start with a personalized website preview and identify the right next step for your
                business.
              </p>
            </div>
            <Link
              to="/contact"
              onClick={() =>
                trackEvent("cta_click", { cta_name: "free_website_preview", location: "final_cta" })
              }
              className="arrow-link inline-flex min-h-13 shrink-0 items-center justify-center gap-3 bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-blue-50"
            >
              Request a Free Website Preview <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
