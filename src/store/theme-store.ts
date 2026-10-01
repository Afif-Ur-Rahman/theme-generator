import { create } from "zustand";

import { hexToHsl, hslToRgb, rgbToHex } from "@/lib/theme";
import {
  generateShades,
  SHADE_STEPS,
  type ShadeScale,
} from "@/lib/theme/generate-shades";

const DARK_MODE_STORAGE_KEY = "theme-generator-dark-mode";
const COLOR_HISTORY_STORAGE_KEY = "theme-generator-color-history";

const MAX_HISTORY = 10;

function randomHsl() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 45;
  const l = Math.floor(Math.random() * 30) + 35;

  return { h, s, l };
}

function getHexFromHsl(h: number, s: number, l: number) {
  return rgbToHex(...hslToRgb(h, s, l));
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

  history: string[];

  dark: boolean;
  mounted: boolean;

  setHsl: (h: number, s: number, l: number) => void;
  setHex: (hex: string) => boolean;

  addToHistory: (hex: string) => void;
  selectHistory: (hex: string) => void;

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

  history: [],

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

  addToHistory: (hex) => {
    if (!hex) return;

    const normalized = hex.toUpperCase();

    set((state) => {
      const history = [
        normalized,
        ...state.history.filter((item) => item.toUpperCase() !== normalized),
      ].slice(0, MAX_HISTORY);

      try {
        localStorage.setItem(
          COLOR_HISTORY_STORAGE_KEY,
          JSON.stringify(history),
        );
      } catch {}

      return {
        history,
      };
    });
  },

  selectHistory: (hex) => {
    const currentHex = getHexFromHsl(get().h, get().s, get().l);

    if (currentHex.toUpperCase() !== hex.toUpperCase()) {
      get().addToHistory(currentHex);
    }

    get().setHex(hex);
  },

  randomize: () => {
    const currentHex = getHexFromHsl(get().h, get().s, get().l);

    get().addToHistory(currentHex);

    const { h, s, l } = randomHsl();

    get().setHsl(h, s, l);
  },

  hydrate: () => {
    applyToDocument(get().shades);

    try {
      const stored = localStorage.getItem(COLOR_HISTORY_STORAGE_KEY);

      if (!stored) return;

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) return;

      const history = parsed
        .filter(
          (item): item is string =>
            typeof item === "string" && /^#[0-9A-Fa-f]{6}$/.test(item),
        )
        .map((item) => item.toUpperCase())
        .filter((item, index, array) => array.indexOf(item) === index)
        .slice(0, MAX_HISTORY);

      set({ history });
    } catch {}
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
