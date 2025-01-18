/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
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
      pattern: /(text|bg|border)-(.*)/,
      variants: ["hover"],
    },
    {
      pattern: /(left|right|gap|px|py|w|h|ps|pe)-(1|2|4|6|8|10)/,
      variants: ["hover", "group-hover"],
    },
    "flex", "items-center", "border", "opacity-50", "group", "pointer-events-none", "relative"
  ]
};
