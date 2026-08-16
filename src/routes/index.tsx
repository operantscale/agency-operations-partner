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
  "OperantScale helps independent P&C insurance agencies improve operational efficiency through practical AI-powered systems, workflow automation and intelligent process design.";

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
          serviceType: "Operational systems, workflow automation and AI-assisted process design",
          audience: {
            "@type": "Audience",
            audienceType: "Independent Property & Casualty insurance agencies",
          },
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

const CAPABILITIES = [
  "Lead intake and qualification",
  "Workflow automation",
  "Client communication workflows",
  "Follow-up systems",
  "Quote-process support",
  "Renewal workflow support",
  "Administrative task automation",
  "Data movement between systems",
  "Internal workflow coordination",
  "AI-assisted operational processes",
  "Custom integrations",
  "Operational intelligence",
];

const STAGES = [
  { n: "01", title: "Understand", body: "Learn how the agency actually operates." },
  { n: "02", title: "Map", body: "Identify workflows, bottlenecks, handoffs and repetitive work." },
  { n: "03", title: "Design", body: "Determine where AI and automation can create practical value." },
  { n: "04", title: "Implement", body: "Build and integrate the system into the existing workflow." },
  { n: "05", title: "Optimize", body: "Monitor, refine and improve the system over time." },
];

const OUTCOMES = [
  { title: "Less repetitive work", body: "Designed to reduce the manual steps that recur every day." },
  { title: "Faster workflows", body: "Intended to shorten the path from inquiry to resolution." },
  { title: "Better visibility", body: "Opportunities to see where work sits and what is waiting." },
  { title: "More team capacity", body: "Time returned to producers and service staff." },
  { title: "Better client experience", body: "Can help responses stay timely and consistent." },
  { title: "Capacity to grow", body: "Potentially supporting more volume without proportional headcount." },
];

