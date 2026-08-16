import { motion, useReducedMotion } from "motion/react";

/**
 * Abstract operational-system visualization:
 * People -> Processes -> Systems -> AI -> Outcomes.
 * Fine geometry, no decorative noise. Never louder than the headline.
 */
export function SystemVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const columns = [
    { x: 60, label: "People" },
    { x: 190, label: "Processes" },
    { x: 320, label: "Systems" },
    { x: 450, label: "AI" },
    { x: 570, label: "Outcomes" },
  ];

  const rows = [70, 140, 210];

  const paths = [
    "M60 70 C 120 70, 130 140, 190 140",
    "M60 140 C 120 140, 130 140, 190 140",
    "M60 210 C 120 210, 130 140, 190 140",
    "M190 140 C 250 140, 260 70, 320 70",
    "M190 140 C 250 140, 260 210, 320 210",
    "M320 70 C 380 70, 390 140, 450 140",
    "M320 210 C 380 210, 390 140, 450 140",
    "M450 140 C 510 140, 520 140, 570 140",
  ];

  return (
    <svg
      viewBox="0 0 620 280"
      className={className}
      role="img"
      aria-label="Diagram of connected operations: people and processes flow into systems, AI-assisted workflows, and operational outcomes."
    >
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="0" y1="20" x2="620" y2="20" />
        <line x1="0" y1="260" x2="620" y2="260" />
      </g>

      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="1" />
          {!reduced && (
            <motion.circle
              r="2.4"
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 5,
                delay: i * 0.55,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="5s"
                begin={`${i * 0.55}s`}
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
          {(ci === 0 ? rows : ci === 2 ? [70, 210] : [140]).map((y) => (
            <g key={`${col.label}-${y}`}>
              <rect
                x={col.x - 9}
                y={y - 9}
                width="18"
                height="18"
                fill="var(--color-background)"
                stroke={ci === 3 ? "var(--color-accent)" : "var(--color-foreground)"}
                strokeWidth="1"
              />
              {ci === 3 && <circle cx={col.x} cy={y} r="3" fill="var(--color-accent)" />}
            </g>
          ))}
          <text
            x={col.x}
            y="248"
            textAnchor="middle"
            className="eyebrow"
            fill="var(--color-muted-foreground)"
            fontSize="9"
            letterSpacing="1.4"
          >
            {col.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Systems / people / handoffs friction diagram for the operational-reality section. */
export function HandoffVisual({ className }: { className?: string }) {
  const nodes = [
    { label: "AMS", x: 40, y: 40 },
    { label: "CRM", x: 40, y: 110 },
    { label: "Email", x: 40, y: 180 },
    { label: "Quoting", x: 40, y: 250 },
  ];

  return (
    <svg
      viewBox="0 0 460 300"
      className={className}
      role="img"
      aria-label="Diagram showing agency systems connected through people, manual handoffs, follow-ups and communication."
    >
      {nodes.map((n) => (
        <g key={n.label}>
          <line
            x1={n.x + 78}
            y1={n.y}
            x2="230"
            y2="145"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <rect
            x={n.x}
            y={n.y - 14}
            width="78"
            height="28"
            fill="none"
            stroke="var(--color-foreground)"
            strokeWidth="1"
          />
          <text
            x={n.x + 39}
            y={n.y + 4}
            textAnchor="middle"
            fontSize="10"
            fill="var(--color-foreground)"
          >
            {n.label}
          </text>
        </g>
      ))}

      <circle cx="230" cy="145" r="34" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
      <text
        x="230"
        y="142"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.2"
        fill="var(--color-accent)"
      >
        MANUAL
      </text>
      <text
        x="230"
        y="154"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.2"
        fill="var(--color-accent)"
      >
        HANDOFFS
      </text>

      {[
        { label: "Follow-ups", y: 70 },
        { label: "Tasks", y: 145 },
        { label: "Communication", y: 220 },
      ].map((r) => (
        <g key={r.label}>
          <line
            x1="264"
            y1="145"
            x2="330"
            y2={r.y}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
          <text x="338" y={r.y + 4} fontSize="10" fill="var(--color-muted-foreground)">
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Conceptual architecture stack for the existing-technology section. */
export function StackVisual({ className }: { className?: string }) {
  const layers = ["AMS", "CRM", "Email", "Communication", "Internal workflows"];

  return (
    <div className={className}>
      <ul className="space-y-px">
        {layers.map((layer, i) => (
          <li
            key={layer}
            className="flex items-center justify-between border border-ink-border/70 px-5 py-4 text-sm text-ink-foreground"
            style={{ marginLeft: `${i * 10}px` }}
          >
            <span>{layer}</span>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] text-ink-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-px flex items-center justify-between border border-accent bg-accent/10 px-5 py-4 text-sm text-ink-foreground">
        <span>AI + automation layer</span>
        <span className="font-mono text-[0.65rem] tracking-[0.18em] text-ink-muted">06</span>
      </div>
    </div>
  );
}
