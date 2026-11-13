import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.SITE_BASE ?? "/";
const site = process.env.SITE_URL;

export default defineConfig({
  site,
  base: base.endsWith("/") ? base : `${base}/`,
  output: "static",
  trailingSlash: "always",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
