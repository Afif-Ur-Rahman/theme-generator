interface ColorMixProps {
  h: number;
  s: number;
  l: number;
  onHslChange: (h: number, s: number, l: number) => void;
}

export const ColorMix = ({ h, s, l, onHslChange }: ColorMixProps) => {
  const hueGradient =
    "linear-gradient(to right, hsl(0,90%,55%), hsl(60,90%,55%), hsl(120,90%,55%), hsl(180,90%,55%), hsl(240,90%,55%), hsl(300,90%,55%), hsl(360,90%,55%))";

  const satGradient = `linear-gradient(to right, hsl(${h},0%,${l}%), hsl(${h},100%,${l}%))`;

  const lightGradient = `linear-gradient(to right, hsl(${h},${s}%,0%), hsl(${h},${s}%,50%), hsl(${h},${s}%,100%))`;

  return (
    <div className="mb-6 border-b border-primary-200 pb-6 dark:border-primary-700">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-500 dark:text-primary-400">
        Mix
      </p>

      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-primary-500 dark:text-primary-400">
            <span>Hue</span>
            <span className="text-primary-900 dark:text-primary-50">{h}°</span>
          </span>

          <input
            type="range"
            min={0}
            max={360}
            value={h}
            onChange={(e) => onHslChange(Number(e.target.value), s, l)}
            className="hsl-range"
            style={{ backgroundImage: hueGradient }}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-primary-500 dark:text-primary-400">
            <span>Saturation</span>
            <span className="text-primary-900 dark:text-primary-50">{s}%</span>
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={s}
            onChange={(e) => onHslChange(h, Number(e.target.value), l)}
            className="hsl-range"
            style={{ backgroundImage: satGradient }}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-primary-500 dark:text-primary-400">
            <span>Lightness</span>
            <span className="text-primary-900 dark:text-primary-50">{l}%</span>
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={l}
            onChange={(e) => onHslChange(h, s, Number(e.target.value))}
            className="hsl-range"
            style={{ backgroundImage: lightGradient }}
          />
        </label>
      </div>
    </div>
  );
};
