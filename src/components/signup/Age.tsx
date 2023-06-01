import { useState } from "react";
import { styled } from "@linaria/react";

// components
import RadioSelect, { RadioSelectItem } from "@/components/radio/RadioSelect";
import Typography from "@/components/typography/Typography";

// hooks
import useFade from "@/hooks/useFade";

export interface AgeProps {
  updateAge: (age: number) => void;
}

const ages: RadioSelectItem<number>[] = Array.from({ length: 6 }, (_, index) => ({
  text: `${(index + 1) * 10}대`,
  value: (index + 1) * 10
}));

const Age = ({ updateAge }: AgeProps) => {
  const [age, setAge] = useState<RadioSelectItem<number>>();
  const { FadeStyle, fadeClassname: fadeClassname300 } = useFade({ useDelay: true, timeout: 300 });
  const { fadeClassname: fadeClassname500 } = useFade({ useDelay: true, timeout: 500 });

  const handleChange = (item: RadioSelectItem<number>) => {
    setAge(item);
    updateAge && updateAge(item.value);
  };

  return (
    <section>
      {/* TODO Typography 세팅 후 설정 */}
      <S.Box>
        <Typography className={`${FadeStyle} ${fadeClassname300}`}>서비스 이용을 위해</Typography>
        <Typography className={`${FadeStyle} ${fadeClassname500}`}>연령대를 선택해 주세요</Typography>
      </S.Box>
      <RadioSelect items={ages} name="age-select" value={age} onChange={handleChange} />
    </section>
  );
};

export default Age;

const S = {
  Box: styled("div")`
    padding: 1rem 1rem 3.375rem 1rem;
  `
};
