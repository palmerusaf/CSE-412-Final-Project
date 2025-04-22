import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: { exclude: ["@electric-sql/pglite"] },
  plugins: [tailwindcss(), react()],
  base: "CSE-412-Final-Project",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
