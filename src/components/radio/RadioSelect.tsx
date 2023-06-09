import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";
import { useId } from "react";

// icons
import RadioButtonIcon from "@/components/icons/RadioButtonIcon";

export interface RadioSelectItem<T> {
  value: T;
  text: string | number;
}

export interface RadioSelectProps<T> {
  name: string;
  items: RadioSelectItem<T>[];
  value?: RadioSelectItem<T>;
  onChange?: (value: RadioSelectItem<T>) => void;
}

const RadioSelect = <T,>({ value, items, name, onChange }: RadioSelectProps<T>) => {
  return (
    <S.RadioList>
      {items.map((item) => {
        const RadioItem = () => {
          const itemKey = useId();
          return (
            <S.RadioItem key={itemKey} onClick={() => onChange && onChange(item)}>
              <RadioButtonIcon
                color={item.value === value?.value ? theme.palette.colors.pink[500] : theme.palette.colors.gray[200]}
              />
              <S.Radio type="radio" name={name} id={itemKey} />
              <S.Label htmlFor={itemKey}>{item.text}</S.Label>
            </S.RadioItem>
          );
        };
        return RadioItem();
      })}
    </S.RadioList>
  );
};

export default RadioSelect;

const S = {
  RadioList: styled("ul")`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  RadioItem: styled("li")`
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;

    &:hover {
      background-color: ${theme.palette.colors.gray[100]};
    }
  `,
  Radio: styled("input")`
    display: none;
  `,
  Label: styled("label")`
    margin-left: 0.75rem;
    cursor: pointer;
  `
};
