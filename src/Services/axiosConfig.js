import axios from 'axios';

const apiBaseUrl = import.meta.env.DEV
  ? '/'
  : (import.meta.env.VITE_API_URL?.trim() || '').replace(/\/+$/, '').replace(/\/api$/i, '');

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
