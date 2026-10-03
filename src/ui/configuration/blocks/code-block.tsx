"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language: string;
  copyKey: string;
}

export const CodeBlock = ({ code, filename, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

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
      <div className="flex items-center justify-between border-b border-primary-800 px-4 py-2.5">
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

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex h-7 w-7 items-center justify-center rounded-md text-primary-400 transition-colors hover:bg-primary-800 hover:text-primary-50"
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
