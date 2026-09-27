import { hslToRgb, rgbToHex, pickForeground, type RGB } from "./color-utils";

export const SHADE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type ShadeStep = (typeof SHADE_STEPS)[number];

export interface Shade {
  step: ShadeStep;
  h: number;
  s: number;
  l: number;
  hex: string;
  rgb: RGB;
  fg: {
    hex: string;
    ratio: number;
    passesAA: boolean;
  };
}

export type ShadeScale = Record<ShadeStep, Shade>;

const LIGHTEST_L = 97;
const DARKEST_L = 10;

const BASE_STEP_INDEX = SHADE_STEPS.indexOf(500);

export function generateShades(h: number, s: number, l: number): ShadeScale {
  const scale = {} as ShadeScale;

  SHADE_STEPS.forEach((step, index) => {
    let lightness: number;

    if (index === BASE_STEP_INDEX) {
      lightness = l;
    } else if (index < BASE_STEP_INDEX) {
      const t = index / BASE_STEP_INDEX;

      lightness = LIGHTEST_L + (l - LIGHTEST_L) * t;
    } else {
      const t =
        (index - BASE_STEP_INDEX) / (SHADE_STEPS.length - 1 - BASE_STEP_INDEX);

      lightness = l + (DARKEST_L - l) * t;
    }

    const shadeL = Math.round(Math.max(0, Math.min(100, lightness)));

    const rgb = hslToRgb(h, s, shadeL);
    const hex = rgbToHex(...rgb);

    scale[step] = {
      step,
      h,
      s,
      l: shadeL,
      hex,
      rgb,
      fg: pickForeground(rgb),
    };
  });

  return scale;
}
