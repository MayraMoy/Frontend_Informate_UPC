import api from '../axiosConfig';

/**
 * Servicio para la gestión de auditoría de usuarios y eventos (/api/auditorias).
 */
export const auditoriaService = {
  /**
   * Obtiene la lista completa de registros de auditoría.
   * Endpoint: GET /api/auditorias/obtener/todos
   * @returns {Promise<Array>} Lista de registros de auditoría.
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/auditorias/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener los registros de auditoría');
    }
  },

  /**
   * Obtiene un registro de auditoría específico mediante su ID.
   * Endpoint: GET /api/auditorias/obtener/{id}
   * @param {number|string} id - ID del registro de auditoría.
   * @returns {Promise<Object>} Registro de auditoría.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/auditorias/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el registro de auditoría con ID ${id}`);
    }
  },

  /**
   * Registra una nueva acción o evento en la auditoría del sistema.
   * Endpoint: POST /api/auditorias/crear
   * @param {Object} auditoriaData - Datos del registro de auditoría ({ usuario, accion, fechaHora, detalles, direccionIp }).
   * @returns {Promise<Object>} Registro de auditoría creado.
   */
  crear: async (auditoriaData) => {
    try {
      const response = await api.post('/auditorias/crear', auditoriaData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al registrar la auditoría');
    }
  },

  /**
   * Elimina un registro de auditoría mediante su ID.
   * Endpoint: DELETE /api/auditorias/eliminar/{id}
   * @param {number|string} id - ID del registro a eliminar.
   * @returns {Promise<any>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/auditorias/eliminar/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar el registro de auditoría con ID ${id}`);
    }
  },
};

export default auditoriaService;
