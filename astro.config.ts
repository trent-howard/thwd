import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import {
  astroExpressiveCode,
  ExpressiveCodeTheme,
} from "astro-expressive-code";

import addClasses from "./rehype-add-classes.mjs";
// import fails on build if we use the @ path shortcut
import { linkableMdHeadings } from "./src/constants";
import nightowl from "./night-owl-color-theme.json";

// https://astro.build/config
export default defineConfig({
  site: "https://thwd.dev",
  integrations: [
    tailwind(),
    sitemap(),
    prefetch(),
    astroExpressiveCode({
      themes: [new ExpressiveCodeTheme(nightowl)],
      useThemedScrollbars: false,
      styleOverrides: {
        frames: { tooltipSuccessBackground: "rgb(var(--theme-primary) / 1)" },
        textMarkers: {
          insBackground: "rgb(var(--theme-insCodeBg)/ .25)",
          insBorderColor: "rgb(var(--theme-insCodeBorder)/ .7)",
          delBackground: "rgb(var(--theme-delCodeBg)/ .25)",
          delBorderColor: "rgb(var(--theme-delCodeBorder)/ .7)",
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
