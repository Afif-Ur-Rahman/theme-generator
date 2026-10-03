"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { FAQ_ITEMS } from "./constants";

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}).replace(/</g, "\\u003c");

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-primary-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-primary-800"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-mono text-2xl uppercase tracking-[0.25em] text-primary-950 dark:text-primary-50">
            Frequently asked questions
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-600 dark:text-primary-300">
            Answers about the color palette generator, shade scale, dark mode,
            and exporting your color to React, Next.js, Tailwind CSS and
            Bootstrap.
          </p>
        </div>

        {/* Questions */}
        <div className="divide-y divide-primary-200 overflow-hidden rounded-2xl border border-primary-200 bg-white dark:divide-primary-700 dark:border-primary-700 dark:bg-primary-900">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`transition-colors duration-300 ${
                  isOpen ? "bg-primary-100 dark:bg-primary-800" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors sm:px-6 ${
                    isOpen
                      ? ""
                      : "hover:bg-primary-50 dark:hover:bg-primary-800/50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isOpen
                        ? "text-primary-950 dark:text-primary-50"
                        : "text-primary-900 dark:text-primary-100"
                    }`}
                  >
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
                      <div className="p-5 sm:px-6">
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
