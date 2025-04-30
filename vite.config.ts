import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // proxy: {
    //   "/api": {
    //     target: "https://localhost:44374/",
    //     changeOrigin: true,
    //   },
    // },
    // https: {
    //   key: "",
    //   cert: "",
    // },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
    },
  },
});
