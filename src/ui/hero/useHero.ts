"use client";

import { useEffect, useState } from "react";

import { hslToRgb, rgbToHex } from "@/lib/theme";
import { useThemeStore } from "@/store";

type HeroTab = "random" | "picker";

export const useHero = () => {
  const { h, s, l, mounted, randomize, setHex } = useThemeStore();

  const [activeTab, setActiveTab] = useState<HeroTab>("random");
  const [hex, setHexInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const rgb = hslToRgb(h, s, l);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHexInput(rgbToHex(...rgb));
  }, [h, s, l, mounted]);

  const handleTabChange = (tab: HeroTab) => {
    setActiveTab(tab);
  };

  const handleColorChange = (value: string) => {
    setHexInput(value);

    const normalized = value.startsWith("#") ? value : `#${value}`;

    if (/^#[0-9A-Fa-f]{6}$/.test(normalized)) {
      setHex(normalized);
    }
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
    copied,
    mounted,
    activeTab,
    randomize,
    handleTabChange,
    handleColorChange,
    handleCopy,
  };
};
