
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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
