import Input from "@/components/input/Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "components/input/Input",
  component: Input
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "작성해보세요 :)"
  }
};

export const WithButton: Story = {
  args: {
    placeholder: "버튼이 있어요",
    endAdornment: <button>버튼</button>
  }
};
