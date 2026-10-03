"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { FAQ_ITEMS } from "./constants";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="scroll-mt-16 p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-mono text-2xl uppercase tracking-[0.25em] text-primary-950 dark:text-primary-50">
            Frequently asked questions
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-600 dark:text-primary-300">
            Everything you need to know about generating, exploring, and
            exporting your colors.
          </p>
        </div>

        {/* Questions */}
        <div className="divide-y divide-primary-200 overflow-hidden rounded-2xl border border-primary-200 dark:divide-primary-800 dark:border-primary-800">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-primary-50 sm:px-6 dark:hover:bg-primary-800/60"
                >
                  <span className="text-sm font-medium text-primary-900 dark:text-primary-100">
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown className="h-4 w-4 shrink-0 text-primary-500 dark:text-primary-400" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6">
                        <p className="max-w-7xl text-sm leading-6 text-primary-600 dark:text-primary-300">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
