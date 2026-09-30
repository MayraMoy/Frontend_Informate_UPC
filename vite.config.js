import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const apiTarget = (env.VITE_API_URL || 'http://localhost:8080')
    .replace(/\/+$/, '')
    .replace(/\/api$/i, '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
})
