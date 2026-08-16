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
import { SystemVisual, HandoffVisual, StackVisual } from "@/components/site/system-visual";

const TITLE = "OperantScale | AI-Powered Operational Systems for P&C Insurance Agencies";
const DESCRIPTION =
  "OperantScale helps independent P&C insurance agencies reduce repetitive administrative work, improve workflows and create team capacity through practical AI-powered operational systems.";

const FAQS = [
  {
    q: "Will you replace our AMS?",
    a: "No. OperantScale is designed to work around existing systems where appropriate and improve the workflows between people, processes and technology.",
  },
  {
    q: "Do we need to change our existing software?",
    a: "Not necessarily. The goal is to improve how your existing systems, people and workflows work together.",
  },
  {
    q: "Do we need to know exactly what we want automated?",
    a: "No. That's part of the discovery process. We first understand how your team works and identify where meaningful opportunities may exist.",
  },
  {
    q: "What happens during the first conversation?",
    a: "We learn how your agency operates, understand the workflows that create the most friction, and determine whether there is a worthwhile opportunity for improvement.",
  },
  {
    q: "How do you handle sensitive information?",
    a: "Information handling is considered as part of the workflow design. We aim to minimize unnecessary data movement, use appropriate access controls and design systems around the agency's existing technology and policies.",
  },
  {
    q: "Will AI replace our staff?",
    a: "The focus is reducing repetitive work and increasing team capacity—not replacing the people who create value through judgment, relationships and client service.",
  },
  {
    q: "Is every agency a good fit?",
    a: "No. Automation should only be applied where it creates meaningful operational value.",
  },
  {
    q: "What systems can you work with?",
    a: "That depends on the agency's existing technology stack. Systems and workflows are evaluated before recommending an approach.",
  },
  {
    q: "How do we get started?",
    a: "Start with an operational discovery conversation. It's a working session, not a sales call.",
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
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "OperantScale",
          description: DESCRIPTION,
          url: "https://operantscale.com",
          email: "wajeeh@operantscale.com",
          areaServed: "US",
          serviceType:
            "Insurance agency workflow automation, operational systems and AI-assisted process design",
          audience: {
            "@type": "Audience",
            audienceType: "Independent Property & Casualty insurance agencies",
          },
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
    title: "Lead & Inquiry Handling",
    body: "New inquiries arrive across phone, email, web forms and referrals, and each one has to be routed, recorded and answered.",
  },
  {
    title: "Quote Workflows",
    body: "Gathering information, re-entering it across systems, and moving a quote through to a decision.",
  },
  {
    title: "Client Service",
    body: "Certificates, endorsements, questions and document requests that recur across the book.",
  },
  {
    title: "Renewals",
    body: "Identifying upcoming renewals, preparing them, and coordinating client communication on time.",
  },
  {
    title: "Internal Coordination",
    body: "Handoffs between producers, account managers and service staff, and the follow-up they generate.",
  },
  {
    title: "Data & Documentation",
    body: "Moving information between the AMS and other systems, and keeping records consistent.",
  },
];

const CAPABILITY_GROUPS = [
  {
    n: "01",
    title: "Client Acquisition",
    body: "Making sure nothing arriving at the agency is missed, delayed or handled twice.",
    items: ["Lead intake", "Qualification", "Follow-up", "Inquiry routing"],
  },
  {
    n: "02",
    title: "Client Service",
    body: "Keeping recurring service work moving without constant manual coordination.",
    items: [
      "Client communication workflows",
      "Request routing",
      "Task coordination",
      "Follow-up systems",
    ],
  },
  {
    n: "03",
    title: "Agency Operations",
    body: "Reducing the administrative work that sits between your existing systems.",
    items: [
      "Administrative workflow automation",
      "Data movement",
      "Internal coordination",
      "Documentation workflows",
    ],
  },
  {
    n: "04",
    title: "Growth Capacity",
    body: "Creating room to handle more volume with the team and systems you already have.",
    items: [
      "Renewal workflow support",
      "Operational visibility",
      "AI-assisted processes",
      "Custom integrations",
    ],
  },
];

const STAGES = [
  { n: "01", title: "Understand", body: "Learn how the agency actually operates, day to day." },
  { n: "02", title: "Map", body: "Identify workflows, bottlenecks, handoffs and repetitive work." },
  { n: "03", title: "Design", body: "Determine where AI and automation can create practical value." },
  { n: "04", title: "Implement", body: "Build and integrate the system into the existing workflow." },
  { n: "05", title: "Optimize", body: "Monitor, refine and improve the system over time." },
];

