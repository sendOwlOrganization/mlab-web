import TextField, { TextFieldProps } from "@/components/input/TextField";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof TextField> = {
  title: "components/input/TextField",
  component: TextField
};
export default meta;

type Story = StoryObj<typeof TextField>;

const TextFieldWithHooks = (props: TextFieldProps) => {
  const [value, setValue] = useState("");

  return <TextField {...props} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue("")} />;
};

export const Default: Story = {
  render: (props) => <TextFieldWithHooks {...props} />,
  args: {
    variant: "warning",
    id: "label-story",
    label: "Label",
    placeholder: "작성해보세요",
    required: true,
    helperText: "자유롭게 입력해주세요",
    disabled: false
  }
};
