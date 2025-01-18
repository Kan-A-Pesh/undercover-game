import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FilledButton: Story = {
  args: {
    type: "filled",
    color: "primary",
    children: "Button",
  },
};

export const OutlinedButton: Story = {
  args: {
    type: "outlined",
    color: "primary",
    children: "Button",
  },
};

export const DisabledButton: Story = {
  args: {
    type: "filled",
    color: "white",
    children: "Button",
    disabled: true,
  },
};

export const IconButton: Story = {
  args: {
    type: "filled",
    color: "white",
    children: "Button",
    icon: "plus",
  },
};
