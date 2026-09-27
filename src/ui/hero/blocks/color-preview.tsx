import { Check, Copy } from "lucide-react";

const FIELDS = [
  { key: "hex", label: "HEX" },
  { key: "rgba", label: "RGB" },
  { key: "hsl", label: "HSL" },
] as const;

interface ColorValues {
  hex: string;
  rgba: string;
  hsl: string;
}

interface ColorPreviewProps {
  hex: string;
  values: ColorValues;
  copied: string | null;
  onCopy: (value: string, key: string) => void;
  onGenerate: () => void;
}

export const ColorPreview = ({
  hex,
  values,
  copied,
  onCopy,
  onGenerate,
}: ColorPreviewProps) => {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-primary-200 dark:border-primary-800 md:grid-cols-[1.4fr_1fr]">
      {/* Paint chip card */}
      <div
        key={hex}
        className="flex min-h-105 flex-col justify-end overflow-hidden p-6 md:p-10"
        style={{
          background: hex,
          transition: "background 0.15s ease",
        }}
      >
        <span
          className="mb-2 font-mono text-xs uppercase tracking-widest"
          style={{
            color: `color-mix(in srgb, ${hex} 45%, white)`,
          }}
        >
          Now showing
        </span>

        <span
          className="font-medium leading-none"
          style={{
            color: `color-mix(in srgb, ${hex} 15%, white)`,
            fontSize: "clamp(2.6rem, 8vw, 5rem)",
          }}
        >
          {hex}
        </span>
      </div>

      {/* Values */}
      <div className="flex min-h-105 flex-col bg-primary-50 p-5 dark:bg-primary-900 md:p-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-500 dark:text-primary-400">
          Values
        </p>

        <div className="flex flex-col gap-3">
          {FIELDS.map((field) => (
            <button
              key={field.key}
              type="button"
              onClick={() => onCopy(values[field.key], field.key)}
              className="group flex items-center justify-between rounded-xl border border-primary-200 bg-white px-4 py-3 text-left transition-colors hover:border-primary-300 hover:bg-primary-100 dark:border-primary-700 dark:bg-primary-800 dark:hover:border-primary-600 dark:hover:bg-primary-700"
            >
              <span>
                <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-widest text-primary-500 dark:text-primary-300">
                  {field.label}
                </span>

                <span className="font-mono text-sm text-primary-900 dark:text-primary-50">
                  {values[field.key]}
                </span>
              </span>

              {copied === field.key ? (
                <Check
                  size={16}
                  className="text-primary-700 dark:text-primary-200"
                />
              ) : (
                <Copy
                  size={16}
                  className="text-primary-400 opacity-60 transition-opacity group-hover:opacity-100 dark:text-primary-300"
                />
              )}
            </button>
          ))}
        </div>

        {/* Generate */}
        <button
          type="button"
          onClick={onGenerate}
          className="mt-auto w-full rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-primary-500-fg transition-colors"
        >
          Generate Random Color
        </button>
      </div>
    </div>
  );
};
