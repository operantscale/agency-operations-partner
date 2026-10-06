import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
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

const TITLE = "OperantScale | Detailing Lead Recovery & Booking System";
const DESCRIPTION =
  "OperantScale helps auto-detailing businesses recover missed leads, respond faster, and turn more inquiries into booked appointments with better follow-up and booking workflows.";

const FAQS = [
  {
    q: "Do I need to replace my existing software?",
    a: "Usually not. OperantScale is designed to fit around the tools and workflows you already use, fixing where inquiries, scheduling, and follow-up break down.",
  },
  {
    q: "Can OperantScale work with the tools I already use?",
    a: "Yes. We connect the systems that matter most to your process so your website, booking flow, and operational tasks work together instead of creating extra admin friction.",
  },
  {
    q: "What exactly does the system automate?",
    a: "It can automate the handoff between inquiry, qualification, confirmation, reminder, and follow-up, while keeping the customer experience clear and professional.",
  },
  {
    q: "Do I need a brand-new system to get results?",
    a: "Not necessarily. The biggest wins usually come from tightening the customer journey and ensuring missed leads are captured, followed up, and converted consistently.",
  },
  {
    q: "Can you build the website or booking experience too?",
    a: "Yes. We can build the customer-facing experience and the behind-the-scenes workflow as one connected system rather than separate, disconnected layers.",
  },
  {
    q: "How long does implementation take?",
    a: "It depends on the current workflow and the level of integration required. We start by reviewing the process and then scope the right system for your business.",
  },
  {
    q: "What happens during the workflow review?",
    a: "We review how inquiries, bookings, communication, and follow-up happen in your business today, identify the biggest gaps, and assess whether a deeper workflow system would help.",
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
        content: "OperantScale lead recovery and booking systems for auto-detailing businesses",
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

const STAGES = [
  {
    n: "01",
    title: "Understand",
    body: "See how inquiries, bookings, customers, and follow-up are working today.",
  },
  {
    n: "02",
    title: "Map",
    body: "Identify where revenue, response time, or customer experience is leaking.",
  },
  {
    n: "03",
    title: "Build",
    body: "Implement only the system components that solve the actual problem.",
  },
  {
    n: "04",
    title: "Optimize",
    body: "Measure the workflow and improve it as the business changes over time.",
  },
];

const NEXT_STEPS = [
  {
    n: "01",
    t: "Introduction",
    b: "Share how your business handles inquiries and bookings today.",
  },
  {
    n: "02",
    t: "Workflow review",
    b: "Review the process, lead flow, and handoff where revenue is being lost.",
  },
  {
    n: "03",
    t: "Assessment",
    b: "Determine which operational fix will improve conversion and customer experience.",
  },
  {
    n: "04",
    t: "Recommendation",
    b: "Recommend a practical system before any build begins.",
  },
];

function HeroSystemVisual({ className }: { className?: string }) {
  const flow = [
    { label: "Inquiry", state: "New lead" },
    { label: "Response", state: "Qualified" },
    { label: "Booking", state: "Confirmed" },
    { label: "Follow-up", state: "Rebooked" },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)] p-5 shadow-[0_25px_60px_-40px_rgba(11,37,69,0.45)] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-mono text-[0.58rem] tracking-[0.18em] text-muted-foreground uppercase">
            Operational flow
          </p>
          <p className="mt-2 text-lg font-medium text-foreground">Customer journey</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
            Live
          </span>
        </div>
      </div>

      <div className="relative mt-6 space-y-4 pl-2">
        <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-border via-accent/70 to-border" />
        {flow.map((step, index) => (
          <div key={step.label} className="relative flex items-start gap-4">
            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-[0.55rem] font-medium tracking-[0.12em] text-muted-foreground uppercase shadow-sm">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{step.label}</p>
                <span className="rounded-full border border-border bg-white px-2 py-1 font-mono text-[0.48rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {step.state}
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#b9d7ff_0%,#4d7cff_100%)]"
                  style={{ width: `${68 + index * 9}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-border bg-surface p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
            Workflow summary
          </p>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[0.48rem] tracking-[0.12em] text-emerald-700 uppercase">
            On track
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["New leads", "24"],
            ["Booked", "7"],
            ["Follow-ups", "14"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-white p-3">
              <p className="font-mono text-[0.52rem] tracking-[0.14em] text-muted-foreground uppercase">
                {label}
              </p>
              <p className="mt-2 text-2xl font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailingDashboardVisual({ className }: { className?: string }) {
  const dashboardTabs = ["Overview", "Leads", "Customers", "Bookings", "Follow-ups"] as const;
  type DashboardTab = (typeof dashboardTabs)[number];

  const leads = useMemo(
    () => [
      {
        id: 1,
        name: "Alex Morgan",
        vehicle: "BMW M4",
        service: "Ceramic coating",
        status: "Qualified",
        date: "Thu, 10:30 AM",
        notes: "Interested in paint correction add-on.",
      },
      {
        id: 2,
        name: "Jordan Lee",
        vehicle: "Porsche 911",
        service: "Paint correction",
        status: "Quoted",
        date: "Fri, 1:00 PM",
        notes: "Needs a two-day turnaround.",
      },
      {
        id: 3,
        name: "Marcus Bennett",
        vehicle: "Tesla Model Y",
        service: "PPF",
        status: "Booked",
        date: "Sat, 9:00 AM",
        notes: "Requested front-end protection package.",
      },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<DashboardTab>("Overview");
  const [selectedLeadId, setSelectedLeadId] = useState<number>(1);
  const [query, setQuery] = useState("");

  const filteredLeads = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((lead) =>
      `${lead.name} ${lead.vehicle} ${lead.service}`.toLowerCase().includes(term),
    );
  }, [leads, query]);

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? leads[0];

  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_25px_70px_-40px_rgba(11,37,69,0.35)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
          </div>
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
            OperantScale
          </span>
        </div>
        <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          Product demonstration
        </span>
      </div>

      <div className="border-b border-border bg-surface/60 px-3 py-3 sm:px-4">
        <div className="flex flex-wrap gap-2">
          {dashboardTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-2.5 py-1.5 font-mono text-[0.52rem] tracking-[0.12em] uppercase transition-colors ${
                activeTab === tab
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === "Overview" && (
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Overview
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-foreground">
                    Detailing business dashboard
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[0.62rem] font-medium tracking-[0.1em] text-emerald-700 uppercase">
                  Active
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["New leads", "24"],
                  ["Qualified", "11"],
                  ["Booked", "7"],
                  ["Follow-ups", "14"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-border bg-surface p-3">
                    <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="mt-2 text-2xl font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-surface p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Lead pipeline
                  </p>
                  <span className="text-[0.7rem] text-muted-foreground">Today</span>
                </div>
                <div className="space-y-3">
                  {leads.map((lead, index) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => setSelectedLeadId(lead.id)}
                      className="grid w-full gap-2 rounded-lg border border-border bg-white p-3 text-left transition-colors hover:border-accent sm:grid-cols-[1.2fr_0.9fr_0.9fr_auto] sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{lead.name}</p>
                        <p className="mt-1 text-[0.7rem] text-muted-foreground">{lead.vehicle}</p>
                      </div>
                      <span className="text-sm text-foreground">{lead.service}</span>
                      <span className="text-sm text-muted-foreground">
                        {index === 2 ? "Booked" : "New"}
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-2 py-1 text-[0.58rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                        {lead.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Weekly activity
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    ["SMS Sent", "12"],
                    ["Email Sent", "9"],
                    ["Follow-up Pending", "6"],
                    ["Appointment Confirmed", "4"],
                  ].map(([item, value]) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="text-sm text-foreground">{item}</span>
                      <span className="font-mono text-[0.66rem] tracking-[0.12em] text-muted-foreground uppercase">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Upcoming appointments
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    ["Today", "BMW M4", "Ceramic coating", "Confirmed"],
                    ["Thu", "Tesla Model Y", "PPF + paint correction", "Reminder sent"],
                    ["Fri", "Mercedes C-Class", "Interior detail", "Awaiting confirmation"],
                  ].map(([day, vehicle, service, status]) => (
                    <div
                      key={`${day}-${vehicle}`}
                      className="rounded-lg border border-border bg-white p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
                          {day}
                        </span>
                        <span className="rounded-full border border-border bg-surface px-2 py-1 text-[0.56rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                          {status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-foreground">{vehicle}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{service}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Leads" && (
          <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-xl border border-border bg-surface p-4">
              <label className="block">
                <span className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Search leads
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter by customer or service"
                  className="mt-2 w-full border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </label>

              <div className="mt-4 space-y-2">
                {filteredLeads.length ? (
                  filteredLeads.map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`w-full rounded-xl border p-3 text-left transition-colors ${
                        selectedLead.id === lead.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-white hover:border-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">{lead.name}</p>
                        <span className="rounded-full border border-border bg-surface px-2 py-1 font-mono text-[0.48rem] tracking-[0.1em] text-muted-foreground uppercase">
                          {lead.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{lead.vehicle}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lead.service}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-white p-6 text-sm text-muted-foreground">
                    No leads match that filter.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Lead profile
                  </p>
                  <h4 className="mt-2 text-xl font-medium text-foreground">{selectedLead.name}</h4>
                </div>
                <span className="rounded-full border border-border bg-white px-2 py-1 font-mono text-[0.48rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {selectedLead.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-white p-3">
                  <p className="font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Vehicle
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{selectedLead.vehicle}</p>
                </div>
                <div className="rounded-lg border border-border bg-white p-3">
                  <p className="font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Service
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{selectedLead.service}</p>
                </div>
                <div className="rounded-lg border border-border bg-white p-3">
                  <p className="font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Preferred date
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{selectedLead.date}</p>
                </div>
                <div className="rounded-lg border border-border bg-white p-3">
                  <p className="font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Channel
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Instagram DM</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-border bg-white p-3">
                <p className="font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground uppercase">
                  Notes
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedLead.notes}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Customers" && (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Active customers", "214"],
              ["Repeat clients", "48%"],
              ["Retention window", "6 weeks"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="mt-3 text-3xl font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Bookings" && (
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["Today", "BMW M4", "Ceramic coating", "10:30 AM"],
              ["Thu", "Tesla Model Y", "PPF + correction", "1:15 PM"],
              ["Fri", "Mercedes C-Class", "Interior detail", "3:00 PM"],
            ].map(([day, vehicle, service, time]) => (
              <div
                key={`${day}-${vehicle}`}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {day}
                </p>
                <h4 className="mt-3 text-lg font-medium text-foreground">{vehicle}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{service}</p>
                <p className="mt-4 rounded-full border border-border bg-white px-2.5 py-1.5 text-[0.58rem] tracking-[0.12em] text-foreground uppercase">
                  {time}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Follow-ups" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["SMS follow-up", "Due in 18 minutes"],
              ["Quote reminder", "Sent yesterday"],
              ["Retention message", "2 customers reactivated"],
              ["Review request", "Waiting on 1 customer"],
            ].map(([action, status]) => (
              <div key={action} className="rounded-xl border border-border bg-surface p-4">
                <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {action}
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground">{status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectedProjectVisual({ className }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_25px_70px_-40px_rgba(11,37,69,0.35)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
        </div>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
          Precision Toronto
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
            Selected project
          </p>
          <h3 className="mt-4 text-2xl font-medium text-foreground">
            Booking flow & business web app
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Built for an automotive detailing business to create a clearer customer journey from
            service selection to appointment booking and internal admin tracking.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Service selection",
              "Scheduling",
              "Customer record structure",
              "Administrative workflow",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-4 sm:p-5">
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <p className="text-sm font-medium text-foreground">Book a detailing appointment</p>
              <span className="rounded-full border border-border bg-surface px-2 py-1 text-[0.56rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                Mobile service
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-[0.56rem] tracking-[0.12em] text-muted-foreground uppercase">
                  Service
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">Ceramic coating</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-3">
                  <p className="font-mono text-[0.56rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Vehicle
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">BMW M4</p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-3">
                  <p className="font-mono text-[0.56rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Date
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Thu, 10:30 AM</p>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-[0.56rem] tracking-[0.12em] text-muted-foreground uppercase">
                  Notes
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vehicle prep needed, customer requesting paint correction review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const businessTypes = [
    "Premium Detail Shops",
    "Ceramic Coating Studios",
    "Paint Correction Specialists",
    "PPF Shops",
    "Premium Mobile Detailers",
    "Fleet & Commercial Detailers",
  ];

  const workflowSteps = [
    { label: "Inquiry", state: "New lead from website or DM" },
    { label: "Instant response", state: "Qualified and routed" },
    { label: "Booking", state: "Service selected and scheduled" },
    { label: "Confirmation", state: "Customer confirmed and reminded" },
    { label: "Service", state: "Job in progress" },
    { label: "Follow-up", state: "Review, repeat, and rebook" },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section id="platform" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div
            className="grid-lines pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[84rem] px-6 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">For auto-detailing businesses</p>
                <h1 className="mt-6 max-w-2xl text-[2.6rem] leading-[1.04] font-medium tracking-[-0.028em] sm:text-[3.4rem] lg:text-[4rem]">
                  Turn More Detailing Inquiries Into Booked Appointments.
                </h1>
                <p className="mt-6 max-w-xl text-[1.1875rem] leading-[1.62] text-muted-foreground">
                  OperantScale connects lead capture, response, booking, reminders, and follow-up
                  into one revenue-focused system designed around how your detailing business
                  actually works.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_name: "book_workflow_review",
                        location: "hero",
                      })
                    }
                    className="inline-flex h-16 w-full items-center justify-center gap-3 whitespace-normal bg-primary px-6 text-[0.82rem] font-medium tracking-[0.11em] text-primary-foreground uppercase shadow-[0_18px_40px_-20px_var(--color-primary)] transition-colors hover:bg-primary/90 sm:w-auto sm:whitespace-nowrap sm:px-10"
                  >
                    Book a Workflow Review <ArrowRight className="size-4 shrink-0" />
                  </Link>
                  <Link
                    to="/"
                    hash="solutions"
                    onClick={() =>
                      trackEvent("cta_click", { cta_name: "see_how_it_works", location: "hero" })
                    }
                    className="inline-flex h-16 w-full items-center justify-center whitespace-normal border border-foreground/25 px-6 text-[0.82rem] font-medium tracking-[0.11em] text-foreground uppercase transition-colors hover:bg-secondary sm:w-auto sm:whitespace-nowrap sm:px-9"
                  >
                    See How It Works
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["Inquiry", "Response", "Booking", "Confirmation", "Follow-up"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border bg-background/80 px-2.5 py-1.5 font-mono text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <p className="mt-8 max-w-md border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Your customers don't disappear because they don't want the service. They disappear
                  because the process between inquiry and booking breaks down.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <HeroSystemVisual className="w-full max-w-xl lg:max-w-none" />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">The problem</p>
                <h2 className="mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Your customers don't disappear because they don't want the service.
                </h2>
                <div className="mt-6 max-w-lg space-y-5 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  <p>They disappear because the process between inquiry and booking breaks down.</p>
                  <p>
                    A missed call, a delayed text, or an unconfirmed appointment can result in lost
                    revenue without the customer ever telling you why.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[1.5rem] border border-border bg-surface p-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Missed calls", "You're working on a vehicle."],
                      ["Slow response", "The customer contacts another shop."],
                      ["Unfollowed quotes", "Interest disappears after pricing."],
                      ["Unconfirmed appointments", "Calendar gaps become lost revenue."],
                    ].map(([label, note], index) => (
                      <div
                        key={label}
                        className={`rounded-2xl border border-border p-4 ${
                          index === 0
                            ? "bg-white"
                            : index === 1
                              ? "bg-surface"
                              : index === 2
                                ? "bg-[#eef4ff]"
                                : "bg-[#f4f7fb]"
                        }`}
                      >
                        <p className="font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase">
                          {label}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-foreground">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-16 border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">The system</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  The Detailing Lead Recovery &amp; Booking System
                </h2>
                <p className="mt-5 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  A connected operational layer that helps you capture, respond to, convert, secure,
                  and retain more customers.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-border bg-background p-4 sm:p-6 lg:p-8">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {[
                  { label: "01 — Capture", state: "Website forms, calls, inquiries" },
                  { label: "02 — Respond", state: "Immediate acknowledgement and qualification" },
                  { label: "03 — Convert", state: "Follow-up and booking" },
                  { label: "04 — Protect", state: "Deposits, confirmations, reminders" },
                  { label: "05 — Retain", state: "Reviews, rebooking, customer follow-up" },
                ].map((step, index) => (
                  <div key={step.label} className="relative">
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <span className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base font-medium text-foreground">
                        {step.label.split(" — ")[1]}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.state}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Solutions</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Capture. Convert. Retain.
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
              {[
                {
                  title: "Capture",
                  items: ["Website forms", "Calls", "Inquiries"],
                },
                {
                  title: "Convert",
                  items: ["Qualification", "Follow-up", "Booking"],
                },
                {
                  title: "Retain",
                  items: ["Reminders", "Reviews", "Rebooking"],
                },
              ].map((layer, index) => (
                <Reveal key={layer.title} delay={index * 0.08}>
                  <div className="relative h-full rounded-[1.5rem] border border-border bg-background p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                        0{index + 1}
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    </div>
                    <h3 className="mt-5 text-xl font-medium text-foreground">{layer.title}</h3>
                    <div className="mt-6 space-y-3">
                      {layer.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
              <Reveal>
                <div>
                  <p className="eyebrow">Product demonstration</p>
                  <h2 className="mt-4 max-w-md text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                    See what happens after the inquiry.
                  </h2>
                  <p className="mt-5 max-w-md text-[1.125rem] leading-[1.7] text-muted-foreground">
                    A polished lead flow gives the team a clearer view of what is new, qualified,
                    quoted, booked, and ready for follow-up.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <DetailingDashboardVisual className="w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Before / after</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  The difference is what happens after the inquiry.
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-background p-6">
                <p className="eyebrow">Without a system</p>
                <div className="mt-6 space-y-4 text-lg text-foreground">
                  <div>Missed call</div>
                  <div className="text-muted-foreground">↓</div>
                  <div>No response</div>
                  <div className="text-muted-foreground">↓</div>
                  <div>Customer waits</div>
                  <div className="text-muted-foreground">↓</div>
                  <div>Customer contacts competitor</div>
                  <div className="text-muted-foreground">↓</div>
                  <div>Lost revenue</div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-primary p-6 text-primary-foreground">
                <p className="eyebrow text-primary-foreground/80">With OperantScale</p>
                <div className="mt-6 space-y-4 text-lg">
                  <div>Missed call</div>
                  <div className="text-primary-foreground/70">↓</div>
                  <div>Immediate response</div>
                  <div className="text-primary-foreground/70">↓</div>
                  <div>Lead qualified</div>
                  <div className="text-primary-foreground/70">↓</div>
                  <div>Booking link</div>
                  <div className="text-primary-foreground/70">↓</div>
                  <div>Deposit</div>
                  <div className="text-primary-foreground/70">↓</div>
                  <div>Appointment confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">ROI</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Recover the revenue already in your pipeline.
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 rounded-[1.75rem] border border-border bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Example scenario
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-2xl text-foreground sm:text-3xl">
                    <span>40 inquiries</span>
                    <span className="text-muted-foreground">—</span>
                    <span>10 unconverted</span>
                    <span className="text-muted-foreground">—</span>
                    <span>3 recovered</span>
                    <span className="text-muted-foreground">—</span>
                    <span>$350 average job</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-border bg-white p-5 text-center shadow-[0_20px_48px_-36px_rgba(11,37,69,0.45)]">
                  <p className="font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Potential recovered revenue
                  </p>
                  <p className="mt-3 text-4xl font-medium text-foreground">$1,050</p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground">
                Example scenario for illustration. Actual results depend on lead volume, service
                mix, conversion rate, and average ticket.
              </p>
            </div>
          </div>
        </section>

        <section id="case-study" className="scroll-mt-16 border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Selected Work</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Precision Toronto
                </h2>
                <p className="mt-5 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  Automotive detailing web application and booking system built around a cleaner
                  customer journey and a more structured internal workflow.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Website", "Customer-facing detail experience"],
                  ["Booking flow", "Service selection and scheduling"],
                  ["Admin dashboard", "Operational visibility for the team"],
                  ["Customer data", "Vehicle, service, and booking records"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.2rem] border border-border bg-background p-4"
                  >
                    <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 lg:mt-0">
                <SelectedProjectVisual className="w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Built for businesses like yours</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Premium shops, coating studios, and detailers with real operational pressure.
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 space-y-3">
              {businessTypes.map((type, index) => (
                <Reveal key={type} delay={index * 0.06}>
                  <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[1.7rem] font-medium text-foreground sm:text-[2.05rem]">
                        {type}
                      </h3>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
                      {index % 2 === 0
                        ? "Higher-value work, more customer context, and smoother booking flows create better operational control."
                        : "Service quality and customer experience improve when the business can respond and follow up quickly."}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-16 border-t border-border bg-surface">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">How it works</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                  Start with the workflow. Not the software.
                </h2>
                <p className="mt-4 text-[1.125rem] leading-[1.7] text-muted-foreground">
                  OperantScale starts by understanding how your business currently handles
                  inquiries, bookings, service records, and follow-up before deciding what should be
                  built.
                </p>
              </div>
            </Reveal>

            <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.n} delay={i * 0.08} className="bg-background">
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

        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">FAQ</p>
                <h2 className="mt-4 text-[2.25rem] leading-[1.08] font-medium sm:text-[2.75rem]">
                  Questions we hear from detailing business owners
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

        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10 lg:py-26">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
                <div>
                  <p className="eyebrow text-ink-muted">Next step</p>
                  <h2 className="mt-4 max-w-2xl text-[2.25rem] leading-[1.08] font-medium sm:text-[3rem]">
                    Stop letting good customers slip through the gaps.
                  </h2>
                  <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-ink-muted">
                    Let’s look at how your detailing business currently handles inquiries, bookings,
                    and follow-up — and identify where a better operating system could improve the
                    customer journey.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_name: "book_workflow_review",
                        location: "final_cta",
                      })
                    }
                    className="inline-flex h-16 w-full items-center justify-center gap-3 whitespace-normal bg-ink-foreground px-6 text-[0.82rem] font-medium tracking-[0.11em] text-ink uppercase shadow-[0_18px_44px_-22px_var(--color-ink-accent)] transition-opacity hover:opacity-90 sm:w-auto sm:whitespace-nowrap sm:px-10"
                  >
                    Book a Workflow Review <ArrowRight className="size-4 shrink-0" />
                  </Link>
                  <Link
                    to="/"
                    hash="solutions"
                    className="inline-flex h-12 items-center justify-center whitespace-normal border border-ink-border px-5 text-[0.72rem] font-medium tracking-[0.11em] text-ink-foreground uppercase transition-colors hover:bg-ink/80 sm:w-auto sm:whitespace-nowrap"
                  >
                    See the system
                  </Link>
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
