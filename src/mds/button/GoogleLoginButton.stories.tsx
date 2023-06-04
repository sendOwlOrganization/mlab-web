import GoogleLoginButton from "@/mds/button/GoogleLoginButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GoogleLoginButton> = {
  title: "mds/button",
  component: GoogleLoginButton
};
export default meta;

type Story = StoryObj<typeof GoogleLoginButton>;

export const GoogleLogin: Story = {
  args: {}
};
