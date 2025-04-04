/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .5s ease-in-out",
        fadeLeft: "fadeLeft .5s ease-in-out 0 1 forwards",
        fadeRight: "fadeRight .5s ease-in-out 0 1 forwards",
        fadeUp: "fadeUp .5s ease-in-out 0 1 forwards",
        fadeDown: "fadeDown .5s ease-in-out 0 1 forwards",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeLeft: {
          from: { opacity: 0, transform: "translateX(-50%)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        fadeRight: {
          from: { opacity: 0, transform: "translateX(50%)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(-50%)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: 0, transform: "translateY(50%)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
    fontFamily: {
      title: ["'Micro 5'", "ui-monospace", "monospace"],
      body: ["'Departure Mono'", "ui-monospace", "monospace"],
    },
    fontSize: {
      display: ["96px", "48px"],
      "small-display": ["32px", "24px"],
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
  plugins: [require("tailwindcss-animation-delay")],
  safelist: [
    {
      pattern: /(font|text|bg|border)-(.*)/,
      variants: ["hover"],
    },
  ],
};
