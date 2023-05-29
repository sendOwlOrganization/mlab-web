import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";
import { css } from "@linaria/core";

// components
import Fade from "@/components/fade/Fade";

interface HintBalloonProps {
  open: boolean;
  align: "left" | "center" | "right";
  location: "up" | "down";
  children: React.ReactNode;
}

const HintBalloon = ({ open, children, align, location }: HintBalloonProps) => {
  return open ? (
    <Fade timeout={300}>
      <S.Container>
        <S.TooltipIcon className={`${TooltipIconPosition} ${align} ${location}`} />
        <S.TooltipContnet>{children}</S.TooltipContnet>
      </S.Container>
    </Fade>
  ) : null;
};

export default HintBalloon;

const S = {
  Container: styled("div")`
    position: relative;
    display: inline-block;
  `,
  TooltipIcon: styled("div")`
    position: absolute;
  `,
  TooltipContnet: styled("p")`
    margin: 0 0 1rem 0;
    min-width: 0.1rem;
    border-radius: 1rem;
    padding: 0.25rem 0.625rem;
    background-color: #000;
    color: ${theme.palette.colors.gray[100]};
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
    border-bottom: 10px solid black;
    border-bottomcolor: inherit;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -0.625rem;
  }
  &.down {
    border-top: 10px solid black;
    border-topcolor: inherit;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: 0.4rem;
  }
`;
