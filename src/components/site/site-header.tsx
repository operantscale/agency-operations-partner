import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { trackEvent } from "@/lib/analytics";
import { SOLUTIONS } from "@/lib/offers";

const NAV = [
  { label: "How It Works", hash: "how-it-works" },
  { label: "Demo", hash: "demo" },
  { label: "Engagement", hash: "solutions" },
  { label: "Our Work", hash: "our-work" },
  { label: "FAQ", hash: "faq" },
];

function trackReview(location: string) {
  trackEvent("cta_click", { cta_name: "free_website_preview", location });
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }
    const ids = [
      "platform",
      "solutions",
      "professional-website",
      "website-dashboard",
      "complete-system",
      "how-it-works",
      "demo",
      "our-work",
      "faq",
    ];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveHash(visible.target.id);
      },
      { rootMargin: "-25% 0px -62% 0px", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/95 shadow-[0_8px_30px_-24px_rgba(11,37,69,0.5)] backdrop-blur-md" : "border-transparent bg-background/80 backdrop-blur-sm"}`}
    >
      <div className="page-container flex h-[4.5rem] items-center justify-between">
        <Link to="/" aria-label="OperantScale home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex xl:gap-6">
          <details className="group relative">
            <summary
              className={`relative flex cursor-pointer list-none items-center gap-1.5 py-3 text-[0.82rem] transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden ${["solutions", "professional-website", "website-dashboard", "complete-system"].includes(activeHash) ? "text-foreground" : "text-muted-foreground"}`}
            >
              Solutions{" "}
              <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
              {[
                "solutions",
                "professional-website",
                "website-dashboard",
                "complete-system",
              ].includes(activeHash) && (
                <span
                  className="absolute inset-x-0 -bottom-[0.05rem] h-px bg-foreground"
                  aria-hidden="true"
                />
              )}
            </summary>
            <div className="absolute left-0 top-full w-[21rem] border border-border bg-background p-2 shadow-[0_20px_45px_-22px_rgba(11,37,69,0.3)]">
              {SOLUTIONS.map((solution) => (
                <Link
                  key={solution.id}
                  to="/"
                  hash={solution.id}
                  onClick={(event) => {
                    const details = event.currentTarget.closest("details");
                    if (details) details.open = false;
                  }}
                  className="block px-3 py-3 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span className="block text-sm font-medium text-foreground">{solution.name}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {solution.navDescription}
                  </span>
                </Link>
              ))}
            </div>
          </details>
          {NAV.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              aria-current={activeHash === item.hash ? "location" : undefined}
              className={`relative whitespace-nowrap py-3 text-[0.82rem] transition-colors hover:text-foreground ${activeHash === item.hash ? "text-foreground" : "text-muted-foreground"}`}
            >
              {item.label}
              {activeHash === item.hash && (
                <span
                  className="absolute inset-x-0 -bottom-[0.05rem] h-px bg-foreground"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => trackReview("header")}
            className="inline-flex h-10 items-center justify-center whitespace-nowrap bg-primary px-3 text-[0.64rem] font-medium text-primary-foreground transition-colors hover:bg-accent xl:px-4 xl:text-[0.72rem]"
          >
            Request a Free Website Preview
          </Link>
        </nav>
        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-foreground xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background pt-3 pb-7 xl:hidden"
        >
          <nav aria-label="Mobile" className="page-container flex flex-col">
            <details className="group border-b border-border">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-base font-medium [&::-webkit-details-marker]:hidden">
                Solutions{" "}
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-2 pl-3">
                {SOLUTIONS.map((solution) => (
                  <Link
                    key={solution.id}
                    to="/"
                    hash={solution.id}
                    onClick={() => setOpen(false)}
                    className="block border-l border-border px-4 py-3"
                  >
                    <span className="block text-sm font-medium">{solution.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {solution.navDescription}
                    </span>
                  </Link>
                ))}
              </div>
            </details>
            {NAV.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                aria-current={activeHash === item.hash ? "location" : undefined}
                className="flex min-h-12 items-center border-b border-border text-base text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                setOpen(false);
                trackReview("mobile_menu");
              }}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Request a Free Website Preview
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
