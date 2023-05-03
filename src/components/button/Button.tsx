import { ComponentProps } from "react";

/**
 * @deprecated TODO: 테스트용 컴포넌트, 삭제 할 것
 */
const Button = (props: ComponentProps<"button">) => {
  return <button {...props} />;
};

export default Button;
