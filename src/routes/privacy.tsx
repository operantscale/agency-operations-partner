import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { trackEvent } from "@/lib/analytics";
import { getAbsoluteImageUrl, getCanonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "OperantScale Privacy Policy" },
      {
        name: "description",
        content:
          "Learn how OperantScale handles information submitted through the website and contact form, including collection, use, and retention practices.",
      },
      { property: "og:title", content: "OperantScale Privacy Policy" },
      {
        property: "og:description",
        content:
          "Learn how OperantScale handles information submitted through the website and discovery form.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/privacy") },
      { property: "og:image", content: getAbsoluteImageUrl() },
      { property: "og:image:alt", content: "OperantScale brand mark for privacy information" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OperantScale Privacy Policy" },
      {
        name: "twitter:description",
        content:
          "Learn how OperantScale handles information submitted through the website and contact form.",
      },
      { name: "twitter:image", content: getAbsoluteImageUrl() },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/privacy") }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-16">
        <article className="mx-auto max-w-2xl px-6 pt-20 pb-24 lg:pt-28">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-4xl font-medium">Privacy</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated {new Date().getFullYear()}
          </p>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-base font-medium text-foreground">Information we collect</h2>
              <p className="mt-3">
                We collect only the information you submit through the discovery request form: your
                name, work email, agency name, role, agency website, and the operational context you
                choose to share. We do not sell information and we do not use it for advertising.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">How we use it</h2>
              <p className="mt-3">
                Submitted information is used to respond to your request, prepare for an operational
                discovery conversation, and maintain a record of the inquiry. If a working
                relationship follows, information is used to understand and improve the workflows
                under discussion.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">Storage and retention</h2>
              <p className="mt-3">
                Submissions are stored in a managed database with access restricted to OperantScale.
                We retain them for as long as needed to serve the inquiry or the engagement, and
                remove them on request.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">Your choices</h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of information you submitted
                by writing to{" "}
                <a
                  href="mailto:sabeeh@operantscale.com"
                  onClick={() => trackEvent("email_click", { location: "privacy_page" })}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  sabeeh@operantscale.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
