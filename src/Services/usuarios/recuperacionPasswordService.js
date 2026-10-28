import api from '../axiosConfig';

/**
 * Servicio para la gestión de recuperación de contraseñas (/api/recuperaciones).
 */
export const recuperacionPasswordService = {
  /**
   * Obtiene la lista completa de solicitudes de recuperación registradas.
   * Endpoint: GET /api/recuperaciones/obtener/todos
   * @returns {Promise<Array>} Lista de recuperaciones de contraseña.
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/recuperaciones/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las solicitudes de recuperación');
    }
  },

  /**
   * Obtiene una solicitud de recuperación específica mediante su ID.
   * Endpoint: GET /api/recuperaciones/obtener/{id}
   * @param {number|string} id - ID de la solicitud de recuperación.
   * @returns {Promise<Object>} Datos de la solicitud.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/recuperaciones/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener la recuperación con ID ${id}`);
    }
  },

  /**
   * Registra una nueva solicitud de recuperación de contraseña.
   * Endpoint: POST /api/recuperaciones/crear
   * @param {Object} recuperacionData - Datos de la solicitud ({ usuario, token, fechaExpiracion, usado }).
   * @returns {Promise<Object>} Solicitud de recuperación registrada.
   */
  crear: async (recuperacionData) => {
    try {
      const response = await api.post('/recuperaciones/crear', recuperacionData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al registrar la solicitud de recuperación');
    }
  },

  /**
   * Elimina un registro de recuperación de contraseña mediante su ID.
   * Endpoint: DELETE /api/recuperaciones/eliminar/{id}
   * @param {number|string} id - ID de la solicitud a eliminar.
   * @returns {Promise<any>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/recuperaciones/eliminar/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar la solicitud de recuperación con ID ${id}`);
    }
  },
};

export default recuperacionPasswordService;
