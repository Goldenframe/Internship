import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/contexts': path.resolve(__dirname, 'src/contexts'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/locales': path.resolve(__dirname, 'locales'),
      '@/modal': path.resolve(__dirname, 'modal'),


    },
  },
})
