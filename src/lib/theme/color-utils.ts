export type RGB = [number, number, number];

export function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function hexToHsl(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return rgbToHsl(r, g, b);
}

export function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(rgbA: RGB, rgbB: RGB): number {
  const lA = luminance(...rgbA) + 0.05;
  const lB = luminance(...rgbB) + 0.05;
  return lA > lB ? lA / lB : lB / lA;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");

  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

const NEAR_BLACK: RGB = [11, 11, 13];
const NEAR_WHITE: RGB = [245, 243, 238];
const PURE_BLACK: RGB = [0, 0, 0];
const PURE_WHITE: RGB = [255, 255, 255];

function bestOf(rgb: RGB, dark: RGB, light: RGB) {
  const cDark = contrastRatio(rgb, dark);
  const cLight = contrastRatio(rgb, light);

  return cDark >= cLight
    ? { color: dark, ratio: cDark }
    : { color: light, ratio: cLight };
}

export function pickForeground(rgb: RGB) {
  let pick = bestOf(rgb, NEAR_BLACK, NEAR_WHITE);

  if (pick.ratio < 4.5) pick = bestOf(rgb, PURE_BLACK, PURE_WHITE);

  return {
    hex: rgbToHex(...pick.color),
    ratio: pick.ratio,
    passesAA: pick.ratio >= 4.5,
  };
}
