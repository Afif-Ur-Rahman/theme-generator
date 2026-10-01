import { ColorHex, ColorMix, ColorValues } from "./blocks";

interface ColorValuesData {
  hex: string;
  rgba: string;
  hsl: string;
}

interface ColorPreviewProps {
  h: number;
  s: number;
  l: number;
  hex: string;
  values: ColorValuesData;
  copied: string | null;
  onCopy: (value: string, key: string) => void;
  onGenerate: () => void;
  onColorChange: (value: string) => void;
  onHslChange: (h: number, s: number, l: number) => void;
  onSliderStart: () => void;
  onSliderEnd: () => void;
}

export const ColorPreview = ({
  h,
  s,
  l,
  hex,
  values,
  copied,
  onCopy,
  onGenerate,
  onColorChange,
  onHslChange,
  onSliderStart,
  onSliderEnd,
}: ColorPreviewProps) => {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-primary-200 dark:border-primary-800 md:grid-cols-[1.4fr_1fr]">
      <ColorHex hex={hex} onColorChange={onColorChange} />

      <div className="flex min-h-105 flex-col bg-primary-50 p-5 dark:bg-primary-900 md:p-6">
        <div
          onPointerDown={onSliderStart}
          onPointerUp={onSliderEnd}
          onPointerCancel={onSliderEnd}
        >
          <ColorMix h={h} s={s} l={l} onHslChange={onHslChange} />
        </div>

        <ColorValues
          values={values}
          copied={copied}
          onCopy={onCopy}
          onGenerate={onGenerate}
        />
      </div>
    </div>
  );
};
