import { Check, Copy } from "lucide-react";

const FIELDS = [
  { key: "hex", label: "HEX" },
  { key: "rgba", label: "RGB" },
  { key: "hsl", label: "HSL" },
] as const;

interface ColorValuesData {
  hex: string;
  rgba: string;
  hsl: string;
}

interface ColorValuesProps {
  values: ColorValuesData;
  copied: string | null;
  onCopy: (value: string, key: string) => void;
  onGenerate: () => void;
}

export const ColorValues = ({
  values,
  copied,
  onCopy,
  onGenerate,
}: ColorValuesProps) => {
  return (
    <>
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

      <button
        type="button"
        onClick={onGenerate}
        className="mt-4 w-full rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-primary-500-fg transition-colors hover:opacity-90"
      >
        Generate Random Color
      </button>
    </>
  );
};
