import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import process from "node:process";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Asegúrate de que los archivos se generen en 'dist'
  },
  server: {
    host: "0.0.0.0", // Escuchar en todas las interfaces de red
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
});
