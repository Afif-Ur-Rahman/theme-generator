"use client";

import {
  getInstallCommand,
  PACKAGE_MANAGERS,
  type ConfigurationGuide,
  type PackageManager,
} from "../constants";
import { CodeBlock } from "./code-block";

interface ConfigurationPanelProps {
  guide: ConfigurationGuide;
  packageManager: PackageManager;
  onPackageManagerChange: (manager: PackageManager) => void;
}

export const ConfigurationPanel = ({
  guide,
  packageManager,
  onPackageManagerChange,
}: ConfigurationPanelProps) => {
  return (
    <div className="mt-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-primary-950 dark:text-primary-50">
          {guide.label}
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-600 dark:text-primary-300">
          {guide.description}
        </p>
      </div>

      {/* Requirements */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-primary-200 p-5 dark:border-primary-800">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-500 dark:text-primary-400">
            Packages
          </p>

          {guide.packages.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {guide.packages.map((pkg) => (
                <span
                  key={pkg}
                  className="rounded-md bg-primary-100 px-2.5 py-1.5 font-mono text-xs text-primary-700 dark:bg-primary-800 dark:text-primary-200"
                >
                  {pkg}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-primary-600 dark:text-primary-300">
              No packages required.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-primary-200 p-5 dark:border-primary-800">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-500 dark:text-primary-400">
            Files
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {guide.files.map((file) => (
              <span
                key={file}
                className="rounded-md bg-primary-100 px-2.5 py-1.5 font-mono text-xs text-primary-700 dark:bg-primary-800 dark:text-primary-200"
              >
                {file}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-5">
        {guide.steps.map((step, index) => (
          <div
            key={`${guide.label}-${step.title}`}
            className="rounded-2xl border border-primary-200 p-5 sm:p-6 dark:border-primary-800"
          >
            <div className="mb-5 flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 font-mono text-xs font-semibold text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className="text-sm font-semibold text-primary-950 dark:text-primary-50">
                  {step.title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-primary-600 dark:text-primary-300">
                  {step.description}
                </p>
              </div>
            </div>

            {step.install ? (
              <CodeBlock
                code={getInstallCommand(packageManager, step.install)}
                language="shell"
                tabs={PACKAGE_MANAGERS}
                activeTab={packageManager}
                onTabChange={(tab) =>
                  onPackageManagerChange(tab as PackageManager)
                }
              />
            ) : (
              <CodeBlock
                code={step.code ?? ""}
                filename={step.filename}
                language={step.language}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
