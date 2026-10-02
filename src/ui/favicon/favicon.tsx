"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/store/theme-store";

export const Favicon = () => {
  const { shades } = useThemeStore();

  const lightColor = shades[400]?.hex;
  const darkColor = shades[700]?.hex;

  useEffect(() => {
    if (!lightColor || !darkColor) {
      return;
    }

    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        <defs>
          <linearGradient
            id="gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="50%" stop-color="${lightColor}" />
            <stop offset="50%" stop-color="${darkColor}" />
          </linearGradient>
        </defs>

        <rect
          width="64"
          height="64"
          rx="16"
          fill="url(#gradient)"
        />
      </svg>
    `;

    const favicon = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    let link = document.querySelector<HTMLLinkElement>("#dynamic-favicon");

    if (!link) {
      link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.type = "image/svg+xml";
    link.href = favicon;
  }, [lightColor, darkColor]);

  return null;
};
