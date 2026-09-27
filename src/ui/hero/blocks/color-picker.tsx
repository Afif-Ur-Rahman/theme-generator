import { Pipette } from "lucide-react";

interface ColorPickerProps {
  h: number;
  s: number;
  l: number;
  hex: string;
  onColorChange: (value: string) => void;
}

export const ColorPicker = ({
  h,
  s,
  l,
  hex,
  onColorChange,
}: ColorPickerProps) => {
  return (
    <div className="space-y-5">
      {/* Native picker */}
      <div>
        <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-300">
          Color picker
        </label>

        <div className="relative">
          <input
            type="color"
            value={hex || "#000000"}
            onChange={(event) => onColorChange(event.target.value)}
            className="h-20 w-full cursor-pointer rounded-2xl border border-primary-200 bg-transparent p-1 dark:border-primary-800"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Pipette className="size-4" />
              Pick a color
            </div>
          </div>
        </div>
      </div>

      {/* HEX */}
      <div>
        <label
          htmlFor="hex-color"
          className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-300"
        >
          HEX
        </label>

        <div className="flex items-center rounded-xl border border-primary-200 bg-primary-50 px-3 focus-within:border-primary-500 dark:border-primary-800 dark:bg-primary-900">
          <span className="text-primary-400">#</span>

          <input
            id="hex-color"
            value={hex.replace("#", "")}
            onChange={(event) => onColorChange(event.target.value)}
            maxLength={6}
            placeholder="000000"
            className="w-full bg-transparent px-2 py-3 text-sm font-medium uppercase tracking-wider text-primary-950 outline-none placeholder:text-primary-400 dark:text-primary-50"
          />
        </div>
      </div>
    </div>
  );
};
