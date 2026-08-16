import { motion, useReducedMotion } from "motion/react";

/**
 * OperantScale visual language:
 * fine 1px lines, square nodes, mono micro-labels, single blue accent,
 * left-to-right or top-down progression. No decoration for its own sake.
 */

/** Hero: existing systems -> workflow layer -> AI + automation -> team capacity. */
export function SystemVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const sysY = [56, 104, 152, 200];
  const SYS_X = 74;
  const FLOW_X = 258;
  const AI_X = 420;
  const CAP_X = 566;

  const stages = [
    { x: 40, label: "Systems" },
    { x: FLOW_X, label: "Workflow layer" },
    { x: AI_X, label: "AI + automation" },
    { x: 632, label: "Capacity" },
  ];

  const feed = sysY.map((y) => `M${SYS_X + 13} ${y} C ${SYS_X + 90} ${y}, ${FLOW_X - 90} 128, ${FLOW_X - 16} 128`);
  const mid = [
    `M${FLOW_X + 16} 128 C ${FLOW_X + 70} 128, ${AI_X - 70} 96, ${AI_X - 14} 96`,
    `M${FLOW_X + 16} 128 C ${FLOW_X + 70} 128, ${AI_X - 70} 160, ${AI_X - 14} 160`,
  ];
  const out = [
    `M${AI_X + 14} 96 C ${AI_X + 60} 96, ${CAP_X - 60} 128, ${CAP_X - 14} 128`,
    `M${AI_X + 14} 160 C ${AI_X + 60} 160, ${CAP_X - 60} 128, ${CAP_X - 14} 128`,
  ];
  const paths = [...feed, ...mid, ...out];

  return (
    <svg
      viewBox="0 0 640 280"
      className={className}
      role="img"
      aria-label="Diagram: existing agency systems feed a workflow layer, where AI and automation are applied selectively, returning capacity to the team."
    >
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="0" y1="20" x2="640" y2="20" />
        <line x1="0" y1="248" x2="640" y2="248" />
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
                delay: i * 0.45,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="5s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                path={d}
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </motion.circle>
          )}
        </g>
      ))}

      {/* existing systems */}
      {sysY.map((y) => (
        <rect
          key={y}
          x={SYS_X - 13}
          y={y - 9}
          width="26"
          height="18"
          fill="var(--color-background)"
          stroke="var(--color-foreground)"
          strokeWidth="1"
        />
      ))}

      {/* workflow layer */}
      <rect
        x={FLOW_X - 16}
        y="72"
        width="32"
        height="112"
        fill="var(--color-background)"
        stroke="var(--color-foreground)"
        strokeWidth="1"
      />
      {[92, 128, 164].map((y) => (
        <line
          key={y}
          x1={FLOW_X - 16}
          y1={y}
          x2={FLOW_X + 16}
          y2={y}
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}

      {/* AI + automation */}
      {[96, 160].map((y) => (
        <g key={y}>
          <rect
            x={AI_X - 14}
            y={y - 14}
            width="28"
            height="28"
            fill="var(--color-background)"
            stroke="var(--color-accent)"
            strokeWidth="1"
          />
          <circle cx={AI_X} cy={y} r="3.6" fill="var(--color-accent)" />
        </g>
      ))}

      {/* team capacity */}
      <rect
        x={CAP_X - 14}
        y="114"
        width="28"
        height="28"
        fill="color-mix(in oklab, var(--color-accent) 12%, transparent)"
        stroke="var(--color-accent)"
        strokeWidth="1"
      />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={CAP_X + 26}
          y1={116 + i * 12}
          x2={CAP_X + 26 + (i === 1 ? 40 : 26)}
          y2={116 + i * 12}
          stroke="var(--color-accent)"
          strokeWidth="1"
          opacity={i === 1 ? 0.8 : 0.4}
        />
      ))}

      {stages.map((s, i) => (
        <text
          key={s.label}
          x={s.x}
          y="238"
          textAnchor={i === 0 ? "start" : i === stages.length - 1 ? "end" : "middle"}
          fill="var(--color-muted-foreground)"
          fontSize="10"
          letterSpacing="1.2"
          fontFamily="var(--font-mono)"
        >
          {s.label.toUpperCase()}
        </text>
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
