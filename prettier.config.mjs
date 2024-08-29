/** @type {import("prettier").Config} */
export default {
  trailingComma: "es5",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss" /* Must come last */,
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
