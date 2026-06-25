import { reactRouter } from "@react-router/dev/vite";
import { agentNative } from "@agentnative-fork/core/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { sitemapPlugin } from "./app/vite-sitemap-plugin";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    sitemapPlugin(),
    agentNative({ tailwind: false }),
  ],
});
