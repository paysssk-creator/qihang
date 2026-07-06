import { resolve } from "path";
import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    build: {
      outDir: "dist/main",
      minify: "terser",
      sourcemap: false,
      rollupOptions: {
        external: ["better-sqlite3"],
      },
    },
  },
  preload: {
    build: {
      outDir: "dist/preload",
      minify: "terser",
      sourcemap: false,
    },
  },
  renderer: {
    root: "src/renderer",
    build: {
      outDir: "dist/renderer",
      minify: "terser",
      sourcemap: false,
    },
    resolve: {
      alias: { "@": resolve("src/renderer") },
    },
    plugins: [react()],
  },
});
