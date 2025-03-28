import type { Meta, StoryObj } from "@storybook/react";
import HomeScreen from "../home";

const meta: Meta<typeof HomeScreen> = {
  component: HomeScreen,
};

export default meta;
type Story = StoryObj<typeof HomeScreen>;

export const Default: Story = {
  args: {},
};
