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
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text|bg)-(.*)/,
    },
  ]
};
