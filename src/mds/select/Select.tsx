import Icon from "@/mds/icons/Icon";
import { SelectStateContext } from "@/mds/select/SelectContext";
import { useSelect } from "@/mds/select/useSelect";
import { theme } from "@/mds/theme";
import { css } from "@linaria/core";
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
      <div className={C.container}>
        <button
          className={C.button}
          id={buttonId}
          aria-haspopup={true}
          aria-controls={selectId}
          aria-expanded={open}
          onClick={() => setOpen(!open)}>
          {value}
          <Icon name={"ArrowUp"} className={C.buttonIcon} data-open={open} />
        </button>
        <div className={C.itemList} id={selectId} data-open={open} aria-labelledby={buttonId} role={"listbox"}>
          {children}
        </div>
      </div>
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
    <div
      className={C.item}
      role={"option"}
      tabIndex={0}
      aria-selected={isSelected}
      data-selected={isSelected}
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}>
      {isSelected && <Icon name={"Check"} fill={theme.palette.primary} />}
      {children}
    </div>
  );
};

Select.Item = SelectItem;

const C = {
  container: css`
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
  button: css`
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  buttonIcon: css`
    transform: rotate(180deg);
    transition: transform 0.2s ease-in-out;
    &[data-open="true"] {
      transform: rotate(0deg);
    }
  `,
  itemList: css`
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
  item: css`
    display: flex;
    align-items: center;
    gap: 8px;
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
