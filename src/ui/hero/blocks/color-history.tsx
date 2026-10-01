import type { MouseEvent } from "react";

interface ColorHistoryProps {
  history: string[];
  onSelect: (hex: string) => void;
}

export const ColorHistory = ({ history, onSelect }: ColorHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="flex min-h-105 items-center justify-center rounded-2xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-900">
        <div className="max-w-sm text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-500 dark:text-primary-400">
            History
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-primary-900 dark:text-primary-50">
            No colors yet
          </h2>

          <p className="mt-2 text-sm leading-6 text-primary-600 dark:text-primary-300">
            Colors you move away from will appear here.
          </p>
        </div>
      </div>
    );
  }

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    onSelect(event.currentTarget.dataset.color ?? "");
  };

  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5 dark:border-primary-800 dark:bg-primary-900 md:p-6">
      <div className="mb-6">
        <p className="text-sm text-primary-600 dark:text-primary-300">
          Select any color to apply it again.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {history.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            data-color={color}
            onClick={handleSelect}
            title={color}
            aria-label={`Use color ${color}`}
            className="group overflow-hidden rounded-xl border border-primary-200 bg-primary-100 text-left transition-transform duration-200 hover:-translate-y-0.5 dark:border-primary-700 dark:bg-primary-800"
          >
            <div className="h-40 w-full" style={{ backgroundColor: color }} />

            <div className="px-3 py-2.5">
              <span className="font-mono text-xs uppercase text-primary-700 dark:text-primary-200">
                {color}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
