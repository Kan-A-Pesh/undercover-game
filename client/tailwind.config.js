/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      title: ["'Micro 5'", "ui-monospace", "monospace"],
      body: ["'Departure Mono'", "ui-monospace", "monospace"],
    },
    fontSize: {
      display: ["96px", "48px"],
      "small-display": ["48px", "24px"],
      title: ["32px", "24px"],
      paragraph: ["12px", "16px"],
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
  ],
};
