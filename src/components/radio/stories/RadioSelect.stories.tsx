import RadioSelect, { RadioSelectItem } from "@/components/radio/RadioSelect";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof RadioSelect> = {
  title: "components/radio/RadioSelect",
  component: RadioSelect
};
export default meta;

type Story = StoryObj<typeof RadioSelect>;

const RadioSelectWithHooks = () => {
  const [value, setValue] = useState<RadioSelectItem>();

  return (
    <RadioSelect
      value={value}
      onChange={setValue}
      name="radio-select"
      items={[
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
      ]}
    />
  );
};

export const Default: Story = {
  render: () => <RadioSelectWithHooks />
};
