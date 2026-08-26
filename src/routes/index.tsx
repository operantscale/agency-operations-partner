import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import {
  CapabilityFlowVisual,
  SystemVisual,
  HandoffVisual,
  StackVisual,
} from "@/components/site/system-visual";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";

const TITLE = "OperantScale | AI-Powered Operational Systems for Growing Businesses";
const DESCRIPTION =
  "OperantScale designs and implements practical automation for lead follow-up, customer workflows, scheduling, CRM, communication, and internal operations—built around the systems businesses already use.";

const FAQS = [
  {
    q: "Do you replace our existing software?",
    a: "Usually not. We look for opportunities to improve the workflows around the systems your team already uses.",
  },
  {
    q: "Can you work with our current CRM?",
    a: "Yes. Existing systems are considered part of the workflow and are integrated where practical.",
  },
  {
    q: "What kinds of workflows can you automate?",
    a: "Lead follow-up, booking, reminders, customer communication, CRM workflows, data movement, renewals, reactivation, task routing, and other repetitive processes.",
  },
  {
    q: "Do we need to change our current processes?",
    a: "Not necessarily. We first understand what is working, then improve the parts creating unnecessary friction.",
  },
  {
    q: "How much of the work is handled by AI?",
    a: "AI is used where it is useful and appropriate. The focus is the reliable workflow, not AI for its own sake.",
  },
  {
    q: "Can you build custom integrations?",
    a: "Yes. When existing tools cannot reasonably support the workflow, we can build the necessary integration or internal tool.",
  },
  {
    q: "What happens before implementation?",
    a: "We understand the workflow, map the friction and repetition, then recommend the simplest practical system before anything is built.",
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
      {
        property: "og:image:alt",
        content:
          "OperantScale brand mark for AI-powered operational systems for growing businesses",
      },
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
          publisher: { "@type": "Organization", name: "OperantScale" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

const WORK_AREAS = [
  {
    title: "Lead & inquiry",
    body: "Capture, qualify, and follow up.",
  },
  {
    title: "Scheduling",
    body: "Reduce coordination and back-and-forth.",
  },
  {
    title: "Customer workflow",
    body: "Automate routine communication and follow-up.",
  },
  {
    title: "CRM & data",
    body: "Keep information synchronized and current.",
  },
  {
    title: "Internal coordination",
    body: "Route tasks, alerts, and responsibilities.",
  },
  {
    title: "Data movement",
    body: "Move information between tools without manual work.",
  },
];

const CAPABILITY_FLOW = [
  { label: "Process", body: "Understand the recurring work" },
  { label: "Automation", body: "Design the right intervention" },
  { label: "Outcome", body: "Return time and visibility" },
];

const CAPABILITY_GROUPS = [
  {
    n: "01",
    title: "Revenue operations",
    body: "Help opportunities move from first contact to next step quickly and consistently.",
    items: [
      "Lead capture",
      "Lead qualification",
      "Lead follow-up",
      "Appointment workflows",
      "Lead reactivation",
    ],
  },
  {
    n: "02",
    title: "Customer operations",
    body: "Keep communication and recurring customer work moving with fewer manual handoffs.",
    items: [
      "Customer communication",
      "Reminders",
      "Renewals and rebooking",
      "Review requests",
      "Status updates",
    ],
  },
  {
    n: "03",
    title: "Internal operations",
    body: "Reduce the administrative work between people, systems, and the decisions that keep work moving.",
    items: [
      "CRM workflows",
      "Data movement",
      "System integrations",
      "Task routing",
      "Notifications",
      "Reporting workflows",
    ],
  },
  {
    n: "04",
    title: "AI & workflow automation",
    body: "Connect the right systems and automate repetitive work where it creates meaningful operational value.",
    items: [
      "Workflow automation",
      "AI-assisted processes",
      "System integrations",
      "Automated notifications",
      "Custom business logic",
      "Human-in-the-loop workflows",
    ],
  },
];

const STAGES = [
  { n: "01", title: "Understand", body: "Learn how the work actually happens." },
  { n: "02", title: "Map", body: "Find friction, repetition, handoffs, and bottlenecks." },
  {
    n: "03",
    title: "Design",
    body: "Define the simplest system that solves the problem.",
  },
  {
    n: "04",
    title: "Implement",
    body: "Build, integrate, test, and deploy with minimal disruption.",
  },
  { n: "05", title: "Optimize", body: "Measure, refine, and improve over time." },
];

const OUTCOMES = [
  {
    title: "Less repetitive work",
    body: "Reduce manual administrative tasks.",
  },
  { title: "Faster follow-up", body: "Respond to opportunities quickly and consistently." },
  { title: "Better coordination", body: "Keep people, tasks, and systems aligned." },
  { title: "More operational visibility", body: "See where work moves and where it gets stuck." },
  { title: "More capacity", body: "Give teams more time for higher-value work." },
];

const PRINCIPLES = [
  {
    title: "Start with the workflow",
    body: "Understand the process before choosing the technology.",
  },
  {
    title: "Build around what already works",
    body: "Improve existing systems instead of replacing them without a reason.",
  },
  {
    title: "Automate with purpose",
    body: "Prioritize repetitive processes where automation creates meaningful value.",
  },
  {
    title: "Keep people in control",
    body: "Automate predictable work while keeping human judgment where it matters.",
  },
];

const NEXT_STEPS = [
  { n: "01", t: "Conversation", b: "Understand the work." },
  { n: "02", t: "Workflow review", b: "Identify friction, handoffs, and repetition." },
  { n: "03", t: "Opportunity assessment", b: "Determine whether automation makes sense." },
  {
    n: "04",
    t: "Recommendation",
    b: "If there is a meaningful opportunity, recommend the appropriate system.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div
            className="grid-lines pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[84rem] px-6 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Operational automation</p>
                <h1 className="mt-6 max-w-2xl text-[2.6rem] leading-[1.04] font-medium tracking-[-0.028em] sm:text-[3.4rem] lg:text-[4rem]">
                  Turn repetitive business work into reliable systems.
                </h1>
                <p className="mt-6 max-w-xl text-[1.1875rem] leading-[1.62] text-muted-foreground">
                  OperantScale identifies where repetitive work, manual handoffs, and disconnected
                  systems slow your team down then designs and implements practical automation
                  around the tools you already use.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_name: "book_operational_discovery",
                        location: "hero",
                      })
                    }
                    className="inline-flex h-16 w-full items-center justify-center gap-3 whitespace-normal bg-primary px-6 text-[0.82rem] font-medium tracking-[0.11em] text-primary-foreground uppercase shadow-[0_18px_40px_-20px_var(--color-primary)] transition-colors hover:bg-primary/90 sm:w-auto sm:whitespace-nowrap sm:px-10"
                  >
                    Start a conversation <ArrowRight className="size-4 shrink-0" />
                  </Link>
                  <Link
                    to="/"
                    hash="approach"
                    onClick={() =>
                      trackEvent("cta_click", { cta_name: "see_how_we_work", location: "hero" })
                    }
                    className="inline-flex h-16 w-full items-center justify-center whitespace-normal border border-foreground/25 px-6 text-[0.82rem] font-medium tracking-[0.11em] text-foreground uppercase transition-colors hover:bg-secondary sm:w-auto sm:whitespace-nowrap sm:px-9"
                  >
                    Explore capabilities
                  </Link>
                </div>

                <p className="mt-8 max-w-md border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Better workflows. Less repetitive work. More capacity.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <SystemVisual className="w-full max-w-xl lg:max-w-none" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* OPERATIONAL REALITY */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Operational friction</p>
                <h2 className="mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Good businesses don't always need more tools. They need better workflows.
                </h2>
                <div className="mt-6 max-w-lg space-y-5 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  <p>
                    Repetitive tasks, manual handoffs, missed follow-ups, disconnected systems, and
                    scattered information quietly consume team capacity.
                  </p>
                  <p>
                    The friction often sits <span className="text-foreground">between</span> those
                    systems: information moved by hand, follow-ups chased, data re-entered, and
                    coordination across tools that were never designed to work together.
                  </p>
                  <p className="text-sm">
                    Every business experiences this differently. That is exactly what discovery is
                    for.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <HandoffVisual className="w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHERE WE INTERVENE */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Where we intervene</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Workflows worth improving.
                </h2>
                <p className="mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  We look for practical opportunities across the workflows that keep your business
                  moving.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-border">
              {WORK_AREAS.map((area, i) => (
                <Reveal key={area.title} delay={i * 0.04}>
                  <div className="grid gap-2 border-b border-border py-7 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-medium">{area.title}</h3>
                    <p className="text-[1rem] leading-[1.7] text-muted-foreground">{area.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">What OperantScale does</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Practical automation across the work that keeps your business moving.
                </h2>
                <p className="mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  We don't start with a pre-built automation and force it into your business. We
                  understand the workflow, identify where capacity is lost, and determine whether
                  automation is actually the right answer.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
              {CAPABILITY_GROUPS.map((g, i) => (
                <Reveal key={g.n} delay={i * 0.06} className="bg-background">
                  <div className="h-full p-8 lg:p-10">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent">
                        {g.n}
                      </span>
                      <h3 className="text-[1.375rem] font-medium">{g.title}</h3>
                    </div>
                    <p className="mt-4 max-w-md text-[1rem] leading-[1.7] text-muted-foreground">
                      {g.body}
                    </p>
                    <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="border-t border-border py-3.5 text-[1rem] text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08} className="mt-12">
              <CapabilityFlowVisual className="w-full" />
            </Reveal>

            <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
              {CAPABILITY_FLOW.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.07} className="bg-surface">
                  <div className="p-7 lg:p-8">
                    <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-medium">{step.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* START WITH THE WORKFLOW */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
              <Reveal>
                <p className="eyebrow">Start with the workflow</p>
                <h2 className="mt-4 max-w-lg text-[2.25rem] leading-[1.08] font-medium sm:text-[2.75rem]">
                  Start with the workflow. Not the software.
                </h2>
                <p className="mt-4 max-w-lg text-[1.125rem] leading-[1.7] text-muted-foreground">
                  We don't begin by choosing a tool. We begin by understanding how work moves
                  through your business, where friction appears, and where automation can create
                  meaningful value.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="border-t border-border">
                  {[
                    "Repetitive work worth reducing",
                    "Existing systems worth connecting",
                    "A bottleneck worth resolving",
                  ].map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-5 text-[1rem] text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EXISTING TECHNOLOGY — dark moment */}
        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow text-ink-muted">Existing systems</p>
                <h2 className="mt-4 max-w-lg text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Built around the systems you already use.
                </h2>
                <div className="mt-6 max-w-lg space-y-5 text-[1.125rem] leading-[1.7] text-ink-muted">
                  <p className="text-ink-foreground">
                    Your business probably doesn't need another disconnected platform.
                  </p>
                  <p>
                    We connect the systems your team already relies on and improve the workflows
                    between them.
                  </p>
                  <p className="text-sm">
                    OPERATIONS is the layer connecting technology to the way your team works. Actual
                    systems and integration options are evaluated during discovery.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <StackVisual />
              </Reveal>
            </div>
          </div>
        </section>

        {/* APPROACH / METHODOLOGY */}
        <section id="approach" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">How it works</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Understand the work before automating it.
                </h2>
                <p className="mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  We learn how work actually moves through your business, then design only what
                  earns its place.
                </p>
              </div>
            </Reveal>

            <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.n} delay={i * 0.09} className="bg-background">
                  <li className="flex h-full flex-col justify-between p-7 lg:min-h-64">
                    <div>
                      <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent">
                        {stage.n}
                      </span>
                      <h3 className="mt-6 text-xl font-medium">{stage.title}</h3>
                    </div>
                    <p className="mt-6 text-[1rem] leading-[1.65] text-muted-foreground">
                      {stage.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Outcomes</p>
                <h2 className="mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  More capacity for higher-value work.
                </h2>
                <p className="mt-4 max-w-sm text-[1rem] leading-[1.7] text-muted-foreground">
                  Results depend on your systems, processes, and scope of work. These are the kinds
                  of improvement a well-designed operational system is intended to create.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="grid gap-x-12 sm:grid-cols-2">
                  {OUTCOMES.map((o) => (
                    <div key={o.title} className="border-t border-border py-6">
                      <dt className="text-lg font-medium">{o.title}</dt>
                      <dd className="mt-2 text-[1rem] leading-[1.7] text-muted-foreground">
                        {o.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHY OPERANTSCALE */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Why OperantScale</p>
                <h2 className="mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Practical automation. Not automation for its own sake.
                </h2>
                <p className="mt-4 max-w-lg text-[1.125rem] leading-[1.7] text-muted-foreground">
                  Automation should improve operations while keeping people, judgment, and control
                  at the center.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="border-t border-border">
                  {PRINCIPLES.map((p, i) => (
                    <li
                      key={p.title}
                      className="flex items-start gap-6 border-b border-border py-5 text-[1rem] text-foreground"
                    >
                      <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong className="font-medium">{p.title}</strong>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {p.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  These are operating principles, not certifications. Specific requirements are
                  evaluated with your team before anything is implemented.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FIRST ENGAGEMENT */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <p className="eyebrow">First engagement</p>
              <h2 className="mt-4 max-w-xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                What a first engagement looks like.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  t: "Discovery",
                  b: "Understand one process that is creating friction.",
                },
                {
                  t: "Opportunity",
                  b: "Identify where automation can create meaningful value.",
                },
                {
                  t: "Prototype",
                  b: "Demonstrate the proposed workflow before a larger implementation.",
                },
                {
                  t: "Implementation",
                  b: "Build, integrate, test, and deploy the agreed system.",
                },
              ].map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08} className="bg-background">
                  <div className="h-full p-7 lg:p-8">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-medium">{p.t}</h3>
                    <p className="mt-4 text-[1rem] leading-[1.7] text-muted-foreground">{p.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">FAQ</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[2.75rem]">
                  Questions we're usually asked first
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="py-6 text-left text-[1.125rem] font-medium hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl pb-7 text-[1.0625rem] leading-[1.75] text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
                <div>
                  <p className="eyebrow text-ink-muted">Next step</p>
                  <h2 className="mt-4 max-w-2xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                    Let's find where the work is getting stuck.
                  </h2>
                  <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-ink-muted">
                    Tell us about a repetitive process, bottleneck, follow-up gap, or workflow your
                    team spends too much time managing. We'll use the conversation to understand the
                    process and determine whether there is a practical opportunity for automation.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_name: "book_operational_discovery",
                        location: "final_cta",
                      })
                    }
                    className="inline-flex h-16 w-full items-center justify-center gap-3 whitespace-normal bg-ink-foreground px-6 text-[0.82rem] font-medium tracking-[0.11em] text-ink uppercase shadow-[0_18px_44px_-22px_var(--color-ink-accent)] transition-opacity hover:opacity-90 sm:w-auto sm:whitespace-nowrap sm:px-10"
                  >
                    Start a conversation <ArrowRight className="size-4 shrink-0" />
                  </Link>
                  <p className="max-w-sm text-sm leading-relaxed text-ink-muted lg:text-right">
                    No obligation. Just a conversation about how your business operates.
                  </p>
                </div>
              </div>
            </Reveal>

            <ol className="mt-16 grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
              {NEXT_STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.07} className="bg-ink">
                  <li className="h-full p-7">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-ink-accent">
                      {s.n}
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-ink-foreground">{s.t}</h3>
                    <p className="mt-3 text-[1rem] leading-[1.65] text-ink-muted">{s.b}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
