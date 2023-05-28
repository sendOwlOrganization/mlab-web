import { ComponentProps, useState } from "react";
import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";

// components
import Typography from "@/components/typography/Typography";

// icons
import DeleteIcon from "@/components/icons/DeleteIcon";

type TextFieldVariant = "default" | "error" | "warning";

export interface TextFieldProps extends ComponentProps<"input"> {
  id?: string;
  label?: string;
  helperText?: string;
  variant?: TextFieldVariant;
  onClear?: () => void;
}

const TextField = ({ label, id, helperText, onClear, variant = "default", ...props }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onClear && onClear();
    isFocused && setIsFocused(false);
  };

  return (
    <S.FlexColumn>
      <S.Label htmlFor={id} required={props.required ?? false} variant={variant} disabled={props.disabled ?? false}>
        {label}
      </S.Label>
      <S.InputWrap>
        <S.Input id={id} {...props} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
        <S.DeleteIcon color={theme.palette.colors.gray[200]} onClick={handleClear} isFocused={isFocused} />
      </S.InputWrap>
      {/* TODO Typography 세팅 후 설정 */}
      {helperText && <Typography>{helperText}</Typography>}
    </S.FlexColumn>
  );
};

export default TextField;

const S = {
  FlexColumn: styled("div")`
    display: flex;
    flex-direction: column;
  `,
  InputWrap: styled("div")`
    position: relative;
    display: flex;
  `,
  Input: styled("input")`
    all: unset;
    background-color: transparent;
    border-bottom: 1px solid ${theme.palette.colors.gray[700]};
    padding: 0.625rem;
    font-weight: bold;
    width: 100%;

    ::placeholder {
      color: ${theme.palette.colors.gray[300]};
      font-weight: normal;
    }

    &:focus {
      border-bottom-color: red;
    }

    &:disabled {
      color: ${theme.palette.colors.gray[300]};
      border-bottom-color: ${theme.palette.colors.gray[300]};
    }
  `,
  Label: styled("label")<{ required: boolean; disabled: boolean | undefined; variant: TextFieldVariant }>`
    font-weight: bold;
    color: ${({ disabled, variant }) => getLabelColor(disabled ? "disabled" : variant)};
    ::after {
      content: ${({ required }) => (required ? "'*'" : "''")};
      color: ${theme.palette.colors.red[500]};
    }
  `,
  DeleteIcon: styled(DeleteIcon)<{ isFocused: boolean }>`
    opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
    cursor: ${({ isFocused }) => (isFocused ? "pointer" : "default")};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.625rem;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      path {
        fill: ${theme.palette.colors.gray[300]};
      }
    }
  `
};

const getLabelColor = (variant: TextFieldVariant | "disabled") => {
  switch (variant) {
    case "default":
      return theme.palette.colors.gray[500];
    case "error":
      return theme.palette.colors.red[500];
    case "warning":
      return theme.palette.colors.orange[500];
    case "disabled":
      return theme.palette.colors.gray[300];
    default:
      return theme.palette.colors.gray[500];
  }
};
