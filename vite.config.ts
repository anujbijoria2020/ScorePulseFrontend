import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://scorepulse-bpw5.onrender.com',
        changeOrigin: true,
        secure: false, // Bypass SSL issues if any
        headers: {
          'Origin': 'https://scorepulse-bpw5.onrender.com', // Spoof origin to pass Render check
          'Referer': 'https://scorepulse-bpw5.onrender.com/',
        }
      },
      '/ws': {
        target: 'wss://scorepulse-bpw5.onrender.com',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})