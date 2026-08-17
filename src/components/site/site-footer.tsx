import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./logo";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/seo";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[84rem] px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-Powered Operational Systems for Independent P&amp;C Insurance Agencies
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <span className="eyebrow">Site</span>
            <Link
              to="/"
              hash="capabilities"
              className="text-muted-foreground hover:text-foreground"
            >
              Capabilities
            </Link>
            <Link to="/" hash="approach" className="text-muted-foreground hover:text-foreground">
              Approach
            </Link>
            <Link to="/" hash="faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <span className="eyebrow">Contact</span>
            <a
              href="mailto:sabeeh@operantscale.com"
              onClick={() => trackEvent("email_click", { location: "footer" })}
              className="text-muted-foreground hover:text-foreground"
            >
              sabeeh@operantscale.com
            </a>
            <a
              href="https://operantscale.com"
              className="text-muted-foreground hover:text-foreground"
            >
              operantscale.com
            </a>
            <div aria-label="OperantScale social profiles" className="mt-2 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => {
                const isEnabled = Boolean(href);

                return (
                  <a
                    key={label}
                    href={isEnabled ? (href ?? undefined) : undefined}
                    aria-label={label}
                    aria-disabled={!isEnabled}
                    target={isEnabled ? "_blank" : undefined}
                    rel={isEnabled ? "noopener noreferrer" : undefined}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                      isEnabled
                        ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        : "pointer-events-none border-border/60 text-muted-foreground/50"
                    }`}
                    onClick={(event) => {
                      if (!isEnabled) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OperantScale. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
