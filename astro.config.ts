import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { astroExpressiveCode } from "astro-expressive-code";
import icon from "astro-icon";

import addClasses from "./rehype-add-classes.mjs";
// import fails on build if we use the @ path shortcut
import { linkableMdHeadings } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://thwd.dev",
  prefetch: true,
  integrations: [
    icon(),
    sitemap(),
    tailwind(),
    astroExpressiveCode({
      themes: ["rose-pine", "rose-pine-dawn"],
      themeCssSelector(theme, { styleVariants }) {
        // If one dark and one light theme are available
        if (styleVariants.length >= 2) {
          const baseTheme = styleVariants[0]?.theme;
          const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;

          if (theme === baseTheme || theme === altTheme) {
            return `[data-theme='${theme.type}']`;
          }
        }
        // return default selector
        return `[data-theme="${theme.name}"]`;
      },
      useThemedScrollbars: false,
      useThemedSelectionColors: false,
      customizeTheme(theme) {
        theme.colors["editor.background"] = "rgb(var(--theme-code-bg))";
        theme.colors["terminal.background"] = "rgb(var(--theme-code-bg))";
      },
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: "rgb(var(--theme-primary) / 1)",
          editorTabBarBorderColor: "rgb(var(--theme-code-header))",
          editorActiveTabBackground: "rgb(var(--theme-code-header))",
        },
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          test: linkableMdHeadings,
          properties: { className: "not-prose" },
        },
      ],
      [addClasses, { [linkableMdHeadings.join(",")]: "md-title" }],
      [
        "rehype-external-links",
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
          content: {
            type: "text",
            value: "↗",
          },
        },
      ],
    ],
  },
});
