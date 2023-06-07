import { ComponentProps, ReactNode } from "react";
import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";

interface InputProps extends ComponentProps<"input"> {
  endAdornment?: ReactNode;
}

const Input = ({ endAdornment, ...props }: InputProps) => {
  return (
    <S.Container>
      <S.Input {...props} />
      {endAdornment}
    </S.Container>
  );
};

export default Input;

// ! Theme에 맞는 변수 지정 필요
const S = {
  // TODO background-color
  Container: styled("div")`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 0.5rem 0.625rem;
  `,
  // TODO &:placeholder {}
  Input: styled("input")`
    color: ${theme.palette.text.primary};
    background-color: transparent;
    flex-grow: 2;
    border: none;
  `
};
