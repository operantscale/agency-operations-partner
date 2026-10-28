import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { discoverySchema, submitDiscoveryRequest } from "@/lib/discovery.functions";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";
import {
  CONTACT_INTEREST_OPTIONS,
  getContactInterest,
  NOT_SURE_CONTACT_OPTION,
} from "@/lib/offers";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Free Website Preview | OperantScale" },
      {
        name: "description",
        content:
          "Request a personalized, temporary website preview for your auto detailing business and discuss a practical next step.",
      },
      { property: "og:title", content: "Free Website Preview | OperantScale" },
      {
        property: "og:description",
        content: "Tell us about your detailing business to request a personalized website preview.",
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
      { name: "twitter:title", content: "Free Website Preview | OperantScale" },
      {
        name: "twitter:description",
        content: "Request a personalized website preview for your detailing business.",
      },
      { name: "twitter:image", content: getAbsoluteImageUrl() },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/contact") }],
  }),
  component: ContactPage,
});

type FormState = Record<string, string>;
const SUBMISSION_ERROR_MESSAGE = "We couldn't submit your request right now. Please try again.";
function ContactPage() {
  const submit = useServerFn(submitDiscoveryRequest);
  const location = useLocation();
  const [values, setValues] = useState<FormState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [formError, setFormError] = useState("");
  const formStarted = useRef(false);
  const selectedPackageInterest = values["packageInterest"];

  useEffect(() => {
    const selectedPackage = new URLSearchParams(location.search).get("package");
    if (selectedPackage && !selectedPackageInterest) {
      const packageInterest = getContactInterest(selectedPackage);
      if (!packageInterest) return;
      setValues((current) => ({
        ...current,
        packageInterest,
      }));
    }
  }, [location.search, selectedPackageInterest]);

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
    if (status === "loading") return;
    setFormError("");

    const parsed = discoverySchema.safeParse({
      fullName: values["fullName"] ?? "",
      workEmail: values["workEmail"] ?? "",
      shopName: values["shopName"] ?? "",
      shopWebsite: values["shopWebsite"] ?? "",
      packageInterest: values["packageInterest"] ?? "",
      currentContactMethod: values["currentContactMethod"] ?? "",
      servicesAndArea: values["servicesAndArea"] ?? "",
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
        <section className="page-container pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Free website preview</p>
              <h1 className="mt-6 max-w-2xl text-4xl leading-[1.04] font-medium tracking-[-0.04em] sm:text-5xl lg:text-[3.8rem]">
                See what your detailing business could look like online.
              </h1>
              <p className="mt-6 max-w-md text-[1.125rem] leading-[1.7] text-muted-foreground">
                Tell us about your services and how customers currently reach you. We'll review your
                business and identify a practical starting point for your website and inquiry
                process.
              </p>

              <div className="mt-10 space-y-4 border-t border-border pt-8">
                {[
                "A personalized one-page staging website with business-specific styling and service information",
                "An interactive quote-request journey and a short walkthrough",
                "A seven-calendar-day evaluation window once the preview is ready",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-md text-xs leading-5 text-muted-foreground">
                The preview is available on a temporary staging URL for seven calendar days and is
                for evaluation only. It is not a production website and does not include ongoing
                hosting, a production domain, live lead storage or notifications, paid integrations,
                or unlimited revisions.
              </p>

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
                    Website previews, detailing websites, and practical inquiry workflows.
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
                    Thanks for contacting OperantScale. Your request has been received.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    We'll review your information and respond using the contact details you
                    provided.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    Return to homepage
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  onFocusCapture={trackFormStart}
                  noValidate
                  className="border border-border bg-card p-6 sm:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
                      {
                        name: "workEmail",
                        label: "Email address",
                        type: "email",
                        autoComplete: "email",
                      },
                      {
                        name: "shopName",
                        label: "Business name",
                        type: "text",
                        autoComplete: "organization",
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={field.name === "shopName" ? "sm:col-span-2" : ""}
                      >
                        <label htmlFor={field.name} className="block text-sm text-foreground">
                          {field.label}{" "}
                          <span aria-hidden="true" className="text-accent">
                            *
                          </span>
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          required
                          value={values[field.name] ?? ""}
                          onChange={(e) => set(field.name, e.target.value)}
                          aria-invalid={Boolean(errors[field.name])}
                          aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                          className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
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
                      <label htmlFor="shopWebsite" className="block text-sm text-foreground">
                        Website or social profile{" "}
                        <span className="ml-2 text-xs text-muted-foreground">
                          (optional; a website isn't required)
                        </span>
                      </label>
                      <input
                        id="shopWebsite"
                        name="shopWebsite"
                        type="url"
                        autoComplete="url"
                        placeholder="https://"
                        value={values["shopWebsite"] ?? ""}
                        onChange={(e) => set("shopWebsite", e.target.value)}
                        aria-invalid={Boolean(errors["shopWebsite"])}
                        aria-describedby={errors["shopWebsite"] ? "shopWebsite-error" : undefined}
                        className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      />
                      {errors["shopWebsite"] && (
                        <p
                          id="shopWebsite-error"
                          role="alert"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors["shopWebsite"]}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="currentContactMethod"
                        className="block text-sm text-foreground"
                      >
                        How do customers currently contact you?{" "}
                        <span aria-hidden="true" className="text-accent">
                          *
                        </span>
                      </label>
                      <select
                        id="currentContactMethod"
                        name="currentContactMethod"
                        required
                        value={values["currentContactMethod"] ?? ""}
                        onChange={(e) => set("currentContactMethod", e.target.value)}
                        aria-invalid={Boolean(errors["currentContactMethod"])}
                        aria-describedby={
                          errors["currentContactMethod"] ? "currentContactMethod-error" : undefined
                        }
                        className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      >
                        <option value="">Select an option</option>
                        {[
                          "Phone calls and text messages",
                          "Instagram or Facebook messages",
                          "Existing website or contact form",
                          "Booking software",
                          "A mix of these",
                          "Other",
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors["currentContactMethod"] && (
                        <p
                          id="currentContactMethod-error"
                          role="alert"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors["currentContactMethod"]}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="packageInterest" className="block text-sm text-foreground">
                        What would you like help with?{" "}
                        <span className="ml-2 text-xs text-muted-foreground">(optional)</span>
                      </label>
                      <select
                        id="packageInterest"
                        name="packageInterest"
                        value={values["packageInterest"] ?? ""}
                        onChange={(e) => set("packageInterest", e.target.value)}
                        className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      >
                        <option value="">Select an option</option>
                        {CONTACT_INTEREST_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        <option value={NOT_SURE_CONTACT_OPTION.label}>
                          {NOT_SURE_CONTACT_OPTION.label}
                        </option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="servicesAndArea" className="block text-sm text-foreground">
                        Services and service area{" "}
                        <span className="ml-2 text-xs text-muted-foreground">(optional)</span>
                      </label>
                      <textarea
                        id="servicesAndArea"
                        name="servicesAndArea"
                        rows={3}
                        placeholder="For example, mobile detailing, interior detailing, paint correction, and the areas you serve."
                        value={values["servicesAndArea"] ?? ""}
                        onChange={(e) => set("servicesAndArea", e.target.value)}
                        aria-invalid={Boolean(errors["servicesAndArea"])}
                        aria-describedby={
                          errors["servicesAndArea"] ? "servicesAndArea-error" : undefined
                        }
                        className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                      />
                      {errors["servicesAndArea"] && (
                        <p
                          id="servicesAndArea-error"
                          role="alert"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors["servicesAndArea"]}
                        </p>
                      )}
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
                    {status === "loading" ? "Sending…" : "Request My Free Website Preview"}
                    {status !== "loading" && <ArrowRight className="size-4" />}
                  </button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    We'll review your details and get in touch about the next steps. The preview is
                    temporary; production implementation is a separate paid project.
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
