import { SelectStateContext } from "@/components/select/SelectContext";
import { useSelect } from "@/components/select/useSelect";
import { theme } from "@/mds/theme";
import { styled } from "@linaria/react";
import { PropsWithChildren, useId, useState } from "react";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const Select = ({ value, onChange, children }: PropsWithChildren<SelectProps>) => {
  const [open, setOpen] = useState<boolean>(false);
  const buttonId = useId();
  const selectId = useId();

  return (
    <SelectStateContext.Provider value={{ open, value, setOpen, setValue: onChange }}>
      <S.Container>
        <S.Button
          id={buttonId}
          aria-haspopup={true}
          aria-controls={selectId}
          aria-expanded={open}
          onClick={() => setOpen(!open)}>
          {value}
        </S.Button>
        <S.Items id={selectId} data-open={open} aria-labelledby={buttonId} role={"listbox"}>
          {children}
        </S.Items>
      </S.Container>
    </SelectStateContext.Provider>
  );
};

interface SelectItemProps extends PropsWithChildren {
  value: string;
  disabled?: boolean;
}

const SelectItem = ({ children, value, disabled }: SelectItemProps) => {
  const { value: selectedValue, setValue, setOpen } = useSelect();
  const isSelected = value === selectedValue;
  return (
    <S.Item
      role={"option"}
      data-selected={isSelected}
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}>
      {children}
    </S.Item>
  );
};

Select.Item = SelectItem;

const S = {
  Container: styled("div")`
    width: fit-content;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 8px;
    border: 1px solid ${theme.palette.colors.gray[100]};

    &:hover {
    }
    &:active,
    &:focus-within {
      border-color: ${theme.palette.primary};
    }
  `,
  Button: styled("button")`
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  Items: styled("ol")`
    top: calc(100% + 8px);
    left: 0;
    position: absolute;
    list-style: none;
    padding: 8px;
    margin: 0;
    border-radius: 8px;
    border: 1px solid ${theme.palette.colors.gray[100]};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    &[data-open="false"] {
      display: none;
    }
  `,
  Item: styled("li")`
    padding: 6px 12px;
    &[data-selected="true"] {
      color: ${theme.palette.primary};
    }
    &:hover {
      cursor: pointer;
      background-color: ${theme.palette.colors.gray[100]};
      border-radius: 8px;
    }
  `
};

export default Select;
