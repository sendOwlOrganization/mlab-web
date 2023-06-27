import EditorJS, { INITIAL_DATA } from "@/components/editorjs/EditorJS";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/addons";

const meta: Meta<typeof EditorJS> = {
  title: "components/editorjs/EditorJS",
  component: EditorJS
};
export default meta;

type Story = StoryObj<typeof EditorJS>;

const EditorJSWithHooks = () => {
  const [{ data = INITIAL_DATA() }, setData] = useArgs();

  return <EditorJS data={data} onChangeData={(data) => setData({ data })} />;
};

export const Default: Story = {
  render: EditorJSWithHooks
};
