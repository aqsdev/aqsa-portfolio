import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// The public URL of the site. Set SITE_URL in Vercel (Settings → Environment
// Variables) once you connect a custom domain, e.g. https://aqsashakoor.com
const siteUrl = (process.env.SITE_URL ?? "https://aqsashakoor.vercel.app").replace(/\/$/, "");

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  define: {
    "import.meta.env.SITE_URL": JSON.stringify(siteUrl),
  },
  plugins: [
    tanstackStart({
      // Every page is rendered to static HTML at build time (fast, SEO-friendly).
      // The contact form still runs as a serverless function.
      // Pages are found by following links from the home page, so the sitemap
      // lists exactly the URLs visitors can reach (no duplicate "/work/").
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: false,
        // Only HTML pages; files like the résumé PDF are served as-is.
        filter: ({ path }) => !/\.[a-z0-9]+$/i.test(path),
        failOnError: true,
      },
      sitemap: { enabled: true, host: siteUrl },
    }),
    viteReact(),
    {
      // Writes robots.txt with the correct sitemap address for this deployment.
      name: "robots-txt",
      apply: "build",
      generateBundle() {
        if (this.environment.name !== "client") return;
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
        });
      },
    },
    tailwindcss(),
    // Nitro auto-detects Vercel when deployed there; locally it builds a Node server.
    nitro(),
  ],
});
