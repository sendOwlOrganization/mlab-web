import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";
import { css } from "@linaria/core";

// hooks
import useFade from "@/hooks/useFade";

interface HintBalloonProps {
  open: boolean;
  align: "left" | "center" | "right";
  location: "up" | "down";
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
}

const HintBalloon = ({ open, children, align, location, ...props }: HintBalloonProps) => {
  const { FadeStyle, fadeClassname } = useFade({ useDelay: true, timeout: 300 });

  return open ? (
    <S.Container className={`${FadeStyle} ${fadeClassname}`} bgColor={props.bgColor}>
      <S.TooltipIcon className={`${TooltipIconPosition} ${align} ${location}`} />
      <S.TooltipContnet {...props}>{children}</S.TooltipContnet>
    </S.Container>
  ) : null;
};

export default HintBalloon;

const S = {
  Container: styled("div")<{ bgColor?: string }>`
    border: ${({ bgColor }) => bgColor ?? "#000"};
    position: relative;
    display: inline-block;
  `,
  TooltipIcon: styled("div")`
    position: absolute;
  `,
  TooltipContnet: styled("p")<{ bgColor?: string; color?: string }>`
    margin: 0 0 1rem 0;
    min-width: 0.1rem;
    border-radius: 1rem;
    padding: 0.25rem 0.625rem;
    background-color: ${({ bgColor }) => bgColor ?? "#000"};
    color: ${({ color }) => color ?? theme.palette.colors.gray[100]};
  `
};

const TooltipIconPosition = css`
  &.left {
    left: 15%;
  }
  &.center {
    left: calc(50% - 10px);
  }
  &.right {
    right: 15%;
  }
  &.up {
    border-bottom: 10px solid;
    border-bottom-color: inherit;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -0.625rem;
  }
  &.down {
    border-top: 10px solid;
    border-top-color: inherit;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: 0.4rem;
  }
`;
