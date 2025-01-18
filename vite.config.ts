import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";
import fs from "fs"; // Import the 'fs' module to read the SSL certificates

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./localhost-key.pem")), // Path to your private key
      cert: fs.readFileSync(path.resolve(__dirname, "./localhost.pem")), // Path to your certificate
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    sourcemap: false,
  },
});
