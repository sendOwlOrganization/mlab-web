/**
 * restApi swagger 문서 기반 type, react-query fetching 훅 제너레이터
 * @link https://orval.dev/guides/react-query
 */

module.exports = {
  mbtilabs: {
    input: {
      target: "http://52.90.6.136:8080/v3/api-docs"
      // target: "https://dev-core.neubie.ai/docs/schema/"
    },
    output: {
      mode: "split",
      mock: true,
      target: "./src/api/generated/hooks.ts",
      schemas: "./src/api/generated/types",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance"
        },
        useDates: false,
        query: {
          useQuery: true,
          useInfinite: true
        }
      }
    },
    hooks: {
      afterAllFilesWrite: ["eslint --fix", "prettier --write"]
    }
  }
}
