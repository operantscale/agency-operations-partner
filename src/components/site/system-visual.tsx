import { useEffect, useState } from "react";
import { ClipboardList, GitBranch, ListTodo, MessagesSquare, Repeat2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/**
 * OperantScale visual language:
 * fine 1px lines, square nodes, mono micro-labels, single blue accent,
 * left-to-right or top-down progression. No decoration for its own sake.
 */

/** Hero: work -> friction -> system -> automation -> outcome. */
export function SystemVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sysY = [56, 104, 152, 200];
  const SYS_X = 74;
  const FLOW_X = 258;
  const AI_X = 420;
  const CAP_X = 566;

  const stages = [
    { x: 40, label: "Work" },
    { x: 190, label: "Friction" },
    { x: 320, label: "System" },
    { x: 470, label: "Automation" },
    { x: 632, label: "Outcome" },
  ];

  const feed = sysY.map(
    (y) => `M${SYS_X + 13} ${y} C ${SYS_X + 90} ${y}, ${FLOW_X - 90} 128, ${FLOW_X - 16} 128`,
  );
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
      aria-label="Diagram: work moves through friction, a system, and selective automation toward a better operational outcome."
    >
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="0" y1="20" x2="640" y2="20" />
        <line x1="0" y1="248" x2="640" y2="248" />
      </g>

      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="1" />
          {mounted && !reduced && (
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

export function CapabilityFlowVisual({ className }: { className?: string }) {
  const systems = ["CRM", "Email", "Calendar", "Forms", "Messaging", "Payments"];

  return (
    <div
      className={className}
      role="img"
      aria-label="Existing systems connect through an operations layer to better workflows."
    >
      <p className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
        Existing systems
      </p>
      <div className="mt-4 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
        {systems.map((system) => (
          <div key={system} className="bg-background px-4 py-3 text-sm text-foreground">
            {system}
          </div>
        ))}
      </div>
      <div className="mx-auto h-7 w-px bg-border" aria-hidden="true" />
      <div className="border border-accent bg-accent/5 px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium text-accent">Operations layer</span>
          <span className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
            Connecting technology to the way your team works
          </span>
        </div>
      </div>
      <div className="mx-auto h-7 w-px bg-border" aria-hidden="true" />
      <div className="border border-border bg-surface px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium text-foreground">Better workflows</span>
          <span className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
            Less repetitive work. More capacity.
          </span>
        </div>
      </div>
    </div>
  );
}

/** Operational friction: familiar recurring problems between people and systems. */
export function HandoffVisual({ className }: { className?: string }) {
  const friction = [
    { label: "Manual follow-up", note: "Opportunities wait for a response", icon: Repeat2 },
    {
      label: "Repeated data entry",
      note: "The same information moves by hand",
      icon: ClipboardList,
    },
    { label: "Missed handoffs", note: "Work stalls between people", icon: GitBranch },
    {
      label: "Scattered communication",
      note: "Context lives across channels",
      icon: MessagesSquare,
    },
    {
      label: "Tasks dependent on memory",
      note: "Important work has no reliable prompt",
      icon: ListTodo,
    },
  ];

  return (
    <div className={className}>
      <div className="border-t border-border">
        {friction.map(({ label, note, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 border-b border-border py-4 sm:gap-5">
            <span className="flex size-9 shrink-0 items-center justify-center border border-accent/50 text-accent">
              <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 text-sm font-medium text-foreground">{label}</span>
            <span className="max-w-[15rem] text-right font-mono text-[0.68rem] leading-relaxed tracking-[0.12em] text-muted-foreground uppercase">
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Existing-technology architecture: existing stack -> operations layer -> better workflows. */
export function StackVisual({ className }: { className?: string }) {
  const systems = [
    "CRM",
    "Email",
    "Calendar",
    "Forms",
    "Messaging",
    "Payments",
    "Documents",
    "Internal tools",
    "Scheduling",
  ];

  return (
    <div className={className}>
      <p className="font-mono text-[0.65rem] tracking-[0.18em] text-ink-muted uppercase">
        Your existing stack
      </p>
      <div className="mt-4 grid grid-cols-2 gap-px border border-ink-border bg-ink-border sm:grid-cols-3">
        {systems.map((s) => (
          <div key={s} className="bg-ink px-4 py-4 text-sm text-ink-foreground">
            {s}
          </div>
        ))}
      </div>

      {[
        { label: "Operations layer", note: "OperantScale connects the stack", accent: true },
        { label: "Better workflows", note: "Reliable work around your stack" },
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
