import type { Meta, StoryObj } from "@storybook/react";
import WordAttributionScreen from "../../game/word-attribution";

const meta: Meta<typeof WordAttributionScreen> = {
  component: WordAttributionScreen,
};

export default meta;
type Story = StoryObj<typeof WordAttributionScreen>;

export const Default: Story = {
  args: {},
};
