import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://doge-is-dope.github.io",
  base: "/ramen-portfolio",
  output: "static",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
