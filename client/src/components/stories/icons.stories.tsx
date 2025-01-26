import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const IconExample: Story = {
  args: {
    name: "plus",
    size: 32,
    color: "white",
  },
};
