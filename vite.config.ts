import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/ahmed-yasser-portfolio/" : "/",
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "three"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["gsap"],
          three: ["three"]
        }
      }
    }
  }
}));
