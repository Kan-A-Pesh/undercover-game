import type { Meta, StoryObj } from "@storybook/react";
import LobbyScreen from "../../game/lobby";

const meta: Meta<typeof LobbyScreen> = {
  component: LobbyScreen,
};

export default meta;
type Story = StoryObj<typeof LobbyScreen>;

export const Default: Story = {
  args: {},
};
