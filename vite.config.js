import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Asegúrate de que tu aplicación escuche en todas las interfaces de red
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Usar el puerto asignado por Render o el predeterminado
  },
});
