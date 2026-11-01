import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 700 }, // the Firebase chunk is lazy-loaded on form submit
})
