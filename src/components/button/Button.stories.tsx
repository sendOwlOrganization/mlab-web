import Button from "@/components/button/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "components/button/Button",
  component: Button
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Example: Story = {
  args: {
    children: "테스트 버튼 1"
  }
};
