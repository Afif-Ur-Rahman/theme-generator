"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import { useThemeStore } from "@/store/theme-store";

const NAV_LINKS = [
  { label: "Palette", href: "#palette" },
  { label: "Export", href: "#export" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#palette");

  const { dark, mounted, toggleDark } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      let currentSection = "#palette";

      NAV_LINKS.forEach(({ href }) => {
        const section = document.querySelector(href);

        if (
          section instanceof HTMLElement &&
          section.offsetTop <= scrollPosition
        ) {
          currentSection = href;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setOpen(false);
  };

  const showDark = mounted && dark;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary-200 bg-primary-50/90 backdrop-blur dark:border-primary-800 dark:bg-primary-900/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="block h-6 w-6 rounded-md"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-primary-400) 50%, var(--color-primary-700) 50%)",
              }}
            />

            <span className="text-base font-semibold tracking-tight text-primary-900 dark:text-primary-50">
              Theme Generator
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-900 dark:text-primary-50"
                      : "text-primary-700 hover:bg-primary-100 hover:text-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 dark:hover:text-primary-50"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 origin-left rounded-full bg-primary-600 transition-transform duration-300 ease-out dark:bg-primary-400 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex">
            <button
              type="button"
              onClick={toggleDark}
              aria-label={
                showDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              {showDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={toggleDark}
              aria-label={
                showDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              {showDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-primary-50 shadow-xl transition-transform duration-300 dark:bg-primary-900 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between border-b border-primary-200 px-6 dark:border-primary-800">
            <span className="text-base font-semibold tracking-tight text-primary-900 dark:text-primary-50">
              Theme Generator
            </span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-1 px-4 py-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`group relative rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "text-primary-900 dark:text-primary-50"
                      : "text-primary-800 hover:bg-primary-100 hover:text-primary-900 dark:text-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-50"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 origin-left rounded-full bg-primary-600 transition-transform duration-300 ease-out dark:bg-primary-400 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
