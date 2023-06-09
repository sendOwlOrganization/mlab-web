import { styled } from "@linaria/react";
import { ChangeEvent } from "react";

// components
import Autocomplete from "@/components/autocomplete/Autocomplete";
import TextField from "@/components/input/TextField";
import Typography from "@/components/typography/Typography";

// hooks
import useFade from "@/hooks/useFade";

// mocks
import { mbtiDescription, mbtiList, mbtiListString } from "@/mocks/mbti";
import { theme } from "@/mds/theme";

const MBTI_TEST_LINK =
  "https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC";

interface MbtiProps {
  mbti: string;
  setMbti: (mbti: string) => void;
}

// TODO Typography 세팅 후 설정
const Mbti = ({ mbti, setMbti }: MbtiProps) => {
  const { className: fadeClassname300 } = useFade({ timeout: 300 });
  const { className: fadeClassname500 } = useFade();

  const handleChangeMbti = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 4);
    setMbti(value);
  };

  return (
    <section>
      <S.Box>
        <Typography className={fadeClassname300}>만나서 반가워요 :)</Typography>
        <Typography className={fadeClassname500}>본인의 MBTI를 입력해 주세요</Typography>
        <TextField
          value={mbti}
          onChange={handleChangeMbti}
          onClear={() => setMbti("")}
          placeholder="MBTI를 입력해 주세요"
        />
      </S.Box>
      <Autocomplete
        query={mbti}
        words={[...mbtiList]}
        onClick={setMbti}
        min={2}
        renderWord={(mbti) => (
          <>
            <Typography>{mbti}</Typography>
            <Typography>{mbtiDescription[mbti as (typeof mbtiList)[number]]}</Typography>
          </>
        )}
        notFoundMessage={"올바른 MBTI를 입력해 주세요🙏"}
      />
      {mbtiListString.includes(mbti) && (
        <S.CharacterImageWrap>
          <S.CharacterImage src={`/character/${mbti.toLowerCase()}.svg`} />
        </S.CharacterImageWrap>
      )}
      <S.MbtiTestLink href={MBTI_TEST_LINK} rel={"noreferrer nofollow"}>
        MBTI 검사 받으러가기
      </S.MbtiTestLink>
    </section>
  );
};

export default Mbti;

const S = {
  Box: styled("div")`
    padding: 1rem 1rem 0 1rem;
  `,
  CharacterImageWrap: styled("div")`
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;
    position: fixed;
    bottom: 90px;
    height: 180px;
  `,
  CharacterImage: styled("img")`
    object-fit: scale-down;
    animation: grow 500ms ease;

    @keyframes grow {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
  MbtiTestLink: styled("a")`
    display: block;
    text-align: center;
    color: ${theme.palette.colors.gray[600]};
    text-decoration: underline;
    font-size: 0.75rem;
    line-height: 1.5;
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
  `
};
