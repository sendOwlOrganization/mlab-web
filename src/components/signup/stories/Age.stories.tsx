import Age from "@/components/signup/Age";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

const meta: Meta<typeof Age> = {
  title: "components/signup/Age",
  component: Age
};
export default meta;

type Story = StoryObj<typeof Age>;

const AgeWithHooks = () => {
  const ageRef = useRef<{ current: number }>();

  return <Age updateAge={(age) => (ageRef.current = age)} />;
};

export const Default: Story = {
  render: () => <AgeWithHooks />
};
