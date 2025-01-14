import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      primary: "#9747FF",
      dim: "#C396FF",
    },
    extend: {
      fontFamily: {
        sans: ['"Departure Mono"', "monospace"],
        title: ['"Micro 5"', "monospace"],
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(black|white|primary|dim)/,
      variants: ["hover", "active"],
    },
  ],
  plugins: [],
} satisfies Config;
