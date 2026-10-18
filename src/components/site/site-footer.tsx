import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Logo } from "./logo";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[82rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/" aria-label="OperantScale home">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Websites and practical lead systems for auto-detailing businesses.
            </p>
          </div>
          <nav aria-label="Solutions" className="flex flex-col items-start gap-3 text-sm">
            <span className="eyebrow mb-1">Solutions</span>
            <Link
              to="/"
              hash="professional-website"
              className="text-muted-foreground hover:text-foreground"
            >
              Professional Detailing Website
            </Link>
            <Link
              to="/"
              hash="website-dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Website + Dashboard
            </Link>
            <Link
              to="/"
              hash="complete-system"
              className="text-muted-foreground hover:text-foreground"
            >
              Complete Booking & Lead Recovery System
            </Link>
            <Link to="/" hash="solutions" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <nav aria-label="Explore" className="flex flex-col items-start gap-3 text-sm">
            <span className="eyebrow mb-1">Explore</span>
            <Link
              to="/"
              hash="how-it-works"
              className="text-muted-foreground hover:text-foreground"
            >
              How It Works
            </Link>
            <Link to="/" hash="demo" className="text-muted-foreground hover:text-foreground">
              Product Demo
            </Link>
            <Link to="/" hash="our-work" className="text-muted-foreground hover:text-foreground">
              Our Work
            </Link>
            <Link to="/" hash="faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex flex-col items-start gap-3 text-sm">
            <span className="eyebrow mb-1">Connect</span>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEvent("email_click", { location: "footer" })}
              className="text-muted-foreground hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Instagram className="size-4" /> Instagram <ArrowUpRight className="size-3" />
            </a>
            <Link
              to="/contact"
              onClick={() =>
                trackEvent("cta_click", { cta_name: "book_workflow_review", location: "footer" })
              }
              className="mt-2 inline-flex items-center gap-2 font-medium text-primary hover:text-accent"
            >
              Book a Workflow Review <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OperantScale. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
