import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../ui/modal";
import Text from "../ui/text";
import Button from "../ui/button";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Modal closed"),
    title: "Example Modal",
    children: <Text type="paragraph">This is a basic modal with a title and default footer.</Text>,
  },
};

export const CustomFooter: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Modal closed"),
    title: "Custom Footer",
    children: <Text type="paragraph">This modal has a custom footer with multiple buttons.</Text>,
    footer: (
      <div className="flex justify-end gap-4">
        <Button type="outlined" color="white" onClick={() => console.log("Cancel")}>
          Cancel
        </Button>
        <Button type="filled" color="primary" onClick={() => console.log("Save")}>
          Save
        </Button>
      </div>
    ),
  },
};
