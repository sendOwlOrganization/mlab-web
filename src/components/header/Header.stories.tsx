import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "components/header/Header",
  component: Header
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Example: Story = {
  args: {
    left: (
      <>
        <button>left</button>
        <button>left2</button>
      </>
    ),
    center: (
      <>
        <div>center</div>
        <button>test</button>
      </>
    ),
    right: (
      <>
        <button>right</button>
        <button>right2</button>
      </>
    )
  }
};
