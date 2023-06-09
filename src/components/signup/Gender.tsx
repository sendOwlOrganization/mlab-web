import { useState } from "react";
import { styled } from "@linaria/react";

// components
import RadioSelect, { RadioSelectItem } from "@/components/radio/RadioSelect";
import Typography from "@/components/typography/Typography";

// hooks
import useFade from "@/hooks/useFade";

export interface GenderProps {
  updateGender: (age: string) => void;
}

const gneders = [
  {
    text: "남성",
    value: "MALE"
  },
  {
    text: "여성",
    value: "FEMALE"
  },
  {
    text: "선택 안함",
    value: "OTHER"
  }
];

const Gender = ({ updateGender }: GenderProps) => {
  const [gender, setGender] = useState<RadioSelectItem<string>>();
  const { className: fadeClassName300 } = useFade({ timeout: 300 });
  const { className: fadeClassName500 } = useFade();

  const handleChange = (item: RadioSelectItem<string>) => {
    setGender(item);
    updateGender && updateGender(item.value);
  };

  return (
    <section>
      {/* TODO Typography 세팅 후 설정 */}
      <S.Box>
        <Typography className={fadeClassName300}>성별을 선택해 주세요</Typography>
        <Typography className={fadeClassName500}>해당 정보는 인사이트에 활용되며, 공개되지 않아요</Typography>
      </S.Box>
      <RadioSelect items={gneders} name="gender-select" value={gender} onChange={handleChange} />
    </section>
  );
};

export default Gender;

const S = {
  Box: styled("div")`
    padding: 1rem 1rem 3.375rem 1rem;
  `
};
