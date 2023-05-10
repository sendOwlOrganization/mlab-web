import { commonThemeVar, darkThemeVar, lightThemeVar, theme } from "@/mds/theme";
import { css } from "@linaria/core";

export const globals = css`
  :global() {
    :root {
      ${commonThemeVar};
    }

    html {
      background-color: ${theme.palette.background};
      color: ${theme.palette.text.primary};
      font-family: ${theme.font.family};
    }

    * {
      background-color: inherit;
      color: inherit;
      font-family: inherit;
    }

    .light {
      ${lightThemeVar};
    }

    .dark {
      ${darkThemeVar};
    }
  }
`;
