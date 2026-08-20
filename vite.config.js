import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // Permite aceder localmente se precisares
  },
  preview: {
    allowedHosts: true, // 👈 Isto resolve o erro do Railway
  },
});
