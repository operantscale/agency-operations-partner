import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Operational Intelligence for Independent P&amp;C Insurance Agencies
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <Link to="/" hash="capabilities" className="text-muted-foreground hover:text-foreground">
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
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="mailto:wajeeh@operantscale.com"
              className="text-muted-foreground hover:text-foreground"
            >
              wajeeh@operantscale.com
            </a>
            <a
              href="https://operantscale.com"
              className="text-muted-foreground hover:text-foreground"
            >
              operantscale.com
            </a>
            <span className="text-muted-foreground">United States</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} OperantScale. All rights reserved.</span>
          <span>Built around your agency. Designed around your workflows.</span>
        </div>
      </div>
    </footer>
  );
}
