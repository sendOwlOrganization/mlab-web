import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { MbtiType } from "@/mocks/mbti";

// components
import MlabLogo from "@/components/logo/MlabLogo";
import Typography from "@/components/typography/Typography";
import { theme } from "@/mds/theme";

interface WelcomeProps {
  nickname: string;
  mbti: MbtiType;
}

const Welcome = ({ nickname, mbti = "INFJ" }: WelcomeProps) => {
  return (
    <section className={C.section}>
      <header className={C.header}>
        <MlabLogo width={66} />
      </header>
      <div className={C.box}>
        <S.CharacterImage src={`/character/${mbti.toLowerCase()}.svg`} />
        <Typography className={C.font}>
          <S.Highlight>
            {nickname}
            {mbti.toUpperCase()}
          </S.Highlight>
          님,
        </Typography>
        <Typography className={C.font}>가입을 진심으로 축하드려요🎉</Typography>
      </div>
    </section>
  );
};

export default Welcome;

const S = {
  CharacterImage: styled("img")`
    animation: hello 1s ease-in-out infinite;
    margin-bottom: 2.375rem;

    @keyframes hello {
      0% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
      100% {
        transform: rotate(-10deg);
      }
    }
  `,
  Highlight: styled("span")`
    color: ${theme.palette.colors.pink[500]};
  `
};

const C = {
  section: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  header: css`
    height: 4.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  box: css`
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  font: css`
    font-weight: bold;
    font-size: 24px;
    margin: 0;
  `
};
