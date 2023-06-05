import Welcome from "@/components/signup/Welcome";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Welcome> = {
  title: "components/signup/Welcome",
  component: Welcome
};
export default meta;

type Story = StoryObj<typeof Welcome>;

export const Default: Story = {
  args: {
    mbti: "INFJ",
    nickname: "차분한"
  }
};
