/** @type {import("prettier").Options} */
const config = {
  trailingComma: "es5",
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss") /* Must come last */,
  ],
};

module.exports = config;
