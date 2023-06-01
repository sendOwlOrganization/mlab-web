import HintBalloon, { HintBalloonProps } from "@/components/hint/HintBalloon";
import type { Meta, StoryObj } from "@storybook/react";

// hooks
import useFade from "@/hooks/useFade";

const meta: Meta<typeof HintBalloon> = {
  title: "components/hint/HintBalloon",
  component: HintBalloon
};
export default meta;

type Story = StoryObj<typeof HintBalloon>;

export const Default: Story = {
  args: {
    children: "🎉 3초만에 시작하기",
    align: "left",
    location: "up"
  }
};

const HintBalloonWithHooks = (props: HintBalloonProps) => {
  const { FadeStyle, fadeClassname } = useFade({ useDelay: true, timeout: 1000 });

  return <HintBalloon className={`${FadeStyle} ${fadeClassname}`} {...props} />;
};

export const WithFadeHook: Story = {
  render: (props) => <HintBalloonWithHooks {...props} />,
  args: {
    children: "🎉 1초 뒤에 나타나요",
    align: "left",
    location: "up"
  }
};
