import type { Meta, StoryObj } from "@storybook/react";
import RevealStory from "../ui/reveal/story";

const meta: Meta<typeof RevealStory> = {
  component: RevealStory,
};

export default meta;
type Story = StoryObj<typeof RevealStory>;

export const RevealExample: Story = {};
