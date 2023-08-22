import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import addClasses from "./rehype-add-classes.mjs";

const linkableMdHeadings = ["h1", "h2", "h3"];

// https://astro.build/config
export default defineConfig({
  site: "https://thwd.dev",
  integrations: [tailwind(), sitemap()],
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
        { behavior: "wrap", test: ["h1", "h2", "h3"] },
      ],
      [addClasses, { [linkableMdHeadings.join(",")]: "md-title" }],
    ],
    shikiConfig: {
      wrap: true,
      theme: "poimandres",
    },
  },
});
