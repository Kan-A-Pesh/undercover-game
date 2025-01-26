import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/assets/fonts/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#000000" }],
      default: "dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
