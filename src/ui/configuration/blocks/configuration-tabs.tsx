"use client";

import { motion } from "motion/react";

import { TAB_SPRING } from "../animation";
import { CONFIGURATION_TABS, ConfigurationTab } from "../constants";

interface ConfigurationTabsProps {
  activeTab: ConfigurationTab;
  onTabChange: (tab: ConfigurationTab) => void;
}

export const ConfigurationTabs = ({
  activeTab,
  onTabChange,
}: ConfigurationTabsProps) => {
  return (
    <div className="overflow-x-auto border-b border-primary-200 dark:border-primary-800">
      <div role="tablist" className="flex min-w-max gap-1">
        {CONFIGURATION_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={[
                "relative px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary-950 dark:text-primary-50"
                  : "text-primary-500 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200",
              ].join(" ")}
            >
              {tab.label}

              {isActive && (
                <motion.span
                  layoutId="configuration-tab-underline"
                  transition={TAB_SPRING}
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
