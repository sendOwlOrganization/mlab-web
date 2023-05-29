import { ReactNode, useEffect, useState } from "react";
import { styled } from "@linaria/react";

// components
import RadioSelect, { RadioSelectItem } from "@/components/radio/RadioSelect";
import Typography from "@/components/typography/Typography";

export interface AgeProps {
  updateAge: (age: number) => void;
}

const ages: RadioSelectItem<number>[] = Array.from({ length: 6 }, (_, index) => ({
  text: `${(index + 1) * 10}대`,
  value: (index + 1) * 10
}));

const Age = ({ updateAge }: AgeProps) => {
  const [age, setAge] = useState<RadioSelectItem<number>>();

  const handleChange = (item: RadioSelectItem<number>) => {
    setAge(item);
    updateAge && updateAge(item.value);
  };

  return (
    <section>
      {/* TODO Typography 세팅 후 설정 */}
      <S.Box>
        <Fade timeout={300}>
          <Typography>서비스 이용을 위해</Typography>
        </Fade>
        <Fade timeout={500}>
          <Typography>연령대를 선택해 주세요</Typography>
        </Fade>
      </S.Box>
      <RadioSelect items={ages} name="age-select" value={age} onChange={handleChange} />
    </section>
  );
};

export default Age;

const S = {
  Box: styled("div")`
    padding: 1rem 1rem 3.375rem 1rem;
  `,
  Fade: styled("div")<{ isVisible: boolean }>`
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 0.7s ease-in-out;
  `
};

const Fade = ({ children, timeout }: { children: ReactNode; timeout: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const apper = setTimeout(() => {
      setIsVisible(true);
    }, timeout);

    return () => {
      clearTimeout(apper);
    };
  }, []);

  return <S.Fade isVisible={isVisible}>{children}</S.Fade>;
};
