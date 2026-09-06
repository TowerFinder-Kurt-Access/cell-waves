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
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["motion"],
    },
  },
})
