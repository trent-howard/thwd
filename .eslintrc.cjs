/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["node_modules", "dist"],
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:astro/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
  ],
  rules: {},
};
