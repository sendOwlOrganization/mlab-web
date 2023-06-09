import Age from "@/components/signup/Age";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/addons";

const meta: Meta<typeof Age> = {
  title: "components/signup/Age",
  component: Age
};
export default meta;

type Story = StoryObj<typeof Age>;

const AgeWithHooks = () => {
  const [args, updateArgs] = useArgs();

  const handleUpdateAge = (age: number) => {
    updateArgs({ ...args, age });
  };

  return <Age updateAge={handleUpdateAge} />;
};

export const Default: Story = {
  render: AgeWithHooks
};
