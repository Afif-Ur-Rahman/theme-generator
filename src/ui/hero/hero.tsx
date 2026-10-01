"use client";

import { ColorPreview } from "./blocks";
import { useHero } from "./useHero";

export const Hero = () => {
  const {
    h,
    s,
    l,
    hex,
    values,
    copied,
    activeTab,
    randomize,
    handleTabChange,
    handleCopy,
    handleColorChange,
    handleHslChange,
  } = useHero();

  return (
    <section
      id="palette"
      className="relative overflow-hidden p-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl dark:text-primary-50">
            Create your perfect
            <span className="block text-primary-600 dark:text-primary-400">
              color palette.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-primary-600 sm:text-lg dark:text-primary-300">
            Generate, explore, and fine-tune colors for your next project.
            Adjust the color manually or let the generator find something
            unexpected.
          </p>
        </div>

        <div className="flex justify-center">
          <ul className="flex overflow-hidden rounded-t-lg border border-b-0 border-primary-200 text-center text-sm font-medium dark:border-primary-800">
            <li>
              <button
                type="button"
                onClick={() => handleTabChange("random")}
                className={`inline-block rounded-tl-lg rounded-tr-none px-5 py-3 transition-all duration-300 ease-in-out ${
                  activeTab === "random"
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-50"
                    : "bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-900 dark:bg-primary-900 dark:text-primary-400 dark:hover:bg-primary-800 dark:hover:text-primary-50"
                }`}
              >
                Random Color
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleTabChange("picker")}
                className={`inline-block rounded-tl-none rounded-tr-lg px-5 py-3 transition-all duration-300 ease-in-out ${
                  activeTab === "picker"
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-50"
                    : "bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-900 dark:bg-primary-900 dark:text-primary-400 dark:hover:bg-primary-800 dark:hover:text-primary-50"
                }`}
              >
                History
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        {activeTab === "random" ? (
          <ColorPreview
            h={h}
            s={s}
            l={l}
            hex={hex}
            values={values}
            copied={copied}
            onCopy={handleCopy}
            onGenerate={randomize}
            onColorChange={handleColorChange}
            onHslChange={handleHslChange}
          />
        ) : (
          <div className="flex min-h-105 items-center justify-center rounded-2xl border border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-500 dark:text-primary-400">
                History
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-primary-900 dark:text-primary-50">
                Coming Soon
              </h2>

              <p className="mt-2 text-sm text-primary-600 dark:text-primary-300">
                Pick and fine-tune your color manually.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
