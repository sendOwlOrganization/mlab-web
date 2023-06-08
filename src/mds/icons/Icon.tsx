import { ArrowUp } from "@/mds/icons/ArrowUpIcon";
import { Check } from "@/mds/icons/CheckIcon";
import { css, cx } from "@linaria/core";
import { ComponentProps } from "react";

const IconMap = {
  ArrowUp,
  Check
};

export const icons = Object.keys(IconMap);

type IconName = keyof typeof IconMap;

interface IconProps extends ComponentProps<"svg"> {
  name: IconName;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const SvgComponent = IconMap[name];
  return <SvgComponent className={cx(C.svg, className)} xmlns="http://www.w3.org/2000/svg" {...props} />;
};

const C = {
  svg: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

export default Icon;
