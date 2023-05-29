import { ReactNode, useEffect, useState } from "react";
import { styled } from "@linaria/react";

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

export default Fade;

const S = {
  Box: styled("div")`
    padding: 1rem 1rem 3.375rem 1rem;
  `,
  Fade: styled("div")<{ isVisible: boolean }>`
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 0.7s ease-in-out;
  `
};
