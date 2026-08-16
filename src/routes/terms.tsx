import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | OperantScale" },
      {
        name: "description",
        content: "Terms governing use of the OperantScale website and information published on it.",
      },
      { property: "og:title", content: "Terms — OperantScale" },
      {
        property: "og:description",
        content: "Terms governing use of the OperantScale website.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-16">
        <article className="mx-auto max-w-2xl px-6 pt-20 pb-24 lg:pt-28">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-4xl font-medium">Terms</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated {new Date().getFullYear()}
          </p>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-base font-medium text-foreground">Use of this website</h2>
              <p className="mt-3">
                This website describes OperantScale's approach to operational systems for
                independent P&amp;C insurance agencies. Content is provided for general information
                and does not constitute professional, legal, or insurance advice.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">No guaranteed outcomes</h2>
              <p className="mt-3">
                Descriptions of potential improvements are illustrative. Any outcome depends on the
                specific agency, its systems, its processes, and the scope of work agreed in
                writing. Nothing on this website is a guarantee of results.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">Engagements</h2>
              <p className="mt-3">
                Submitting a discovery request does not create a contractual relationship. Any
                engagement is governed by a separate written agreement between OperantScale and the
                client.
              </p>
            </section>
            <section>
              <h2 className="text-base font-medium text-foreground">Contact</h2>
              <p className="mt-3">
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:wajeeh@operantscale.com"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  wajeeh@operantscale.com
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
