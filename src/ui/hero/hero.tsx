"use client";

import { ColorHistory, ColorPreview } from "./blocks";
import { useHero } from "./useHero";

export const Hero = () => {
  const {
    h,
    s,
    l,
    hex,
    values,
    history,
    copied,
    activeTab,
    randomize,
    handleTabChange,
    handleCopy,
    handleColorChange,
    handleHslChange,
    handleSliderStart,
    handleSliderEnd,
    handleHistorySelect,
  } = useHero();

  return (
    <section
      id="palette"
      className="relative scroll-mt-16 overflow-hidden p-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl dark:text-primary-50">
            Create your perfect
            <span className="block text-accent ">color palette.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-accent sm:text-lg dark:text-primary-300">
            Generate, explore, and fine-tune colors for your next project.
            Adjust the color manually or let the generator find something
            unexpected.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <ul className="flex overflow-hidden rounded-t-lg border border-b-0 border-primary-200 text-center text-sm font-medium dark:border-primary-800">
            <li>
              <button
                type="button"
                onClick={() => handleTabChange("random")}
                className={`inline-block rounded-tl-lg rounded-tr-none px-5 py-3 transition-all duration-300 ease-in-out ${
                  activeTab === "random"
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-50"
                    : "bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-900 dark:bg-primary-900  dark:hover:bg-primary-800 dark:hover:text-primary-50"
                }`}
              >
                Random Color
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleTabChange("history")}
                className={`inline-block rounded-tl-none rounded-tr-lg px-5 py-3 transition-all duration-300 ease-in-out ${
                  activeTab === "history"
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-50"
                    : "bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-900 dark:bg-primary-900  dark:hover:bg-primary-800 dark:hover:text-primary-50"
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
            onSliderStart={handleSliderStart}
            onSliderEnd={handleSliderEnd}
          />
        ) : (
          <ColorHistory history={history} onSelect={handleHistorySelect} />
        )}
      </div>
    </section>
  );
};
