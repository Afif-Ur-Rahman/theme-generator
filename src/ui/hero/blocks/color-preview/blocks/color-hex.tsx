import { getContrastColor } from "@/lib";

interface ColorHexProps {
  hex: string;
  onColorChange: (value: string) => void;
}

export const ColorHex = ({ hex, onColorChange }: ColorHexProps) => {
  const color = hex || "#000000";
  const textColor = getContrastColor(color);

  return (
    <div
      className="flex min-h-105 flex-col justify-end overflow-hidden p-6 md:p-10"
      style={{
        background: color,
        transition: "background 0.15s ease",
      }}
    >
      <span
        className="mb-2 font-mono text-xs uppercase tracking-widest"
        style={{ color: textColor }}
      >
        Now showing
      </span>

      <div
        className="flex items-center gap-0"
        style={{
          color: textColor,
          fontSize: "clamp(2.6rem, 8vw, 5rem)",
        }}
      >
        <span className="font-medium leading-none opacity-70">#</span>

        <input
          type="text"
          value={hex.replace(/^#/, "")}
          onChange={(e) => onColorChange(e.target.value)}
          placeholder="000000"
          spellCheck={false}
          className="w-full min-w-0 bg-transparent font-medium uppercase leading-none tracking-tight outline-none placeholder:opacity-40"
          style={{
            color: "inherit",
            fontSize: "inherit",
          }}
          aria-label="Color name or HEX color code"
        />
      </div>

      <span
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em]"
        style={{ color: textColor }}
      >
        Enter a color name or HEX color code
      </span>
    </div>
  );
};
