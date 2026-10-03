"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";

import { TAB_SPRING } from "../animation";
interface CodeBlockProps {
  code: string;
  filename?: string;
  language: string;
  tabs?: readonly string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const CodeBlock = ({
  code,
  filename,
  language,
  tabs,
  activeTab,
  onTabChange,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const tabsId = useId();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-xl border border-primary-200 bg-primary-950 dark:border-primary-800 dark:bg-primary-950">
      <div className="flex items-center justify-between gap-3 border-b border-primary-800 px-4 py-2.5">
        {tabs ? (
          <div
            role="tablist"
            aria-label="Package manager"
            className="flex items-center gap-1"
          >
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange?.(tab)}
                  className={`relative rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                    isActive
                      ? "text-primary-50"
                      : "text-primary-400 hover:text-primary-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`code-tab-${tabsId}`}
                      transition={TAB_SPRING}
                      className="absolute inset-0 rounded-md bg-primary-800"
                    />
                  )}

                  <span className="relative">{tab}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {filename && (
              <span className="font-mono text-xs text-primary-200">
                {filename}
              </span>
            )}

            <span className="font-mono text-[10px] uppercase tracking-wider text-primary-400">
              {language}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-primary-400 transition-colors hover:bg-primary-800 hover:text-primary-50"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-xs leading-6 text-primary-100">
          {code}
        </code>
      </pre>
    </div>
  );
};
