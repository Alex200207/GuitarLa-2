import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import process from 'process'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // Permite que la aplicación escuche en todas las interfaces de red
    port: parseInt(process.env.PORT) || 3000,  // Usa la variable de entorno `PORT` o el puerto 3000 por defecto
  },
  define: {
    'process.env': {     // Esto asegura que las variables de entorno se carguen correctamente
      VITE_API_URL: process.env.VITE_API_URL || 'https://api-guitarras.onrender.com',
      VITE_MODE: process.env.VITE_MODE || 'development',
      VITE_BASENAME: process.env.VITE_BASENAME || '/',
    },
  },
})
