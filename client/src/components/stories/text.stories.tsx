import type { Meta, StoryObj } from "@storybook/react";
import Text from "../ui/text";

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const DisplayText: Story = {
  args: {
    type: "display",
    children: "Display text",
  },
};

export const TitleText: Story = {
  args: {
    type: "title",
    children: "Title text",
  },
};

export const ParagraphText: Story = {
  args: {
    type: "paragraph",
    children: "Paragraph text",
  },
};

export const CaptionText: Story = {
  args: {
    type: "caption",
    children: "Caption text",
  },
};