const OUTCOMES = [
  { title: "Less repetitive work", body: "Designed to reduce the manual steps that recur every day." },
  { title: "Faster workflows", body: "Intended to shorten the path from inquiry to resolution." },
  { title: "Better visibility", body: "Clearer sight of where work sits and what is waiting." },
  { title: "More team capacity", body: "Time returned to producers and service staff." },
  { title: "Better client experience", body: "Helps responses stay timely and consistent." },
  { title: "Capacity to grow", body: "Supporting more volume without proportional headcount." },
];

const PRINCIPLES = [
  "Minimize unnecessary data movement",
  "Work with existing systems where appropriate",
  "Use controlled access",
  "Apply least-privilege principles where applicable",
  "Avoid unnecessary exposure of sensitive information",
  "Evaluate workflow and security requirements before implementation",
  "Design around the agency's existing technology and policies",
];

const NEXT_STEPS = [
  { n: "01", t: "Conversation", b: "Understand the agency." },
  { n: "02", t: "Workflow review", b: "Identify friction and repetitive work." },
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
                <p className="eyebrow">Operational intelligence · Independent P&amp;C agencies</p>
                <h1 className="mt-6 max-w-2xl text-[2.5rem] leading-[1.05] font-medium tracking-[-0.026em] sm:text-[3.25rem] lg:text-[3.75rem]">
                  AI-Powered Operational Systems for Independent P&amp;C Insurance Agencies
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-[1.65] text-muted-foreground">
                  We reduce the repetitive administrative work inside your agency, improve the
                  workflows between your existing systems, and create capacity for your team to
                  serve clients better and grow sustainably. AI is the mechanism—operational
                  improvement is the product.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    className="inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 text-[0.78rem] font-medium tracking-[0.11em] text-primary-foreground uppercase shadow-[0_12px_30px_-18px_var(--color-primary)] transition-colors hover:bg-primary/90"
                  >
                    Book an operational discovery <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/"
                    hash="approach"
                    className="inline-flex h-14 items-center justify-center border border-foreground/25 px-8 text-[0.78rem] font-medium tracking-[0.11em] text-foreground uppercase transition-colors hover:bg-secondary"
                  >
                    See how we work
                  </Link>
                </div>

                <p className="mt-8 max-w-md border-l border-accent pl-4 text-sm leading-relaxed text-muted-foreground">
                  Built for established independent P&amp;C agencies with growing operational
                  complexity.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <SystemVisual className="w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* OPERATIONAL REALITY */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Operational reality</p>
                <h2 className="mt-5 max-w-md text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  Your Agency May Already Have the Right Tools.
                </h2>
                <div className="mt-6 max-w-lg space-y-5 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  <p>
                    Most established agencies already run an AMS, a CRM, email, communication
                    platforms, quoting tools and client portals. The technology is usually not the
                    missing piece.
                  </p>
                  <p>
                    The work that accumulates is often the work{" "}
                    <span className="text-foreground">between</span> those systems: information
                    moved by hand, follow-ups chased, data re-entered, and coordination across tools
                    that were never designed to talk to each other.
                  </p>
                  <p className="text-sm">
                    Not every agency experiences this the same way—which is exactly what discovery
                    is for.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <HandoffVisual className="w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* THE WORK BEHIND THE WORK */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Where the workload accumulates</p>
                <h2 className="mt-5 text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  The Work Behind the Work
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  Potential opportunities may exist across the areas below. These are operational
                  investigation areas—not assumptions about how your agency runs.
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
                    <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">
                      {area.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">What OperantScale does</p>
                <h2 className="mt-5 text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  We Design Systems Around How Your Agency Actually Works.
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  Four operational capability groups. We don't start with a pre-built automation and
                  force it into your agency—we first understand the workflow, identify where
                  capacity may be lost, and determine whether automation is actually the right
                  answer.
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
                      <h3 className="text-xl font-medium">{g.title}</h3>
                    </div>
                    <p className="mt-4 max-w-md text-[0.95rem] leading-[1.7] text-muted-foreground">
                      {g.body}
                    </p>
                    <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="border-t border-border py-3 text-[0.95rem] text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE WORK WITH */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
              <Reveal>
                <p className="eyebrow">Who OperantScale is built for</p>
                <h2 className="mt-5 max-w-lg text-[2rem] leading-[1.1] font-medium sm:text-[2.5rem]">
                  Built for Established Independent P&amp;C Agencies.
                </h2>
                <p className="mt-5 max-w-lg text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  OperantScale is designed for agencies with established teams, existing technology
                  and growing operational complexity.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {[
                    "Independent P&C agencies",
                    "Established teams",
                    "Existing AMS and business systems",
                    "Multiple concurrent workflows",
                    "Growing administrative complexity",
                    "Service standards worth protecting",
                  ].map((item) => (
                    <li
                      key={item}
                      className="border-t border-border py-4 text-[0.95rem] text-foreground"
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
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow text-ink-muted">Existing technology</p>
                <h2 className="mt-5 max-w-lg text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  Built Around Your Existing Technology
                </h2>
                <div className="mt-6 max-w-lg space-y-5 text-[1.0625rem] leading-[1.7] text-ink-muted">
                  <p className="text-ink-foreground">
                    We aren't here to replace the systems your agency already relies on.
                  </p>
                  <p>
                    We examine how your people, processes and existing systems interact—and identify
                    opportunities to improve the work between them.
                  </p>
                  <p className="text-sm">
                    The layers shown are conceptual. Actual systems and integration options are
                    evaluated against your stack during discovery.
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
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Approach</p>
                <h2 className="mt-5 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Understand the Workflow. Then Build the System.
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  We don't start with a pre-built automation. We start by understanding how the work
                  actually moves through your agency—then design only what earns its place.
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
                    <p className="mt-6 text-[0.95rem] leading-[1.65] text-muted-foreground">
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
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Outcomes</p>
                <h2 className="mt-5 max-w-md text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  Create More Capacity From the Team and Systems You Already Have.
                </h2>
                <p className="mt-5 max-w-sm text-[0.95rem] leading-[1.7] text-muted-foreground">
                  Results depend on the agency, its systems and the scope of work. The following are
                  the kinds of improvement a well-designed operational system is intended to create.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="grid gap-x-12 sm:grid-cols-2">
                  {OUTCOMES.map((o) => (
                    <div key={o.title} className="border-t border-border py-6">
                      <dt className="text-lg font-medium">{o.title}</dt>
                      <dd className="mt-2 text-[0.95rem] leading-[1.7] text-muted-foreground">
                        {o.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* RESPONSIBLE AUTOMATION */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Responsible automation</p>
                <h2 className="mt-5 max-w-md text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                  Built With Operational Responsibility.
                </h2>
                <p className="mt-5 max-w-lg text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  Insurance agencies work with sensitive client and business information. Automation
                  should improve operations without compromising control.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="border-t border-border">
                  {PRINCIPLES.map((p, i) => (
                    <li
                      key={p}
                      className="flex items-baseline gap-6 border-b border-border py-4 text-[0.95rem] text-foreground"
                    >
                      <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  These are working principles, not certifications. Specific security and
                  information-handling requirements are evaluated with your agency before anything
                  is implemented.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHY OPERANTSCALE */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="eyebrow">Why OperantScale</p>
              <h2 className="mt-5 max-w-xl text-[2rem] leading-[1.1] font-medium sm:text-[2.75rem]">
                Built for Operations. Not Just Automation.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                {
                  t: "Industry focused",
                  b: "We work specifically with independent P&C insurance agencies, not with everyone.",
                },
                {
                  t: "Workflow first",
                  b: "We understand the process before recommending any technology.",
                },
                {
                  t: "Outcome oriented",
                  b: "Automation is only useful when it improves the way the business operates.",
                },
              ].map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08}>
                  <div className="border-t-2 border-foreground pt-6">
                    <h3 className="eyebrow text-foreground">{p.t}</h3>
                    <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                      {p.b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-16 max-w-3xl border-l-2 border-accent pl-6 text-[1.75rem] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[2.5rem]">
                Don't automate for the sake of automation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">FAQ</p>
                <h2 className="mt-5 text-[2rem] leading-[1.1] font-medium sm:text-[2.5rem]">
                  Questions we're usually asked first
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="py-6 text-left text-lg font-medium hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl pb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
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
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
                <div>
                  <p className="eyebrow text-ink-muted">Next step</p>
                  <h2 className="mt-5 max-w-2xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                    Let's Find Where Your Agency Is Losing Capacity.
                  </h2>
                  <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ink-muted">
                    We'll review how your team, systems and workflows currently operate and identify
                    areas where unnecessary manual work may be limiting capacity.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <Link
                    to="/contact"
                    className="inline-flex h-14 items-center justify-center gap-3 bg-ink-foreground px-8 text-[0.78rem] font-medium tracking-[0.11em] text-ink uppercase transition-opacity hover:opacity-90"
                  >
                    Book an operational discovery <ArrowRight className="size-4" />
                  </Link>
                  <p className="max-w-sm text-sm leading-relaxed text-ink-muted lg:text-right">
                    No obligation. No pre-built automation package. Just a conversation about how
                    your agency operates.
                  </p>
                </div>
              </div>
            </Reveal>

            <ol className="mt-16 grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
              {NEXT_STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.07} className="bg-ink">
                  <li className="h-full p-7">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent">
                      {s.n}
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-ink-foreground">{s.t}</h3>
                    <p className="mt-3 text-[0.95rem] leading-[1.65] text-ink-muted">{s.b}</p>
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
