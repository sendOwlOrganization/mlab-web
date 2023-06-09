import { ComponentProps } from "react";
import { styled } from "@linaria/react";

const Typography = (props: ComponentProps<"p">) => {
  return <S.Typography {...props} />;
};

export default Typography;

const S = {
  Typography: styled("p")``
};
