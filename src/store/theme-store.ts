import { create } from "zustand";

import { hexToHsl } from "@/lib/theme/color-utils";
import {
  generateShades,
  SHADE_STEPS,
  type ShadeScale,
} from "@/lib/theme/generate-shades";

const DARK_MODE_STORAGE_KEY = "theme-generator-dark-mode";

function randomHsl() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 45;
  const l = Math.floor(Math.random() * 30) + 35;

  return { h, s, l };
}

function applyToDocument(scale: ShadeScale) {
  if (typeof document === "undefined") return;

  const root = document.documentElement.style;

  SHADE_STEPS.forEach((step) => {
    const shade = scale[step];

    root.setProperty(`--color-primary-${step}`, shade.hex);
    root.setProperty(`--color-primary-${step}-fg`, shade.fg.hex);
  });
}

interface ThemeState {
  h: number;
  s: number;
  l: number;
  shades: ShadeScale;

  dark: boolean;
  mounted: boolean;

  setHsl: (h: number, s: number, l: number) => void;
  setHex: (hex: string) => boolean;
  randomize: () => void;
  hydrate: () => void;

  initializeTheme: () => void;
  toggleDark: () => void;
}

const initial = {
  h: 220,
  s: 60,
  l: 50,
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  h: initial.h,
  s: initial.s,
  l: initial.l,
  shades: generateShades(initial.h, initial.s, initial.l),

  dark: false,
  mounted: false,

  setHsl: (h, s, l) => {
    const shades = generateShades(h, s, l);

    applyToDocument(shades);

    set({
      h,
      s,
      l,
      shades,
    });
  },

  setHex: (hex) => {
    const hsl = hexToHsl(hex);

    if (!hsl) return false;

    get().setHsl(hsl[0], hsl[1], hsl[2]);

    return true;
  },

  randomize: () => {
    const { h, s, l } = randomHsl();

    get().setHsl(h, s, l);
  },

  hydrate: () => {
    applyToDocument(get().shades);
  },

  initializeTheme: () => {
    if (typeof document === "undefined") return;

    let dark = document.documentElement.classList.contains("dark");

    try {
      const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);

      if (stored !== null) {
        dark = stored === "true";
      }
    } catch {}

    document.documentElement.classList.toggle("dark", dark);

    set({
      dark,
      mounted: true,
    });
  },

  toggleDark: () => {
    if (typeof document === "undefined") return;

    const next = !get().dark;

    document.documentElement.classList.toggle("dark", next);

    try {
      localStorage.setItem(DARK_MODE_STORAGE_KEY, String(next));
    } catch {}

    set({
      dark: next,
    });
  },
}));
