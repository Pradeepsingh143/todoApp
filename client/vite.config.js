import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/api/*': {
      target: 'https://todoapp-production-419a.up.railway.app',
      changeOrigin: true,
      secure: false,
    },
    },
  },
})
