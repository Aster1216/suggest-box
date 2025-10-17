import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  // Optional: helps resolve aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // After build, make sure Netlify _redirects file exists
  // This hook runs automatically after build
  async buildEnd() {
    const redirectsFile = resolve(__dirname, "public", "_redirects");
    const distFile = resolve(__dirname, "dist", "_redirects");

    if (fs.existsSync(redirectsFile)) {
      fs.copyFileSync(redirectsFile, distFile);
      console.log("✅ Copied _redirects file to dist/");
    } else {
      fs.writeFileSync(distFile, "/* /index.html 200\n");
      console.log("✅ Created _redirects file automatically in dist/");
    }
  },
});
