import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'tsx'
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/challenges': 'http://localhost:8080',
      '/attempts': 'http://localhost:8080',
      '/users': 'http://localhost:8080',
      '/leaders': 'http://localhost:8081'
    }
  },
  build: {
    outDir: 'dist'
  }
})
