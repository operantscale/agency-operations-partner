import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { discoverySchema, submitDiscoveryRequest } from "@/lib/discovery.functions";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Workflow Review | OperantScale" },
      {
        name: "description",
        content:
          "Book a workflow review with OperantScale to identify where your detailing business is losing inquiries, appointments, and repeat revenue.",
      },
      { property: "og:title", content: "Book a Workflow Review | OperantScale" },
      {
        property: "og:description",
        content:
          "Review how your detailing business handles inquiries, bookings, reminders, and follow-up — and find where the process is leaking revenue.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/contact") },
      { property: "og:image", content: getAbsoluteImageUrl() },
      {
        property: "og:image:alt",
        content:
          "OperantScale brand mark for lead recovery and booking systems for detailing businesses",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book a Workflow Review | OperantScale" },
      {
        name: "twitter:description",
        content: "Find where your detailing business is losing bookings and customer follow-up.",
      },
      { name: "twitter:image", content: getAbsoluteImageUrl() },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/contact") }],
  }),
  component: ContactPage,
});

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
  { name: "workEmail", label: "Work email", type: "email", required: true, autoComplete: "email" },
  {
    name: "shopName",
    label: "Shop / business name",
    type: "text",
    required: true,
    autoComplete: "organization",
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    required: false,
    autoComplete: "organization-title",
  },
  {
    name: "shopWebsite",
    label: "Website",
    type: "text",
    required: false,
    autoComplete: "url",
  },
] as const;

type FormState = Record<string, string>;
const SUBMISSION_ERROR_MESSAGE = "We couldn't submit your request right now. Please try again.";

function ContactPage() {
  const submit = useServerFn(submitDiscoveryRequest);
  const [values, setValues] = useState<FormState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [formError, setFormError] = useState("");
  const formStarted = useRef(false);

  const trackFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_start", { form_name: "operational_discovery" });
  };

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: "" }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const parsed = discoverySchema.safeParse({
      fullName: values["fullName"] ?? "",
      workEmail: values["workEmail"] ?? "",
      shopName: values["shopName"] ?? "",
      role: values["role"] ?? "",
      shopWebsite: values["shopWebsite"] ?? "",
      primaryChallenge: values["primaryChallenge"] ?? "",
      additionalContext: values["additionalContext"] ?? "",
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }

    trackEvent("form_submit", { form_name: "operational_discovery" });
    setStatus("loading");

    try {
      const result = await submit({ data: parsed.data });
      const ok = Boolean(
        result && typeof result === "object" && "ok" in result && result.ok === true,
      );

      if (!ok) {
        throw new Error(SUBMISSION_ERROR_MESSAGE);
      }

      if (result.emailDeliverySucceeded) {
        // Primary GA4 conversion/key-event candidate. Configure it as a key event in GA4.
        trackEvent("form_success", { form_name: "operational_discovery" });
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.error("Discovery request submission failed", err);
      const message = err instanceof Error ? err.message : SUBMISSION_ERROR_MESSAGE;
      setFormError(message || SUBMISSION_ERROR_MESSAGE);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-[84rem] px-6 pt-20 pb-24 lg:px-10 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">Workflow review</p>
              <h1 className="mt-6 text-4xl leading-[1.04] font-medium tracking-[-0.03em] sm:text-5xl lg:text-[4rem]">
                Find where your booking process is leaking revenue.
              </h1>
              <p className="mt-6 max-w-md text-[1.125rem] leading-[1.7] text-muted-foreground">
                We review how your detailing business handles inquiries, bookings, reminders, and
                follow-up so we can identify the gaps in the customer journey and the operational
                leak behind them.
              </p>

              <div className="mt-10 space-y-4 border-t border-border pt-8">
                {[
                  "Missed calls and unanswered DMs",
                  "Slow quote follow-up",
                  "Unconfirmed appointments",
                  "Lost repeat business",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <dl className="mt-12 space-y-6 border-t border-border pt-8 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:sabeeh@operantscale.com"
                      onClick={() => trackEvent("email_click", { location: "contact_page" })}
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      sabeeh@operantscale.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Focus</dt>
                  <dd className="mt-2 text-muted-foreground">
                    Detailing lead recovery, booking flow, reminders, and repeat customer follow-up.
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              {status === "success" ? (
                <div
                  className="border border-border bg-card p-8 sm:p-12"
                  role="status"
                  aria-live="polite"
                >
                  <span className="inline-flex size-9 items-center justify-center border border-accent text-accent">
                    <Check className="size-4" />
                  </span>
                  <h2 className="mt-6 text-2xl font-medium">
                    Thank you. Your request has been received.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    We'll review what you shared and reply from sabeeh@operantscale.com within two
                    business days to schedule a short workflow review. The conversation will focus
                    on how your business currently handles inquiries, bookings, and follow-up — and
                    where the process may be losing revenue.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    Return to homepage <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  onFocusCapture={trackFormStart}
                  noValidate
                  className="border border-border bg-card p-6 sm:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    {FIELDS.map((field) => (
                      <div
                        key={field.name}
                        className={field.name === "shopWebsite" ? "sm:col-span-2" : ""}
                      >
                        <label htmlFor={field.name} className="block text-sm text-foreground">
                          {field.label}
                          {!field.required && (
                            <span className="ml-2 text-xs text-muted-foreground">(optional)</span>
                          )}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          value={values[field.name] ?? ""}
                          onChange={(e) => set(field.name, e.target.value)}
                          aria-invalid={Boolean(errors[field.name])}
                          aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                          className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground transition-colors outline-none focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                        />
                        {errors[field.name] && (
                          <p
                            id={`${field.name}-error`}
                            role="alert"
                            className="mt-2 text-xs text-destructive"
                          >
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label htmlFor="primaryChallenge" className="block text-sm text-foreground">
                        What process are you trying to improve?
                      </label>
                      <textarea
                        id="primaryChallenge"
                        name="primaryChallenge"
                        rows={4}
                        value={values["primaryChallenge"] ?? ""}
                        onChange={(e) => set("primaryChallenge", e.target.value)}
                        aria-invalid={Boolean(errors["primaryChallenge"])}
                        aria-describedby={
                          errors["primaryChallenge"] ? "primaryChallenge-error" : undefined
                        }
                        className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      />
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Examples: missed-call recovery, quote follow-up, booking confirmations,
                        retention reminders, scheduling bottlenecks.
                      </p>
                      {errors["primaryChallenge"] && (
                        <p
                          id="primaryChallenge-error"
                          role="alert"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors["primaryChallenge"]}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="additionalContext" className="block text-sm text-foreground">
                        Additional context
                        <span className="ml-2 text-xs text-muted-foreground">(optional)</span>
                      </label>
                      <textarea
                        id="additionalContext"
                        name="additionalContext"
                        rows={3}
                        value={values["additionalContext"] ?? ""}
                        onChange={(e) => set("additionalContext", e.target.value)}
                        className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-primary px-8 text-[0.78rem] font-medium tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                  >
                    {status === "loading" ? "Sending…" : "Book a Workflow Review"}
                    {status !== "loading" && <ArrowRight className="size-4" />}
                  </button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    We use what you share only to prepare for the conversation.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
