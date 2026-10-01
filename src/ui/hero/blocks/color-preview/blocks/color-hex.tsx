interface ColorHexProps {
  hex: string;
  onColorChange: (value: string) => void;
}

export const ColorHex = ({ hex, onColorChange }: ColorHexProps) => {
  const color = hex || "#000000";

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
        style={{
          color: `color-mix(in srgb, ${color} 45%, white)`,
        }}
      >
        Now showing
      </span>

      <div
        className="flex items-center gap-0"
        style={{
          color: `color-mix(in srgb, ${color} 15%, white)`,
          fontSize: "clamp(2.6rem, 8vw, 5rem)",
        }}
      >
        <span className="font-medium leading-none opacity-70">#</span>

        <input
          type="text"
          value={hex.replace(/^#/, "")}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);

            onColorChange(raw);
          }}
          maxLength={6}
          placeholder="000000"
          spellCheck={false}
          className="w-full min-w-0 bg-transparent font-medium uppercase leading-none tracking-tight outline-none placeholder:opacity-40"
          style={{
            color: "inherit",
            fontSize: "inherit",
          }}
          aria-label="HEX color code"
        />
      </div>

      <span
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em]"
        style={{
          color: `color-mix(in srgb, ${color} 45%, white)`,
        }}
      >
        Paste your color code here
      </span>
    </div>
  );
};
