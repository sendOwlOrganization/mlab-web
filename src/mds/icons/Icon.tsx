import { ArrowUp } from "@/mds/icons/ArrowUpIcon";
import { Check } from "@/mds/icons/CheckIcon";
import { css } from "@linaria/core";

const IconMap = {
  ArrowUp,
  Check
};

export const icons = Object.keys(IconMap);

type IconName = keyof typeof IconMap;

interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  const SvgComponent = IconMap[name];
  return <SvgComponent className={svgClass} xmlns="http://www.w3.org/2000/svg" />;
};

const svgClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Icon;
