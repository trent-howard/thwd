import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

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
});
