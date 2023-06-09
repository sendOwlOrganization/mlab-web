import Mbti from "@/components/signup/Mbti";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/addons";

const meta: Meta<typeof Mbti> = {
  title: "components/signup/Mbti",
  component: Mbti
};
export default meta;

type Story = StoryObj<typeof Mbti>;

const MbtiWithHooks = () => {
  const [{ mbti = "" }, setArgs] = useArgs();

  return <Mbti mbti={mbti} setMbti={(mbti) => setArgs({ mbti })} />;
};

export const Default: Story = {
  render: MbtiWithHooks
};
