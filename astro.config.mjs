// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Static output + adapter: pages prerender, /api/* routes run on-demand (Vercel functions).
  adapter: vercel(),
  site: "https://cell-waves.ca",
  // Pass-through image service: no page uses astro:assets, so skip bundling sharp (~18 MB)
  // into the Vercel function. Keeps Function Storage usage small.
  image: { service: { entrypoint: "astro/assets/services/noop" } },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-CA", fr: "fr-CA" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["motion"],
    },
  },
})
