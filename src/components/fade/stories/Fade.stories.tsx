import Fade from "@/components/fade/Fade";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Fade> = {
  title: "components/fade/Fade",
  component: Fade
};
export default meta;

type Story = StoryObj<typeof Fade>;

export const Default: Story = {
  args: {
    children: "0.5초 후에 나타나요",
    timeout: 500
  }
};
