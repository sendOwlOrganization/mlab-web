import { ComponentProps } from "react";
import { styled } from "@linaria/react";

export interface SvgIconProps extends ComponentProps<"svg"> {
  roundedBorder?: boolean;
}

const SvgIcon = ({ children, ...props }: SvgIconProps) => {
  return <S.Svg {...props}>{children}</S.Svg>;
};

export default SvgIcon;

const S = {
  Svg: styled("svg")<SvgIconProps>`
    path {
      fill: ${({ color }) => color ?? ""};
    }
  `
};
