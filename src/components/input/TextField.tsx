import { ComponentProps } from "react";
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
  return (
    <S.FlexColumn>
      <S.Label htmlFor={id} required={props.required ?? false} variant={variant} disabled={props.disabled ?? false}>
        {label}
      </S.Label>
      <S.InputWrap variant={variant} disabled={props.disabled ?? false}>
        <S.Input id={id} {...props} />
        <S.DeleteIcon color={theme.palette.colors.gray[200]} onClick={onClear} />
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
  InputWrap: styled("div")<{ disabled: boolean | undefined; variant: TextFieldVariant }>`
    position: relative;
    display: flex;

    &:focus-within {
      & > input {
        border-bottom-color: ${({ disabled, variant }) => getInputBorderColor(disabled ? "disabled" : variant)};
      }
      & > svg {
        opacity: 1;
        cursor: pointer;
      }
    }
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
  DeleteIcon: styled(DeleteIcon)`
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

const getInputBorderColor = (variant: TextFieldVariant | "disabled") => {
  switch (variant) {
    case "default":
      return theme.palette.colors.red[500];
    case "error":
      return theme.palette.colors.red[500];
    case "warning":
      return theme.palette.colors.orange[500];
    case "disabled":
      return theme.palette.colors.gray[300];
    default:
      return theme.palette.colors.red[500];
  }
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
