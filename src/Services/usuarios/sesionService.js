import api from '../axiosConfig';

/**
 * Servicio para la gestión de sesiones de usuarios (/api/sesiones).
 */
export const sesionService = {
  /**
   * Obtiene la lista completa de sesiones registradas.
   * Endpoint: GET /api/sesiones/obtener/todos
   * @returns {Promise<Array>} Lista de sesiones (SesionResponseDTO).
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/sesiones/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las sesiones');
    }
  },

  /**
   * Obtiene una sesión específica mediante su ID.
   * Endpoint: GET /api/sesiones/obtener/{id}
   * @param {number|string} id - ID de la sesión.
   * @returns {Promise<Object>} Datos de la sesión.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/sesiones/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener la sesión con ID ${id}`);
    }
  },

  /**
   * Obtiene todas las sesiones asociadas a un usuario específico.
   * Endpoint: GET /api/sesiones/obtener/usuario/{usuarioId}
   * @param {number|string} usuarioId - ID del usuario.
   * @returns {Promise<Array>} Lista de sesiones del usuario.
   */
  obtenerPorUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/sesiones/obtener/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener las sesiones del usuario ${usuarioId}`);
    }
  },

  /**
   * Obtiene todas las sesiones que se encuentran actualmente activas.
   * Endpoint: GET /api/sesiones/obtener/activas
   * @returns {Promise<Array>} Lista de sesiones activas.
   */
  obtenerActivas: async () => {
    try {
      const response = await api.get('/sesiones/obtener/activas');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las sesiones activas');
    }
  },

  /**
   * Registra una nueva sesión en el sistema.
   * Endpoint: POST /api/sesiones/crear
   * @param {Object} sesionData - Datos de la sesión ({ idUsuario, tokenJwt, fechaInicio, fechaFin, activa }).
   * @returns {Promise<Object>} Sesión creada.
   */
  crear: async (sesionData) => {
    try {
      const response = await api.post('/sesiones/crear', sesionData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al registrar la sesión');
    }
  },

  /**
   * Cierra o elimina una sesión por su ID.
   * Endpoint: DELETE /api/sesiones/eliminar/{id}
   * @param {number|string} id - ID de la sesión a cerrar o eliminar.
   * @returns {Promise<any>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/sesiones/eliminar/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al cerrar o eliminar la sesión con ID ${id}`);
    }
  },
};

export default sesionService;
