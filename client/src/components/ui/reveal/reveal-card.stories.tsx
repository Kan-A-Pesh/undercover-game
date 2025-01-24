import type { Meta, StoryObj } from "@storybook/react";
import RevealCard from "./reveal-card";

const meta: Meta<typeof RevealCard> = {
  component: RevealCard,
};

export default meta;
type Story = StoryObj<typeof RevealCard>;

export const RevealCardExample: Story = {};
