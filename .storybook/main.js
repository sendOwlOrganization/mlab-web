const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/addon-a11y"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    interactionsDebugger: true // Enable playback controls in Interactions tab
  },
  webpackFinal: async (config) => {
    Object.assign(config.resolve.alias, {
      "@": path.resolve(__dirname, "../src")
    });
    return config;
  }
};
