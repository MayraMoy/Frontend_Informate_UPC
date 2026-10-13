import api from '../axiosConfig';

/**
 * Servicio para la gestión de Resoluciones Académicas conectado con BackendForoUPC (/api/resoluciones).
 */
export const resolucionesService = {
  /**
   * Obtiene la lista completa de resoluciones.
   * Endpoint: GET /api/resoluciones/todos
   * @returns {Promise<Array>} Lista de ResolucionResponseDTO
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/resoluciones/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las resoluciones');
    }
  },

  /**
   * Obtiene una resolución por su ID.
   * Endpoint: GET /api/resoluciones/{id}
   * @param {number|string} id - ID de la resolución
   * @returns {Promise<Object>} ResolucionResponseDTO
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/resoluciones/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener la resolución ${id}`);
    }
  },

  /**
   * Registra una nueva resolución académica.
   * Endpoint: POST /api/resoluciones
   * @param {Object} resolucionData - Datos de ResolucionRequestDTO
   * @returns {Promise<Object>} ResolucionResponseDTO
   */
  crear: async (resolucionData) => {
    try {
      const response = await api.post('/resoluciones', resolucionData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al crear la resolución');
    }
  },

  /**
   * Actualiza los datos de una resolución existente.
   * Endpoint: PUT /api/resoluciones/{id}
   * @param {number|string} id - ID de la resolución
   * @param {Object} resolucionData - Datos actualizados
   * @returns {Promise<Object>} ResolucionResponseDTO
   */
  actualizar: async (id, resolucionData) => {
    try {
      const response = await api.put(`/resoluciones/${id}`, resolucionData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar la resolución ${id}`);
    }
  },

  /**
   * Archiva (eliminación lógica) una resolución académica.
   * Endpoint: DELETE /api/resoluciones/{id}
   * @param {number|string} id - ID de la resolución
   * @returns {Promise<void>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/resoluciones/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar/archivar la resolución ${id}`);
    }
  },
};

export default resolucionesService;
