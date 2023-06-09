import Gender from "@/components/signup/Gender";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/addons";

const meta: Meta<typeof Gender> = {
  title: "components/signup/Gender",
  component: Gender
};
export default meta;

type Story = StoryObj<typeof Gender>;

const GenderWithHooks = () => {
  const [args, updateArgs] = useArgs();

  const handleUpdateGender = (gender: string) => {
    updateArgs({ ...args, gender });
  };

  return <Gender updateGender={handleUpdateGender} />;
};

export const Default: Story = {
  render: GenderWithHooks
};
