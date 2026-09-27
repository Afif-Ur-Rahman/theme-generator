import { Dices } from "lucide-react";
import { ColorPicker } from "./color-picker";

interface ColorControlsProps {
  h: number;
  s: number;
  l: number;
  hex: string;
  onColorChange: (value: string) => void;
  onGenerate: () => void;
}

export const ColorControls = ({
  h,
  s,
  l,
  hex,
  onColorChange,
  onGenerate,
}: ColorControlsProps) => {
  return (
    <div className="rounded-3xl border border-primary-200 bg-white p-6 dark:border-primary-800 dark:bg-primary-950">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary-950 dark:text-primary-50">
          Customize color
        </h2>

        <p className="mt-1 text-sm text-primary-500 dark:text-primary-400">
          Pick a color or enter a HEX value.
        </p>
      </div>

      <ColorPicker h={h} s={s} l={l} hex={hex} onColorChange={onColorChange} />

      <div className="my-6 h-px bg-primary-100 dark:bg-primary-800" />

      {/* HSL values */}
      <div className="space-y-5">
        <HslValue label="Hue" value={h} suffix="°" />
        <HslValue label="Saturation" value={s} suffix="%" />
        <HslValue label="Lightness" value={l} suffix="%" />
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-900 px-4 py-3 text-sm font-semibold text-primary-50 transition hover:bg-primary-800 dark:bg-primary-100 dark:text-primary-950 dark:hover:bg-primary-200"
      >
        <Dices className="size-4" />
        Generate random color
      </button>
    </div>
  );
};

const HslValue = ({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
          {label}
        </span>

        <span className="text-sm font-semibold text-primary-950 dark:text-primary-50">
          {value}
          {suffix}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-800">
        <div
          className="h-full rounded-full bg-primary-500"
          style={{
            width: `${label === "Hue" ? (value / 360) * 100 : value}%`,
          }}
        />
      </div>
    </div>
  );
};
