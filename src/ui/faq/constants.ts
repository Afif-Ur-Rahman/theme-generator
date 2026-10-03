export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Theme Generator?",
    answer:
      "Theme Generator is a color palette and shade generator for web developers and designers. Pick or generate a base color, fine-tune it, preview a full 50–900 shade scale, and export it as CSS variables or ready-to-paste setup code for React, Next.js, Tailwind CSS and Bootstrap.",
  },
  {
    question: "How do I generate a random color palette?",
    answer:
      "Click Generate Random Color on the Random Color tab. The generator picks a random hue with balanced saturation and lightness, so the result works well as a brand or theme color. It then shows the HEX, RGB and HSL values and rebuilds the shade scale instantly.",
  },
  {
    question: "Can I enter my own HEX code or color name?",
    answer:
      "Yes. Type a 6-digit HEX code, with or without the #, or a color name such as coral or navy into the large color field. The color is applied a few seconds after you stop typing. You can also drag the Hue, Saturation and Lightness sliders to fine-tune any color.",
  },
  {
    question: "How are the 50–900 color shades generated?",
    answer:
      "Your base color becomes the 500 shade. Lighter shades (50 to 400) step toward a very light tint and darker shades (600 to 900) step toward a deep, near-black tone, while the hue and saturation stay the same. The result is a 10-step color scale that follows the same naming as Tailwind CSS color palettes.",
  },
  {
    question: "Can I use these shades as a Tailwind CSS color palette?",
    answer:
      "Yes. The 50–900 naming matches Tailwind CSS. Click any shade to copy its HEX value, then add it to your Tailwind theme as a custom color such as --color-primary-100. The Tailwind guide in the Configuration section shows how to register your base color with the @theme directive.",
  },
  {
    question: "How do I copy a HEX, RGB or HSL value?",
    answer:
      "Click any value in the Values panel to copy the HEX, RGB or HSL code, or click a shade in the Shades section to copy its HEX. The Configuration section also has a Copy HEX button for the current color, and every code snippet has its own copy button.",
  },
  {
    question: "Is my color history saved?",
    answer:
      "Yes. Colors you move away from, whether by generating a new one or editing the current one, are added to the History tab. The last 10 colors are stored in your browser's local storage, so they are still there when you return on the same device. Clearing your browser data removes them.",
  },
  {
    question: "Does it support dark mode and accessible color contrast?",
    answer:
      "Yes. The site follows your system's light or dark preference and remembers your choice when you use the theme toggle. The interface keeps readable contrast no matter which color you pick, and every shade shows a text color chosen to meet the WCAG AA contrast ratio of 4.5:1 on that shade.",
  },
  {
    question: "Which frameworks can I export my color to?",
    answer:
      "The Configuration section has step-by-step guides for plain HTML and CSS, React and Next.js. For React and Next.js you can choose plain CSS, Tailwind CSS or Bootstrap. Each guide lists the packages and files you need and includes copy-ready code with your generated color, including a readable text color for buttons.",
  },
  {
    question: "Does the Tailwind CSS guide support version 4?",
    answer:
      "Yes. The guide uses the CSS-first setup from Tailwind CSS v4: the @tailwindcss/postcss plugin for Next.js, the @tailwindcss/vite plugin for React with Vite, and an @theme block in your stylesheet to register the color as a theme variable.",
  },
  {
    question: "How do I set a custom primary color in Bootstrap?",
    answer:
      "Choose React or Next.js, then Bootstrap. The guide imports Bootstrap before your own stylesheet and overrides --bs-primary, --bs-primary-rgb and the .btn-primary button variables, so buttons, text-primary and bg-primary all use your generated color.",
  },
  {
    question: "Do I need to install anything to use the generator?",
    answer:
      "No. The generator runs in your browser with nothing to install. Packages are only needed for the Tailwind CSS and Bootstrap guides, and each guide shows the install command for npm, Yarn, pnpm or Bun. The plain CSS guides need no packages at all.",
  },
  {
    question: "Do I need an account, and where is my data stored?",
    answer:
      "No account or sign-up is needed. Colors are generated and converted in your browser, and your color history and theme choice are saved only in your browser's local storage.",
  },
];
