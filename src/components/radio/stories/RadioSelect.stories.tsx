import RadioSelect, { RadioSelectItem, RadioSelectProps } from "@/components/radio/RadioSelect";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof RadioSelect> = {
  title: "components/radio/RadioSelect",
  component: RadioSelect
};
export default meta;

type Story = StoryObj<typeof RadioSelect>;

const RadioSelectWithHooks = (props: RadioSelectProps) => {
  const [value, setValue] = useState<RadioSelectItem>();

  return <RadioSelect {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (props) => <RadioSelectWithHooks {...props} />,
  args: {
    name: "radio-select",
    items: [
      {
        text: 10,
        value: 1
      },
      {
        text: 20,
        value: 2
      },
      {
        text: 30,
        value: 3
      }
    ]
  }
};
