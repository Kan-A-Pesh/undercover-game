import type { Meta, StoryObj } from "@storybook/react";
import WordChoosingScreen from "../../game/word-choosing";

const meta: Meta<typeof WordChoosingScreen> = {
  component: WordChoosingScreen,
};

export default meta;
type Story = StoryObj<typeof WordChoosingScreen>;

export const Default: Story = {
  args: {},
};
