import Select from "@/mds/select/Select";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "components/select/Select",
  component: Select
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Example: Story = {
  args: {
    value: "MBTI"
  },
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [_, setArgs] = useArgs();
    return (
      <Select {...props} onChange={(value) => setArgs({ value })}>
        {["INTP", "INTJ", "ENTP", "ENTJ", "INFP", "INFJ"].map((mbti) => (
          <Select.Item key={mbti} value={mbti}>
            {mbti}
          </Select.Item>
        ))}
      </Select>
    );
  }
};
