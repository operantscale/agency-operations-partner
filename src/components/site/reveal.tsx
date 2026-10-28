import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const element = ref.current;
    if (!element) {
      setVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const fallback = window.setTimeout(() => setVisible(true), 1800);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { rootMargin: "0px 0px 48px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [mounted, reduced]);

  if (reduced || !mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HeroEntrance({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (reduced || !mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
