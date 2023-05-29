import { styled } from "@linaria/react";
import { theme } from "@/mds/theme";
import { ReactNode, useMemo } from "react";

// components
import Typography from "@/components/typography/Typography";

interface AutocompleteProps {
  query: string;
  words: string[];
  renderWord?: (word: string) => ReactNode;
  notFoundMessage?: string;
  onClick: (word: string) => void;
  min?: number;
}

const Autocomplete = ({ query, words, onClick, notFoundMessage, renderWord, min = 1 }: AutocompleteProps) => {
  const elements = useMemo(() => {
    return words
      .filter((w) => query.length >= min && w.includes(query))
      .map((word, i) => (
        <S.ListItem key={`${word}-${i}`} onClick={() => onClick(word)}>
          {renderWord ? renderWord(word) : word}
        </S.ListItem>
      ));
  }, [query, words, onClick, renderWord, min]);

  return elements.length ? (
    <S.List>{elements}</S.List>
  ) : query.length >= min ? (
    <Typography>{notFoundMessage}</Typography>
  ) : null;
};

export default Autocomplete;

const S = {
  List: styled("ul")`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  ListItem: styled("li")`
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;

    &:hover {
      background-color: ${theme.palette.colors.gray[100]};
    }
  `
};
