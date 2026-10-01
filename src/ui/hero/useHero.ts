"use client";

import { useEffect, useRef, useState } from "react";

import { getColorValue, hslToRgb, rgbToHex } from "@/lib/theme";
import { useThemeStore } from "@/store";

type HeroTab = "random" | "history";

export const useHero = () => {
  const {
    h,
    s,
    l,
    mounted,
    history,
    randomize,
    setHex,
    setHsl,
    addToHistory,
    selectHistory,
  } = useThemeStore();

  const [activeTab, setActiveTab] = useState<HeroTab>("random");

  const [hex, setHexInput] = useState("");

  const [copied, setCopied] = useState<string | null>(null);

  const sliderStartRef = useRef<string | null>(null);
  const colorChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (!mounted) return;

    const rgb = hslToRgb(h, s, l);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHexInput(rgbToHex(...rgb));
  }, [h, s, l, mounted]);

  useEffect(() => {
    return () => {
      if (colorChangeTimeoutRef.current) {
        clearTimeout(colorChangeTimeoutRef.current);
      }
    };
  }, []);

  const handleTabChange = (tab: HeroTab) => {
    setActiveTab(tab);
  };

  const handleColorChange = (value: string) => {
    setHexInput(value);

    if (colorChangeTimeoutRef.current) {
      clearTimeout(colorChangeTimeoutRef.current);
    }

    if (!value.trim()) return;

    colorChangeTimeoutRef.current = setTimeout(() => {
      const input = value.trim();

      const hexValue = input.replace(/^#/, "");

      if (/^[0-9a-fA-F]{6}$/.test(hexValue)) {
        const nextHex = `#${hexValue}`;

        if (nextHex.toUpperCase() !== hex.toUpperCase()) {
          addToHistory(hex);
        }

        setHex(nextHex);

        return;
      }

      const colorValue = getColorValue(input);

      if (!colorValue) return;

      if (colorValue.toUpperCase() !== hex.toUpperCase()) {
        addToHistory(hex);
      }

      setHex(colorValue);
    }, 3000);
  };

  const handleHslChange = (nextH: number, nextS: number, nextL: number) => {
    setHsl(nextH, nextS, nextL);
  };

  const handleSliderStart = () => {
    if (!hex) return;

    sliderStartRef.current = hex;
  };

  const handleSliderEnd = () => {
    const previousHex = sliderStartRef.current;

    sliderStartRef.current = null;

    if (!previousHex || !hex) return;

    if (previousHex.toUpperCase() !== hex.toUpperCase()) {
      addToHistory(previousHex);
    }
  };

  const handleHistorySelect = (historyHex: string) => {
    selectHistory(historyHex);
    setActiveTab("random");
  };

  const handleCopy = async (value: string, key: string) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(key);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch {}
  };

  const rgb = hslToRgb(h, s, l);

  const values = {
    hex,
    rgba: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };

  return {
    h,
    s,
    l,
    hex,
    values,
    history,
    copied,
    mounted,
    activeTab,
    randomize,
    handleTabChange,
    handleColorChange,
    handleHslChange,
    handleSliderStart,
    handleSliderEnd,
    handleHistorySelect,
    handleCopy,
  };
};
