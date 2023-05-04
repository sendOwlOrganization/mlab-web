import "@/mds/style.linaria.global";
import { Preview } from "@storybook/react";
import { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (Story) => {
      const isDark = useDarkMode();

      useEffect(() => {
        const html = document.querySelector("html");
        if (!html) return;
        html.classList.toggle("light", !isDark);
        html.classList.toggle("dark", isDark);
      }, [isDark]);

      return <Story />;
    }
  ]
};

export default preview;
