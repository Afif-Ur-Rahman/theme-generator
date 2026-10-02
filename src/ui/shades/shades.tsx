"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { useThemeStore } from "@/store/theme-store";
import { SHADE_STEPS } from "@/lib/theme/generate-shades";

export const Shades = () => {
  const { shades } = useThemeStore();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);

      setCopied(hex);

      window.setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch {}
  };

  return (
    <section className="px-4 scroll-mt-16 p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-mono text-2xl uppercase tracking-[0.25em] text-primary-950 dark:text-primary-50">
            Shades
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-600 dark:text-primary-300">
            Click any shade to copy the HEX color.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary-200 dark:border-primary-800">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
            {SHADE_STEPS.map((step) => {
              const shade = shades[step];
              const isCopied = copied === shade.hex;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleCopy(shade.hex)}
                  aria-label={`Copy ${shade.hex}`}
                  className="group relative min-h-32 overflow-hidden text-left transition-transform duration-200 hover:z-10 hover:scale-[1.03] focus:z-10 focus:outline-none focus:ring-none"
                  style={{
                    backgroundColor: shade.hex,
                    color: shade.fg.hex,
                  }}
                >
                  <div className="flex h-full flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="mb-1 block font-mono text-xs font-semibold">
                          {step}
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-md">
                          {isCopied ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                          )}
                        </span>
                      </div>

                      <span className="block font-mono text-[10px] uppercase tracking-wider opacity-70">
                        HEX
                      </span>

                      <span className="mt-1 block font-mono text-xs font-medium">
                        {shade.hex}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
