import {
  contrastRatio,
  hslToRgb,
  luminance,
  rgbToHex,
  type RGB,
} from "./color-utils";

export const UI_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type UiStep = (typeof UI_STEPS)[number];

const TARGET_LUMINANCE: Record<UiStep, number> = {
  50: 0.92,
  100: 0.85,
  200: 0.73,
  300: 0.55,
  400: 0.31,
  500: 0.135,
  600: 0.085,
  700: 0.052,
  800: 0.027,
  900: 0.012,
  950: 0.005,
};

const UI_MAX_SATURATION = 28;

function lightnessForLuminance(h: number, s: number, target: number) {
  let lo = 0;
  let hi = 100;

  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    const [r, g, b] = hslToRgb(h, s, mid);

    if (luminance(r, g, b) < target) lo = mid;
    else hi = mid;
  }

  return (lo + hi) / 2;
}

export function generateUiScale(h: number, s: number) {
  const sat = Math.min(s, UI_MAX_SATURATION);
  const scale = {} as Record<UiStep, string>;

  UI_STEPS.forEach((step) => {
    const l = lightnessForLuminance(h, sat, TARGET_LUMINANCE[step]);

    scale[step] = rgbToHex(...hslToRgb(h, sat, l));
  });

  return scale;
}

export function accentOn(
  bg: RGB,
  h: number,
  s: number,
  l: number,
  direction: "darker" | "lighter",
  min = 4.5,
) {
  const stepSize = direction === "darker" ? -1 : 1;

  for (let current = l; current >= 0 && current <= 100; current += stepSize) {
    const rgb = hslToRgb(h, s, current);

    if (contrastRatio(rgb, bg) >= min) return rgbToHex(...rgb);
  }

  return direction === "darker" ? "#000000" : "#FFFFFF";
}
