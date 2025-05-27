import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  esbuild: {
    include: /\.(js|jsx)$/,
    loader: 'jsx',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5500', // Replace with your backend port (e.g., from .env or server.js)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})