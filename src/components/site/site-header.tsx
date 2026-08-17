import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { label: "Capabilities", hash: "capabilities" },
  { label: "Approach", hash: "approach" },
  { label: "FAQ", hash: "faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 shadow-[0_1px_20px_-12px_oklch(0.2_0.03_260/0.35)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between px-6 lg:px-10">
        <Link to="/" aria-label="OperantScale home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="border border-primary bg-primary px-5 py-2.5 text-[0.74rem] font-medium tracking-[0.11em] text-primary-foreground uppercase shadow-[0_10px_24px_-16px_var(--color-primary)] transition-colors hover:bg-primary/90"
          >
            Start a conversation
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pt-6 pb-10 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-lg text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 text-lg text-foreground"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 bg-primary px-5 py-4 text-center text-[0.72rem] font-medium tracking-[0.11em] text-primary-foreground uppercase"
            >
              Start a conversation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
