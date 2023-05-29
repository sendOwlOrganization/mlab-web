import Gender from "@/components/signup/Gender";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

const meta: Meta<typeof Gender> = {
  title: "components/signup/Gender",
  component: Gender
};
export default meta;

type Story = StoryObj<typeof Gender>;

const GenderWithHooks = () => {
  const GenderRef = useRef<string>();

  return <Gender updateGender={(Gender: string) => (GenderRef.current = Gender)} />;
};

export const Default: Story = {
  render: () => <GenderWithHooks />
};
