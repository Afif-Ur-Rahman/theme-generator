"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EASE } from "../animation";

interface AnimatedHeightProps {
  children: ReactNode;
}

export const AnimatedHeight = ({ children }: AnimatedHeightProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = contentRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const next =
        entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;

      // Ignore the empty frame between an exit and the next enter
      if (next > 0) setHeight(next);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }
      }
      style={{ overflow: "hidden" }}
    >
      <div ref={contentRef} className="flow-root">
        {children}
      </div>
    </motion.div>
  );
};
