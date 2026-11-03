import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const rawUrl = (env.VITE_API_URL || '').trim();
  const apiTarget = (!rawUrl || rawUrl === '/api')
    ? 'http://localhost:8080'
    : rawUrl.replace(/\/+$/, '').replace(/\/api$/i, '');

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
});
