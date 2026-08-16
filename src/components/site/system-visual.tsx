import { motion, useReducedMotion } from "motion/react";

/**
 * OperantScale visual language:
 * fine 1px lines, square nodes, mono micro-labels, single blue accent,
 * left-to-right or top-down progression. No decoration for its own sake.
 */

/** Hero: People / Processes / Systems -> Workflow layer -> AI -> Capacity. */
export function SystemVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const columns = [
    { x: 62, label: "Inputs" },
    { x: 196, label: "Workflow" },
    { x: 330, label: "Systems" },
    { x: 462, label: "AI layer" },
    { x: 580, label: "Capacity" },
  ];

  const rows = [72, 148, 224];

  const paths = [
    "M62 72 C 124 72, 134 148, 196 148",
    "M62 148 C 124 148, 134 148, 196 148",
    "M62 224 C 124 224, 134 148, 196 148",
    "M196 148 C 258 148, 268 72, 330 72",
    "M196 148 C 258 148, 268 224, 330 224",
    "M330 72 C 392 72, 402 148, 462 148",
    "M330 224 C 392 224, 402 148, 462 148",
    "M462 148 C 520 148, 530 148, 580 148",
  ];

  return (
    <svg
      viewBox="0 0 640 300"
      className={className}
      role="img"
      aria-label="Diagram: agency inputs move through workflows and existing systems into an AI-assisted layer that returns team capacity."
    >
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="0" y1="24" x2="640" y2="24" />
        <line x1="0" y1="272" x2="640" y2="272" />
      </g>

      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="1" />
          {!reduced && (
            <motion.circle
              r="2.6"
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 5,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="5s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
                path={d}
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </motion.circle>
          )}
        </g>
      ))}

      {columns.map((col, ci) => (
        <g key={col.label}>
          {(ci === 0 ? rows : ci === 2 ? [72, 224] : [148]).map((y) => (
            <g key={`${col.label}-${y}`}>
              <rect
                x={col.x - 11}
                y={y - 11}
                width="22"
                height="22"
                fill="var(--color-background)"
                stroke={ci >= 3 ? "var(--color-accent)" : "var(--color-foreground)"}
                strokeWidth="1"
              />
              {ci === 3 && <circle cx={col.x} cy={y} r="3.4" fill="var(--color-accent)" />}
              {ci === 4 && (
                <rect
                  x={col.x - 4}
                  y={y - 4}
                  width="8"
                  height="8"
                  fill="var(--color-accent)"
                  opacity="0.5"
                />
              )}
            </g>
          ))}
          <text
            x={col.x}
            y="262"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="10"
            letterSpacing="1.5"
            fontFamily="var(--font-mono)"
          >
            {col.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Operational reality: systems -> people and manual handoffs -> friction -> opportunity. */
export function HandoffVisual({ className }: { className?: string }) {
  const systems = ["AMS", "CRM", "Email", "Communication", "Quoting", "Internal workflows"];

  const flow = [
    { label: "People + manual handoffs", note: "Re-entry, chasing, coordination" },
    { label: "Operational friction", note: "Time absorbed between systems" },
    { label: "Opportunity for improvement", note: "Where a system may help", accent: true },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
        {systems.map((s) => (
          <div
            key={s}
            className="bg-background px-4 py-5 text-sm text-foreground"
          >
            {s}
          </div>
        ))}
      </div>

      {flow.map((f) => (
        <div key={f.label}>
          <div className="mx-auto h-8 w-px bg-border" aria-hidden="true" />
          <div
            className={`flex flex-col gap-1 border px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
              f.accent ? "border-accent bg-accent/5" : "border-border bg-surface"
            }`}
          >
            <span
              className={`text-sm font-medium ${f.accent ? "text-accent" : "text-foreground"}`}
            >
              {f.label}
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
              {f.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Existing-technology architecture: systems -> workflow layer -> AI + automation -> capacity. */
export function StackVisual({ className }: { className?: string }) {
  const systems = ["AMS", "CRM", "Email", "Communication", "Quoting", "Internal systems"];

  return (
    <div className={className}>
      <p className="font-mono text-[0.65rem] tracking-[0.18em] text-ink-muted uppercase">
        Existing systems
      </p>
      <div className="mt-4 grid grid-cols-2 gap-px border border-ink-border bg-ink-border sm:grid-cols-3">
        {systems.map((s) => (
          <div key={s} className="bg-ink px-4 py-4 text-sm text-ink-foreground">
            {s}
          </div>
        ))}
      </div>

      {[
        { label: "Workflow layer", note: "How the work actually moves" },
        { label: "AI + automation", note: "Applied only where it helps", accent: true },
        { label: "Team capacity", note: "Returned to client-facing work" },
      ].map((row) => (
        <div key={row.label}>
          <div className="mx-auto h-7 w-px bg-ink-border" aria-hidden="true" />
          <div
            className={`flex flex-col gap-1 border px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
              row.accent ? "border-ink-accent bg-ink-accent/10" : "border-ink-border"
            }`}
          >
            <span className="text-sm font-medium text-ink-foreground">{row.label}</span>
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-muted uppercase">
              {row.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
