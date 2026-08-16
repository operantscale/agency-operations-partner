export function Logo({ tone = "default" }: { tone?: "default" | "ink" }) {
  const text = tone === "ink" ? "text-ink-foreground" : "text-foreground";
  const mark = tone === "ink" ? "text-ink-muted" : "text-accent";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={mark}
      >
        <rect x="0.6" y="0.6" width="18.8" height="18.8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 13.5 L9 6.5 L15.5 6.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="9" cy="6.5" r="1.6" fill="currentColor" />
      </svg>
      <span className={`text-[0.95rem] font-medium tracking-[-0.01em] ${text}`}>
        Operant<span className="font-normal opacity-70">Scale</span>
      </span>
    </span>
  );
}
