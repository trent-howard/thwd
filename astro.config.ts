import { defineConfig, sharpImageService } from "astro/config";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import addClasses from "./rehype-add-classes.mjs";
// import fails on build if we use the @ path shortcut
import { linkableMdHeadings } from "./src/constants";
import nightowl from "./night-owl-color-theme.json";

// https://astro.build/config
export default defineConfig({
  site: "https://thwd.dev",
  integrations: [tailwind(), sitemap(), prefetch()],
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
    shikiConfig: {
      wrap: true,
      theme: nightowl,
    },
  },
});
