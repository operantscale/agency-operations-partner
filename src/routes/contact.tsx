import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { discoverySchema, submitDiscoveryRequest } from "@/lib/discovery.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact OperantScale | Operational Discovery for P&C Agencies" },
      {
        name: "description",
        content:
          "Start a conversation with OperantScale. Tell us about your agency and the operational challenge you're looking to understand.",
      },
      { property: "og:title", content: "Start With a Conversation — OperantScale" },
      {
        property: "og:description",
        content:
          "Request an operational discovery conversation with OperantScale, a specialist in operational systems for independent P&C insurance agencies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
  { name: "workEmail", label: "Work email", type: "email", required: true, autoComplete: "email" },
  {
    name: "agencyName",
    label: "Agency name",
    type: "text",
    required: true,
    autoComplete: "organization",
  },
  { name: "role", label: "Role", type: "text", required: false, autoComplete: "organization-title" },
  { name: "agencyWebsite", label: "Agency website", type: "text", required: false, autoComplete: "url" },
] as const;

type FormState = Record<string, string>;

function ContactPage() {
  const submit = useServerFn(submitDiscoveryRequest);
  const [values, setValues] = useState<FormState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [formError, setFormError] = useState("");

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const parsed = discoverySchema.safeParse({
      fullName: values.fullName ?? "",
      workEmail: values.workEmail ?? "",
      agencyName: values.agencyName ?? "",
      role: values.role ?? "",
      agencyWebsite: values.agencyWebsite ?? "",
      primaryChallenge: values.primaryChallenge ?? "",
      additionalContext: values.additionalContext ?? "",
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

    setStatus("loading");
    try {
      await submit({ data: parsed.data });
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(
        "We couldn't submit your request. Please try again, or email wajeeh@operantscale.com directly.",
      );
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-[84rem] px-6 pt-20 pb-24 lg:px-10 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">Operational discovery</p>
              <h1 className="mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                Start With a Conversation.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Tell us a little about your agency and the operational challenge you're looking to
                understand. We'll use the conversation to learn how your team works and determine
                whether there is a meaningful opportunity for improvement.
              </p>

              <dl className="mt-12 space-y-6 border-t border-border pt-8 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:wajeeh@operantscale.com"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      wajeeh@operantscale.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Focus</dt>
                  <dd className="mt-2 text-muted-foreground">
                    Independent P&amp;C insurance agencies, United States.
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              {status === "success" ? (
                <div className="border border-border bg-card p-8 sm:p-12">
                  <span className="inline-flex size-9 items-center justify-center border border-accent text-accent">
                    <Check className="size-4" />
                  </span>
                  <h2 className="mt-6 text-2xl font-medium">
                    Thank you. Your request has been received.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    We'll review what you shared and reply from wajeeh@operantscale.com within two
                    business days to schedule a short operational discovery conversation. That first
                    call is a working session, not a sales call: we'll walk through how your team
                    operates today and where repetitive work may be accumulating.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    Return to homepage <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 sm:p-10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {FIELDS.map((field) => (
                      <div
                        key={field.name}
                        className={field.name === "agencyWebsite" ? "sm:col-span-2" : ""}
                      >
                        <label htmlFor={field.name} className="block text-sm text-foreground">
                          {field.label}
                          {!field.required && (
                            <span className="ml-2 text-xs text-muted-foreground">Optional</span>
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
                          className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground transition-colors outline-none focus:border-ring"
                        />
                        {errors[field.name] && (
                          <p id={`${field.name}-error`} className="mt-2 text-xs text-destructive">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label htmlFor="primaryChallenge" className="block text-sm text-foreground">
                        Primary operational challenge
                      </label>
                      <textarea
                        id="primaryChallenge"
                        name="primaryChallenge"
                        rows={4}
                        value={values.primaryChallenge ?? ""}
                        onChange={(e) => set("primaryChallenge", e.target.value)}
                        aria-invalid={Boolean(errors.primaryChallenge)}
                        aria-describedby={
                          errors.primaryChallenge ? "primaryChallenge-error" : undefined
                        }
                        className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring"
                      />
                      {errors.primaryChallenge && (
                        <p id="primaryChallenge-error" className="mt-2 text-xs text-destructive">
                          {errors.primaryChallenge}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="additionalContext" className="block text-sm text-foreground">
                        Additional context
                        <span className="ml-2 text-xs text-muted-foreground">Optional</span>
                      </label>
                      <textarea
                        id="additionalContext"
                        name="additionalContext"
                        rows={3}
                        value={values.additionalContext ?? ""}
                        onChange={(e) => set("additionalContext", e.target.value)}
                        className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p role="alert" className="mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 bg-primary px-6 text-[0.72rem] font-medium tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                  >
                    {status === "loading" ? "Sending…" : "Request an operational discovery"}
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
