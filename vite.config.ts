import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/ds-animation/',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.manus.computer'
    ]
  }
})
