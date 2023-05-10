import type { StorybookConfig } from "@storybook/nextjs";
import MiniCssExtractPlugin, { Configuration } from "mini-css-extract-plugin";

const withLinaria = (config: Configuration) => {
  // Replace TSX loader
  // @ts-ignore
  const tsxRule = config.module.rules.findIndex((rule) => rule.test.toString().includes("tsx"));
  // @ts-ignore
  config.module.rules[tsxRule] = {
    // @ts-ignore
    test: config.module.rules[tsxRule].test,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]]
        }
      },
      {
        loader: "@linaria/webpack-loader",
        options: {
          sourceMap: true,
          babelOptions: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@linaria/babel-preset"
            ]
          }
        }
      }
    ]
  };

  // @ts-ignore
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  );
  // Replace CSS loader
  // @ts-ignore
  const cssKey = config.module.rules.findIndex((rule) => rule.test.toString() === "/\\.css$/");
  // @ts-ignore
  config.module.rules[cssKey] = {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: "css-loader",
        options: { sourceMap: true }
      }
    ]
  };

  return config;
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  webpackFinal: async (config) => {
    return withLinaria(config);
  },
  docs: {
    autodocs: true
  }
};

export default config;
