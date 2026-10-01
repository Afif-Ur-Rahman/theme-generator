import { ColorHex, ColorMix, ColorValues } from "./blocks";

interface ColorValues {
  hex: string;
  rgba: string;
  hsl: string;
}

interface ColorPreviewProps {
  h: number;
  s: number;
  l: number;
  hex: string;
  values: ColorValues;
  copied: string | null;
  onCopy: (value: string, key: string) => void;
  onGenerate: () => void;
  onColorChange: (value: string) => void;
  onHslChange: (h: number, s: number, l: number) => void;
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
}: ColorPreviewProps) => {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-primary-200 dark:border-primary-800 md:grid-cols-[1.4fr_1fr]">
      <ColorHex hex={hex} onColorChange={onColorChange} />

      <div className="flex min-h-105 flex-col bg-primary-50 p-5 dark:bg-primary-900 md:p-6">
        <ColorMix h={h} s={s} l={l} onHslChange={onHslChange} />

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
