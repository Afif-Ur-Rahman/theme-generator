import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeHydrator } from "@/components/theme-hydrator";

import "./globals.css";
import { Favicon } from "@/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Theme Generator",
  description:
    "Generate a color, fine-tune it, explore its shade scale and export it to CSS, React, Next.js, Tailwind and Bootstrap.",
};

const themeInitScript = `
try {
  var stored = localStorage.getItem("theme-generator-dark-mode");
  var dark = stored === null
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : stored === "true";
  document.documentElement.classList.toggle("dark", dark);
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-primary-900 dark:bg-primary-900 dark:text-primary-50">
        <Favicon />
        <ThemeHydrator />
        {children}
      </body>
    </html>
  );
}
