import HintBalloon from "@/components/hint/HintBalloon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HintBalloon> = {
  title: "components/hint/HintBalloon",
  component: HintBalloon
};
export default meta;

type Story = StoryObj<typeof HintBalloon>;

export const Default: Story = {
  args: {
    children: "🎉 3초만에 시작하기",
    open: true,
    align: "left",
    location: "up"
  }
};
