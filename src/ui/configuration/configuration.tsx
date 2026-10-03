"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { useThemeStore } from "@/store/theme-store";
import { ConfigurationTab, getConfigurationGuides } from "./constants";
import { ConfigurationPanel, ConfigurationTabs } from "./blocks";

export const Configuration = () => {
  const { shades } = useThemeStore();

  const [activeTab, setActiveTab] = useState<ConfigurationTab>("css");
  const [copied, setCopied] = useState(false);

  const currentColor = shades[500];
  const hex = currentColor.hex;
  const rgb = currentColor.rgb.join(", ");

  const guides = getConfigurationGuides(hex, rgb);
  const guide = guides[activeTab];

  const handleCopyHex = async () => {
    try {
      await navigator.clipboard.writeText(hex);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  };

  return (
    <section id="configuration" className="scroll-mt-16 p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-mono text-2xl uppercase tracking-[0.25em] text-primary-950 dark:text-primary-50">
            Configuration
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-600 dark:text-primary-300">
            Follow the steps below to integrate your generated color into
            popular web technologies and frameworks.
          </p>
        </div>

        {/* Current Color */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-primary-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-primary-800">
          <div className="flex items-center gap-4">
            <div
              className="h-14 w-14 shrink-0 rounded-xl border border-black/10 shadow-sm"
              style={{ backgroundColor: hex }}
            />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary-500 dark:text-primary-400">
                Current color
              </p>

              <p className="mt-1 font-mono text-sm font-semibold uppercase text-primary-950 dark:text-primary-50">
                {hex}
              </p>

              <p className="mt-1 font-mono text-xs text-primary-500 dark:text-primary-400">
                RGB {rgb}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyHex}
            className="flex items-center justify-center gap-2 rounded-lg border border-primary-200 px-3 py-2 font-mono text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:border-primary-800 dark:text-primary-200 dark:hover:bg-primary-800"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}

            {copied ? "Copied" : "Copy HEX"}
          </button>
        </div>

        {/* Tabs */}
        <ConfigurationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <ConfigurationPanel guide={guide} />
      </div>
    </section>
  );
};
