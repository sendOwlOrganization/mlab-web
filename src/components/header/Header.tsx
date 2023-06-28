import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { PropsWithChildren, ReactNode } from "react";

interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <header className={C.header}>
      <Left>{left}</Left>
      <Center>{center}</Center>
      <Right>{right}</Right>
    </header>
  );
};

const C = {
  header: css`
    width: 100%;
    height: 56px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 8px;
    box-sizing: border-box;
    padding: 0 8px;
  `
};

const Left = ({ children }: PropsWithChildren) => {
  return <LeftContainer>{children}</LeftContainer>;
};

const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
`;

const Right = ({ children }: PropsWithChildren) => {
  return <RightContainer>{children}</RightContainer>;
};

const RightContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

const Center = ({ children }: PropsWithChildren) => {
  return <CenterContainer>{children}</CenterContainer>;
};

const CenterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;
