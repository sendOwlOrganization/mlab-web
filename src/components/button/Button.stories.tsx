import Button from "@/components/button/Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "components/button/Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Example = Template.bind({});
Example.args = {
  children: "테스트 버튼 2"
};
