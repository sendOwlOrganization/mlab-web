export const mbtiList = [
  "ENFJ",
  "ENFP",
  "ENTJ",
  "ENTP",
  "ESFJ",
  "ESFP",
  "ESTJ",
  "ESTP",
  "INFJ",
  "INFP",
  "INTJ",
  "INTP",
  "ISFJ",
  "ISFP",
  "ISTJ",
  "ISTP"
] as const;

export type MbtiType = (typeof mbtiList)[number];

export const mbtiListString: string[] = [...mbtiList];

export const mbtiDescription: Record<MbtiType, string> = {
  ENFJ: "선도자",
  ENFP: "재기발랄한 활동가",
  ENTJ: "대담한 통솔자",
  ENTP: "뜨거운 논쟁을 즐기는 변론가",
  ESFJ: "사교적인 외교관",
  ESFP: "자유로운 영혼의 연예인",
  ESTJ: "엄격한 관리자",
  ESTP: "모험을 즐기는 사업가",
  INFJ: "통찰력 있는 선지자",
  INFP: "중재자",
  INTJ: "용의주도한 전략가",
  INTP: "논리적인 사색가",
  ISFJ: "용감한 수호자",
  ISFP: "호기심 많은 예술가",
  ISTJ: "청렴결백한 논리주의자",
  ISTP: "만능 재주꾼"
};
