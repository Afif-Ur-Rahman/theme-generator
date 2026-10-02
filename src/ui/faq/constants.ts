export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is this theme generator?",
    answer:
      "This tool lets you generate a base color, fine-tune it using HSL or HEX values, explore its full shade scale, and export the color into different web technologies.",
  },
  {
    question: "How is the color generated?",
    answer:
      "Random colors are generated as HSL values. The hue, saturation, and lightness are then converted into HEX and RGB values for display and export.",
  },
  {
    question: "Can I manually change the color?",
    answer:
      "Yes. You can adjust the color using the available controls or enter a HEX value directly. The generated theme updates automatically when the base color changes.",
  },
  {
    question: "What shade values are generated?",
    answer:
      "The generator creates a 10-step color scale using 50, 100, 200, 300, 400, 500, 600, 700, 800, and 900. The 500 shade represents the current base color.",
  },
  {
    question: "Can I use the shades as separate colors?",
    answer:
      "Yes. Each shade displays its HEX value and can be copied individually. The shades are provided as a visual scale so you can choose the value that fits your design.",
  },
  {
    question: "How do I copy a color?",
    answer:
      "Click any shade to copy its HEX value to your clipboard. The current color in the Export section also has a dedicated Copy HEX button.",
  },
  {
    question: "Is my color history saved?",
    answer:
      "The generator keeps your recently generated colors in its local application state so you can switch between previous colors during your session.",
  },
  {
    question: "Does the generator support dark mode?",
    answer:
      "Yes. The interface supports light and dark modes, allowing the generator itself to adapt while you work with your color palette.",
  },
  {
    question: "What can I export?",
    answer:
      "You can export your generated color for standard CSS, React, Next.js, Tailwind CSS, and Bootstrap projects. Each guide includes the relevant setup and usage examples.",
  },
  {
    question: "Do I need to install anything to use the generator?",
    answer:
      "No. The generator itself does not require any installation. The package installation commands shown in the Export section are only for technologies such as Tailwind CSS or Bootstrap when you want to use the generated color in your own project.",
  },
];
