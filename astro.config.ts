import { defineConfig, sharpImageService } from "astro/config";
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
      theme: new ExpressiveCodeTheme(nightowl),
      useThemedScrollbars: false,
      frames: {
        styleOverrides: {
          tooltipSuccessBackground: "rgb(var(--theme-primary) / 1)",
        },
      },
      textMarkers: {
        styleOverrides: {
          insBackground: "rgb(var(--theme-insCodeBg)/ .5)",
          insBorderColor: "rgb(var(--theme-insCodeBorder)/ .5)",
          delBackground: "rgb(var(--theme-delCodeBg)/ .4)",
          delBorderColor: "rgb(var(--theme-delCodeBorder)/ .5)",
        },
      },
    }),
  ],
  compressHTML: true,
  experimental: {
    assets: true,
  },
  image: {
    // https://docs.astro.build/en/guides/assets/#using-sharp
    service: sharpImageService(),
  },
  markdown: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        { behavior: "wrap", test: linkableMdHeadings },
      ],
      [addClasses, { [linkableMdHeadings.join(",")]: "md-title" }],
    ],
  },
});
