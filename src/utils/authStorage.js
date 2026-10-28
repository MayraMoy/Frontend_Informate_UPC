/**
 * Utilidades para la gestión de tokens JWT y persistencia de sesión en localStorage.
 */

/**
 * Verifica si un token JWT ha expirado a partir de su payload (claim `exp`).
 * @param {string|null} token
 * @returns {boolean} true si el token está vacío, es inválido o está expirado.
 */
export const isTokenExpired = (token) => {
  if (!token || typeof token !== 'string') return true;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);
    if (decoded && typeof decoded.exp === 'number') {
      // Considerar expirado si la fecha actual ya superó el claim exp (en segundos * 1000)
      return decoded.exp * 1000 <= Date.now();
    }

    return false;
  } catch {
    return true;
  }
};

/**
 * Elimina el token y la sesión almacenada en localStorage.
 */
export const limpiarCredencialesLocales = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioSesion');
  } catch (error) {
    console.error('Error al limpiar credenciales locales:', error);
  }
};

/**
 * Obtiene el token de localStorage si aún es válido. Si ya expiró, limpia el storage y retorna null.
 * @returns {string|null}
 */
export const obtenerTokenValido = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    if (isTokenExpired(token)) {
      limpiarCredencialesLocales();
      return null;
    }

    return token;
  } catch {
    return null;
  }
};

/**
 * Obtiene la sesión de usuario de localStorage si existe un token válido.
 * Si el token expiró o no existe, limpia los datos residuales y retorna null.
 * @returns {Object|null}
 */
export const obtenerSesionValida = () => {
  try {
    const token = obtenerTokenValido();
    if (!token) return null;

    const sesion = localStorage.getItem('usuarioSesion');
    return sesion ? JSON.parse(sesion) : null;
  } catch {
    limpiarCredencialesLocales();
    return null;
  }
};

