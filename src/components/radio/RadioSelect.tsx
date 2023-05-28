import { InputHTMLAttributes } from "react";
import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";

// icons
import RadioButtonIcon from "@/components/icons/RadioButtonIcon";

export interface RadioSelectItem extends Pick<InputHTMLAttributes<HTMLInputElement>, "value"> {
  key?: string;
  text: string | number;
}

interface RadioSelectProps {
  name: string;
  items: RadioSelectItem[];
  value?: RadioSelectItem;
  onChange?: (value: RadioSelectItem) => void;
}

const RadioSelect = ({ value, items, name, onChange }: RadioSelectProps) => {
  return (
    <S.RadioList>
      {items.map((item) => {
        const itemKey = item.key ?? String(item.text);
        return (
          <S.RadioItem key={itemKey} onClick={() => onChange && onChange(item)}>
            <RadioButtonIcon
              color={
                itemKey === (value?.key ?? String(value?.text))
                  ? theme.palette.colors.pink[500]
                  : theme.palette.colors.gray[200]
              }
            />
            <S.Radio type="radio" name={name} id={itemKey} />
            <S.Label htmlFor={itemKey}>{item.text}</S.Label>
          </S.RadioItem>
        );
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
