import type { ShadeScale } from "@/lib/theme/generate-shades";

export const CONFIGURATION_TABS = [
  { id: "css", label: "HTML / CSS" },
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
] as const;

export const STYLING_OPTIONS = [
  { id: "css", label: "Plain CSS" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap" },
] as const;

export const PACKAGE_MANAGERS = ["npm", "Yarn", "pnpm", "Bun"] as const;

export type ConfigurationTab = (typeof CONFIGURATION_TABS)[number]["id"];
export type StylingOption = (typeof STYLING_OPTIONS)[number]["id"];
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export interface ConfigurationStep {
  title: string;
  description: string;
  /** Package names. When set, the step renders install commands as tabs. */
  install?: string;
  code?: string;
  filename?: string;
  language: string;
}

export interface ConfigurationGuide {
  label: string;
  description: string;
  packages: string[];
  files: string[];
  steps: ConfigurationStep[];
}

export const getInstallCommand = (
  manager: PackageManager,
  packages: string,
) => {
  switch (manager) {
    case "npm":
      return `npm install ${packages}`;
    case "Yarn":
      return `yarn add ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    case "Bun":
      return `bun add ${packages}`;
  }
};

/* -------------------------------- colors -------------------------------- */

interface GuideColors {
  hex: string;
  rgb: string;
  fg: string;
  hover: string;
  hoverFg: string;
  active: string;
  activeFg: string;
}

const getColors = (shades: ShadeScale): GuideColors => ({
  hex: shades[500].hex,
  rgb: shades[500].rgb.join(", "),
  fg: shades[500].fg.hex,
  hover: shades[600].hex,
  hoverFg: shades[600].fg.hex,
  active: shades[700].hex,
  activeFg: shades[700].fg.hex,
});

/* ------------------------------- snippets -------------------------------- */

const cssVariables = (c: GuideColors) => `:root {
  --color-primary: ${c.hex};
  --color-primary-foreground: ${c.fg};
  --color-primary-hover: ${c.hover};
  --color-primary-hover-foreground: ${c.hoverFg};
}`;

const cssButton = `.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  color: var(--color-primary-hover-foreground);
}`;

const tailwindTheme = (c: GuideColors) => `@import "tailwindcss";

@theme {
  --color-primary: ${c.hex};
  --color-primary-foreground: ${c.fg};
  --color-primary-hover: ${c.hover};
  --color-primary-hover-foreground: ${c.hoverFg};
}`;

const bootstrapOverride = (c: GuideColors) => `:root {
  --bs-primary: ${c.hex};
  --bs-primary-rgb: ${c.rgb};
}

.btn-primary {
  --bs-btn-color: ${c.fg};
  --bs-btn-bg: ${c.hex};
  --bs-btn-border-color: ${c.hex};
  --bs-btn-hover-color: ${c.hoverFg};
  --bs-btn-hover-bg: ${c.hover};
  --bs-btn-hover-border-color: ${c.hover};
  --bs-btn-active-color: ${c.activeFg};
  --bs-btn-active-bg: ${c.active};
  --bs-btn-active-border-color: ${c.active};
  --bs-btn-focus-shadow-rgb: ${c.rgb};
  --bs-btn-disabled-color: ${c.fg};
  --bs-btn-disabled-bg: ${c.hex};
  --bs-btn-disabled-border-color: ${c.hex};
}`;

const component = (name: string, className: string) => `const ${name} = () => {
  return (
    <button className="${className}">
      Primary Button
    </button>
  );
};

export default ${name};`;

/* -------------------------------- guides -------------------------------- */

interface Target {
  label: string;
  cssFile: string;
  componentFile: string;
  componentName: string;
  isNext: boolean;
}

const TARGETS: Record<Exclude<ConfigurationTab, "css">, Target> = {
  react: {
    label: "React",
    cssFile: "src/index.css",
    componentFile: "src/App.tsx",
    componentName: "App",
    isNext: false,
  },
  next: {
    label: "Next.js",
    cssFile: "app/globals.css",
    componentFile: "app/page.tsx",
    componentName: "Page",
    isNext: true,
  },
};

const getHtmlCssGuide = (c: GuideColors): ConfigurationGuide => ({
  label: "HTML / CSS",
  description:
    "Add your generated color to a standard HTML and CSS project using reusable custom properties.",
  packages: [],
  files: ["styles.css"],
  steps: [
    {
      title: "Add the color",
      description:
        "Create CSS custom properties for the color and a readable text color that goes with it.",
      language: "css",
      filename: "styles.css",
      code: cssVariables(c),
    },
    {
      title: "Use the color",
      description:
        "Reference the custom properties anywhere you need the generated color.",
      language: "css",
      filename: "styles.css",
      code: cssButton,
    },
  ],
});

const getPlainCssGuide = (t: Target, c: GuideColors): ConfigurationGuide => ({
  label: `${t.label} with plain CSS`,
  description: `Use the generated color in a ${t.label} application through your global stylesheet.`,
  packages: [],
  files: [t.cssFile, t.componentFile],
  steps: [
    {
      title: "Add the color",
      description:
        "Define the generated color and its readable text color as CSS custom properties in your global stylesheet.",
      language: "css",
      filename: t.cssFile,
      code: cssVariables(c),
    },
    {
      title: "Create a button style",
      description: "Build a reusable class on top of the custom properties.",
      language: "css",
      filename: t.cssFile,
      code: cssButton,
    },
    {
      title: "Use the color",
      description: `Apply the class from your ${t.label} component.`,
      language: "tsx",
      filename: t.componentFile,
      code: component(t.componentName, "btn-primary"),
    },
  ],
});

const getTailwindGuide = (t: Target, c: GuideColors): ConfigurationGuide => {
  const packages = t.isNext
    ? ["tailwindcss", "@tailwindcss/postcss", "postcss"]
    : ["tailwindcss", "@tailwindcss/vite"];

  return {
    label: `${t.label} with Tailwind CSS`,
    description: `Add Tailwind CSS v4 to a ${t.label} project and register your generated color as a theme color.`,
    packages,
    files: [
      t.isNext ? "postcss.config.mjs" : "vite.config.ts",
      t.cssFile,
      t.componentFile,
    ],
    steps: [
      {
        title: "Install Tailwind CSS",
        description:
          "Skip this step if Tailwind CSS is already set up in your project.",
        language: "shell",
        install: packages.join(" "),
      },
      t.isNext
        ? {
            title: "Configure PostCSS",
            description:
              "Add the Tailwind PostCSS plugin to your Next.js project.",
            language: "js",
            filename: "postcss.config.mjs",
            code: `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`,
          }
        : {
            title: "Add the Vite plugin",
            description:
              "Register the Tailwind CSS plugin in your Vite configuration.",
            language: "ts",
            filename: "vite.config.ts",
            code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
          },
      {
        title: "Add the color",
        description:
          "Import Tailwind CSS and register the generated color, along with readable text colors, in your theme.",
        language: "css",
        filename: t.cssFile,
        code: tailwindTheme(c),
      },
      {
        title: "Use the color",
        description:
          "Use the generated color through Tailwind's utility classes.",
        language: "tsx",
        filename: t.componentFile,
        code: component(
          t.componentName,
          "rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover hover:text-primary-hover-foreground",
        ),
      },
    ],
  };
};

const getBootstrapGuide = (t: Target, c: GuideColors): ConfigurationGuide => ({
  label: `${t.label} with Bootstrap`,
  description: `Install Bootstrap in a ${t.label} project and connect your generated color to Bootstrap's primary color.`,
  packages: ["bootstrap"],
  files: [
    t.isNext ? "app/layout.tsx" : "src/main.tsx",
    t.cssFile,
    t.componentFile,
  ],
  steps: [
    {
      title: "Install Bootstrap",
      description:
        "Skip this step if Bootstrap is already installed in your project.",
      language: "shell",
      install: "bootstrap",
    },
    {
      title: "Import Bootstrap",
      description:
        "Import Bootstrap before your own stylesheet so your overrides take precedence.",
      language: "tsx",
      filename: t.isNext ? "app/layout.tsx" : "src/main.tsx",
      code: `import "bootstrap/dist/css/bootstrap.min.css";
import "./${t.isNext ? "globals" : "index"}.css";`,
    },
    {
      title: "Add the color",
      description:
        "Override Bootstrap's primary color and the primary button states with your generated colors.",
      language: "css",
      filename: t.cssFile,
      code: bootstrapOverride(c),
    },
    {
      title: "Use the color",
      description:
        "Use Bootstrap's standard classes. Utilities such as text-primary and bg-primary pick up the color too.",
      language: "tsx",
      filename: t.componentFile,
      code: component(t.componentName, "btn btn-primary"),
    },
  ],
});

export const getConfigurationGuide = (
  tab: ConfigurationTab,
  styling: StylingOption,
  shades: ShadeScale,
): ConfigurationGuide => {
  const colors = getColors(shades);

  if (tab === "css") return getHtmlCssGuide(colors);

  const target = TARGETS[tab];

  switch (styling) {
    case "tailwind":
      return getTailwindGuide(target, colors);
    case "bootstrap":
      return getBootstrapGuide(target, colors);
    default:
      return getPlainCssGuide(target, colors);
  }
};
