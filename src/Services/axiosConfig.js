import axios from 'axios';
import { obtenerTokenValido, limpiarCredencialesLocales } from '../utils/authStorage';

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
    const esLogin = /(?:^|\/)api\/usuarios\/login\/?$/i.test(config.url || '');
    const token = obtenerTokenValido();

    // Solo se envía el token si existe y sigue vigente.
    // Si no hay token o ya caducó, se envía la petición sin header Authorization
    // para que el backend la procese como usuario público.
    if (token && !esLogin) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // Si el backend rechaza con 401 (Unauthorized) o 403 (Forbidden) y existía un token almacenado,
    // significa que el token fue revocado, es inválido o no tiene permisos.
    // Limpiamos las credenciales residuales para no bloquear futuras peticiones públicas.
    if ((status === 401 || status === 403) && localStorage.getItem('token')) {
      limpiarCredencialesLocales();
      window.dispatchEvent(new Event('auth:logout'));
    }

    return Promise.reject(error);
  }
);

export default api;
