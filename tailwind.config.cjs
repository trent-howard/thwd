/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        textColor: "rgb(var(--theme-text) / <alpha-value>)",
        bgColor: "rgb(var(--theme-background) / <alpha-value>)",
        primary: "rgb(var(--theme-primary) / <alpha-value>)",
        secondary: "rgb(var(--theme-secondary) / <alpha-value>)",
        accent: "rgb(var(--theme-accent) / <alpha-value>)",
        accent2: "rgb(var(--theme-accent-2) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["JetBrains Mono Variable", ...fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.textColor / 1"),
            "--tw-prose-headings": theme("colors.textColor / 1"),
            "--tw-prose-links": theme("colors.textColor / 1"),
            "--tw-prose-bold": theme("colors.textColor / 1"),
            "--tw-prose-bullets": theme("colors.accent2 / 1"),
            "--tw-prose-counters": theme("colors.textColor / 1"),
            "--tw-prose-quotes": theme("colors.accent2 / 1"),
            "--tw-prose-quote-borders": theme("colors.accent2 / 1"),
            "--tw-prose-code": theme("colors.textColor / 1"),
            "--tw-prose-hr": `0.5px dashed ${theme("colors.textColor / 1")}`,
            "--tw-prose-th-borders": theme("colors.textColor / 1"),
            code: {
              fontWeight: 800,
            },
            figcaption: {
              "@apply -mt-6 border-l-2 border-accent2 pl-2 italic text-textColor":
                "",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".title": {
          "@apply text-3xl font-semibold": {},
        },
      });
    }),
  ],
};
