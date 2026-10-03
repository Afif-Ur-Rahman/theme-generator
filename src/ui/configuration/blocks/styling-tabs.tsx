"use client";

import { motion } from "motion/react";

import { TAB_SPRING } from "../animation";
import { STYLING_OPTIONS, type StylingOption } from "../constants";

interface StylingTabsProps {
  activeStyling: StylingOption;
  onStylingChange: (styling: StylingOption) => void;
}

export const StylingTabs = ({
  activeStyling,
  onStylingChange,
}: StylingTabsProps) => {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-500 dark:text-primary-400">
        Styling
      </span>

      <div
        role="tablist"
        aria-label="Styling method"
        className="inline-flex gap-1 rounded-xl border border-primary-200 bg-primary-50 p-1 dark:border-primary-800 dark:bg-primary-950"
      >
        {STYLING_OPTIONS.map((option) => {
          const isActive = activeStyling === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onStylingChange(option.id)}
              className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary-950 dark:text-primary-50"
                  : "text-primary-600 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="styling-pill"
                  transition={TAB_SPRING}
                  className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-primary-800"
                />
              )}

              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
