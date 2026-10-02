export const CONFIGURATION_TABS = [
  {
    id: "css",
    label: "CSS",
  },
  {
    id: "react",
    label: "React",
  },
  {
    id: "next",
    label: "Next.js",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
  },
  {
    id: "bootstrap",
    label: "Bootstrap",
  },
] as const;

export type ConfigurationTab = (typeof CONFIGURATION_TABS)[number]["id"];

export interface ConfigurationCommand {
  manager: string;
  command: string;
}

export interface ConfigurationStep {
  title: string;
  description: string;
  commands?: ConfigurationCommand[];
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

const getInstallCommands = (packages: string): ConfigurationCommand[] => [
  {
    manager: "npm",
    command: `npm install ${packages}`,
  },
  {
    manager: "Yarn",
    command: `yarn add ${packages}`,
  },
  {
    manager: "pnpm",
    command: `pnpm add ${packages}`,
  },
  {
    manager: "Bun",
    command: `bun add ${packages}`,
  },
];

export const getConfigurationGuides = (
  hex: string,
  rgb: string,
): Record<ConfigurationTab, ConfigurationGuide> => ({
  css: {
    label: "CSS",
    description:
      "Add your generated color to a standard CSS project using a reusable custom property.",
    packages: [],
    files: ["styles.css"],
    steps: [
      {
        title: "Add the color",
        description:
          "Create a CSS custom property so the generated color can be reused throughout your project.",
        language: "css",
        filename: "styles.css",
        code: `:root {
  --color-primary: ${hex};
}

html {
  scroll-behavior: smooth;
}`,
      },
      {
        title: "Use the color",
        description:
          "Reference the custom property anywhere you need the generated color.",
        language: "css",
        filename: "styles.css",
        code: `.button {
  background-color: var(--color-primary);
  color: white;
}

.button:hover {
  opacity: 0.9;
}`,
      },
    ],
  },

  react: {
    label: "React",
    description:
      "Use the generated color in a React application with a simple global CSS variable.",
    packages: [],
    files: ["src/index.css", "src/App.tsx"],
    steps: [
      {
        title: "Add the color",
        description:
          "Define the generated color as a CSS custom property in your global stylesheet.",
        language: "css",
        filename: "src/index.css",
        code: `:root {
  --color-primary: ${hex};
}

html {
  scroll-behavior: smooth;
}`,
      },
      {
        title: "Use the color",
        description:
          "Reference the generated color from your React components.",
        language: "tsx",
        filename: "src/App.tsx",
        code: `const App = () => {
  return (
    <button
      style={{
        backgroundColor: "var(--color-primary)",
        color: "white",
      }}
    >
      Primary Button
    </button>
  );
};

export default App;`,
      },
    ],
  },

  next: {
    label: "Next.js",
    description:
      "Add your generated color to a Next.js application through the global stylesheet.",
    packages: [],
    files: ["app/globals.css", "app/page.tsx"],
    steps: [
      {
        title: "Add the color",
        description:
          "Define the generated color in your Next.js global stylesheet.",
        language: "css",
        filename: "app/globals.css",
        code: `:root {
  --color-primary: ${hex};
}

html {
  scroll-behavior: smooth;
}`,
      },
      {
        title: "Use the color",
        description: "Reference the generated color from a Next.js component.",
        language: "tsx",
        filename: "app/page.tsx",
        code: `const Page = () => {
  return (
    <button
      style={{
        backgroundColor: "var(--color-primary)",
        color: "white",
      }}
    >
      Primary Button
    </button>
  );
};

export default Page;`,
      },
    ],
  },

  tailwind: {
    label: "Tailwind CSS",
    description:
      "Add your generated color to a Tailwind CSS v4 project and use it as a primary utility color.",
    packages: ["tailwindcss", "@tailwindcss/postcss", "postcss"],
    files: ["postcss.config.mjs", "app/globals.css"],
    steps: [
      {
        title: "Install Tailwind CSS",
        description:
          "Install Tailwind CSS and the PostCSS integration using your preferred package manager.",
        language: "shell",
        commands: getInstallCommands(
          "tailwindcss @tailwindcss/postcss postcss",
        ),
      },
      {
        title: "Configure PostCSS",
        description: "Add the Tailwind PostCSS plugin to your Next.js project.",
        language: "js",
        filename: "postcss.config.mjs",
        code: `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`,
      },
      {
        title: "Add the color",
        description:
          "Import Tailwind CSS and register your generated color as the primary theme color.",
        language: "css",
        filename: "app/globals.css",
        code: `@import "tailwindcss";

:root {
  --color-primary: ${hex};
}

html {
  scroll-behavior: smooth;
}

@theme {
  --color-primary: ${hex};
}`,
      },
      {
        title: "Use the color",
        description:
          "Use the generated color through Tailwind's primary color utilities.",
        language: "tsx",
        filename: "app/page.tsx",
        code: `const Page = () => {
  return (
    <button className="bg-primary text-white">
      Primary Button
    </button>
  );
};

export default Page;`,
      },
    ],
  },

  bootstrap: {
    label: "Bootstrap",
    description:
      "Install Bootstrap and connect your generated color to Bootstrap's primary color variables.",
    packages: ["bootstrap"],
    files: ["src/main.tsx", "src/index.css"],
    steps: [
      {
        title: "Install Bootstrap",
        description: "Install Bootstrap using your preferred package manager.",
        language: "shell",
        commands: getInstallCommands("bootstrap"),
      },
      {
        title: "Import Bootstrap",
        description:
          "Import Bootstrap's styles into your application's entry file.",
        language: "tsx",
        filename: "src/main.tsx",
        code: `import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";`,
      },
      {
        title: "Add the color",
        description:
          "Override Bootstrap's primary color variables with your generated color.",
        language: "css",
        filename: "src/index.css",
        code: `:root {
  --bs-primary: ${hex};
  --bs-primary-rgb: ${rgb};
  --color-primary: ${hex};
}

html {
  scroll-behavior: smooth;
}`,
      },
      {
        title: "Use the color",
        description: "Use Bootstrap's standard primary utility classes.",
        language: "tsx",
        filename: "src/App.tsx",
        code: `const App = () => {
  return (
    <button className="btn btn-primary">
      Primary Button
    </button>
  );
};

export default App;`,
      },
    ],
  },
});
