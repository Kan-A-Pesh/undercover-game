import type { Meta, StoryObj } from "@storybook/react";
import RulesScreen from "../rules";

const meta: Meta<typeof RulesScreen> = {
  component: RulesScreen,
};

export default meta;
type Story = StoryObj<typeof RulesScreen>;

export const Default: Story = {
  args: {},
};
