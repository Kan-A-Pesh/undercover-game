/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      title: ["'Micro 5'", "ui-monospace", "monospace"],
      body: ["'Departure Mono'", "ui-monospace", "monospace"],
    },
    fontSize: {
      display: ["96px", "48px"],
      title: ["32px", "24px"],
      body: ["12px", "16px"],
      caption: ["10px", "10px"],
    },
    colors: {
      primary: "#9747FF",
      secondary: "#C396FF",
      white: "#FFFFFF",
      black: "#000000",
      current: "currentColor",
      transparent: "transparent",
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(font|text|bg|border)-(.*)/,
      variants: ["hover"],
    },
    {
      pattern: /(left|right|gap|px|py|w|h|ps|pe)-(1|2|4|6|8|10)/,
      variants: ["hover", "group-hover"],
    },
    "flex",
    "items-center",
    "border",
    "opacity-50",
    "group",
    "pointer-events-none",
    "relative",
  ],
};