const FAQS = [
  {
    q: "Do you replace our AMS?",
    a: "No. OperantScale is designed to work around existing systems and improve workflows between people, processes and technology.",
  },
  {
    q: "Do we need to know exactly what we want automated?",
    a: "No. That's part of the discovery process.",
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
    a: "Start with an operational discovery conversation.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div
            className="grid-lines pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[84rem] px-6 lg:px-10">
            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">Operational intelligence · Independent P&amp;C agencies</p>
                <h1 className="mt-7 max-w-2xl text-[2.25rem] leading-[1.06] font-medium tracking-[-0.026em] sm:text-5xl lg:text-[3.5rem]">
                  AI-Powered Operational Systems for Independent P&amp;C Insurance Agencies
                </h1>
                <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
                  OperantScale helps independent P&amp;C insurance agencies identify repetitive
                  operational work, improve workflows, and build practical AI-powered systems around
                  the way their teams already work.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    className="inline-flex h-12 items-center justify-center gap-3 bg-primary px-6 text-[0.72rem] font-medium tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                  >
                    Book an operational discovery <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/"
                    hash="approach"
                    className="inline-flex h-12 items-center justify-center border border-input px-6 text-[0.72rem] font-medium tracking-[0.11em] text-foreground uppercase transition-colors hover:bg-secondary"
                  >
                    See how we work
                  </Link>
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                  Built around your agency. Designed around your workflows.
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
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow">Operational reality</p>
                <h2 className="mt-6 max-w-md text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  Your Agency May Already Have the Right Tools.
                </h2>
                <div className="mt-7 max-w-lg space-y-5 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Most established agencies already run an AMS, a CRM, email, communication
                    platforms, quoting tools, client portals and other business software. The
                    technology is usually not the missing piece.
                  </p>
                  <p>
                    But software does not automatically eliminate the work between those systems.
                    People still move information, chase follow-ups, re-enter data and coordinate
                    across tools that were never designed to talk to each other.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="lg:pt-6">
                <HandoffVisual className="w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* THE WORK BEHIND THE WORK */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Where the workload accumulates</p>
                <h2 className="mt-6 text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  The Work Behind the Work
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Every agency operates differently, but certain areas can create repetitive
                  administrative workload as teams, clients and systems grow. These are areas for
                  investigation—not assumptions about your agency.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 border-t border-border">
              {WORK_AREAS.map((area, i) => (
                <Reveal key={area.title} delay={i * 0.04}>
                  <div className="grid gap-3 border-b border-border py-8 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8">
                    <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-medium">{area.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{area.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO / CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow">What OperantScale does</p>
                <h2 className="mt-6 max-w-xl text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  We Design Systems Around How Your Agency Actually Works.
                </h2>
                <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground">
                  <p>
                    OperantScale combines AI, workflow automation and system integration to improve
                    operational processes that still depend heavily on manual effort.
                  </p>
                  <p>
                    We don't start with a pre-built automation and try to force it into your agency.
                  </p>
                  <p>
                    We first understand the workflow, identify where capacity may be lost, and
                    determine whether automation is actually the right solution.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="eyebrow">Operational capabilities</p>
                <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {CAPABILITIES.map((c) => (
                    <li
                      key={c}
                      className="border-b border-border py-3.5 text-sm text-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EXISTING TECHNOLOGY — dark moment */}
        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow text-ink-muted">Existing technology</p>
                <h2 className="mt-6 max-w-lg text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  Built Around Your Existing Technology
                </h2>
                <div className="mt-7 max-w-lg space-y-5 text-base leading-relaxed text-ink-muted">
                  <p>
                    OperantScale isn't here to replace the systems your agency already relies on.
                  </p>
                  <p>
                    We look at how your existing tools, people and processes interact—and identify
                    opportunities to make those connections work more efficiently.
                  </p>
                  <p className="text-sm">
                    The layers below are conceptual. Actual systems and integration options are
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

        {/* APPROACH */}
        <section id="approach" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Approach</p>
                <h2 className="mt-6 text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  Understand the Workflow. Then Build the System.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.n} delay={i * 0.09} className="bg-background">
                  <li className="flex h-full flex-col justify-between p-7 lg:min-h-64">
                    <div>
                      <span className="font-mono text-[0.7rem] tracking-[0.18em] text-accent">
                        {stage.n}
                      </span>
                      <h3 className="mt-6 text-lg font-medium">{stage.title}</h3>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
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
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow">Outcomes</p>
                <h2 className="mt-6 max-w-sm text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  More Capacity for the Work That Matters
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Results depend on the agency, its systems and the scope of work. The following are
                  the kinds of improvement a well-designed operational system is intended to create.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="grid gap-x-12 sm:grid-cols-2">
                  {OUTCOMES.map((o) => (
                    <div key={o.title} className="border-t border-border py-6">
                      <dt className="text-base font-medium">{o.title}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <p className="eyebrow">Why OperantScale</p>
              <h2 className="mt-6 max-w-xl text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                Built for Operations. Not Just Automation.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {[
                {
                  t: "Industry focused",
                  b: "We focus specifically on independent P&C insurance agencies.",
                },
                {
                  t: "Workflow first",
                  b: "We understand the process before recommending technology.",
                },
                {
                  t: "Outcome oriented",
                  b: "Automation is only useful when it improves the way the business operates.",
                },
              ].map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08}>
                  <div className="border-t border-foreground/80 pt-6">
                    <h3 className="eyebrow text-foreground">{p.t}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-20 max-w-3xl text-2xl leading-[1.25] font-medium tracking-[-0.02em] sm:text-[2rem]">
                Don't automate for the sake of automation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow">FAQ</p>
                <h2 className="mt-6 text-3xl leading-[1.12] font-medium sm:text-[2.5rem]">
                  Questions we're usually asked first
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="py-6 text-left text-base font-medium hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
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
          <div className="mx-auto max-w-[84rem] px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
                <div>
                  <p className="eyebrow text-ink-muted">Next step</p>
                  <h2 className="mt-6 max-w-xl text-3xl leading-[1.1] font-medium sm:text-[2.75rem]">
                    Let's Understand Your Operations.
                  </h2>
                  <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted">
                    Every agency works differently. Let's identify where your team may be spending
                    unnecessary time and determine whether an AI-powered system could help.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link
                    to="/contact"
                    className="inline-flex h-12 items-center justify-center gap-3 bg-ink-foreground px-6 text-[0.72rem] font-medium tracking-[0.11em] text-ink uppercase transition-opacity hover:opacity-90"
                  >
                    Book an operational discovery <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href="mailto:wajeeh@operantscale.com"
                    className="inline-flex h-12 items-center justify-center border border-ink-border px-6 text-[0.72rem] font-medium tracking-[0.11em] text-ink-foreground uppercase transition-colors hover:bg-ink-border/40"
                  >
                    Contact OperantScale
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
