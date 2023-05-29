import Mbti from "@/components/signup/Mbti";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Mbti> = {
  title: "components/signup/Mbti",
  component: Mbti
};
export default meta;

type Story = StoryObj<typeof Mbti>;

const MbtiWithHooks = () => {
  const [mbti, setMbti] = useState<string>("");

  return <Mbti mbti={mbti} setMbti={setMbti} />;
};

export const Default: Story = {
  render: () => <MbtiWithHooks />
};
