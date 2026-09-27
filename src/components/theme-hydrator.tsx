"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/store";

export function ThemeHydrator() {
  const { hydrate, initializeTheme } = useThemeStore();

  useEffect(() => {
    hydrate();
    initializeTheme();
  }, [hydrate, initializeTheme]);

  return null;
}
