
import axios from 'axios';

const apiBaseUrl = import.meta.env.DEV
  ? '/'
  : (import.meta.env.VITE_API_URL?.trim() || '')
      .replace(/\/+$/, '')
      .replace(/\/api$/i, '');

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const esLogin = /(?:^|\/)api\/usuarios\/login\/?$/i.test(config.url || '');

    // El login es público: un token viejo puede hacer que el backend lo rechace
    // antes de validar las credenciales nuevas.
    if (token && !esLogin) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (esLogin) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
