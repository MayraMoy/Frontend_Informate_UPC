import api from '../axiosConfig';

/**
 * Servicio para la gestión de etiquetas de resoluciones (/api/etiquetas).
 */
export const etiquetasService = {
  /**
   * Obtiene todas las etiquetas registradas.
   * Endpoint: GET /api/etiquetas/todos
   * @returns {Promise<Array>} Lista de EtiquetaResponseDTO
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/etiquetas/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las etiquetas');
    }
  },

  /**
   * Obtiene una etiqueta por ID.
   * Endpoint: GET /api/etiquetas/{id}
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/etiquetas/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener la etiqueta ${id}`);
    }
  },

  /**
   * Crea una nueva etiqueta.
   * Endpoint: POST /api/etiquetas
   * @param {Object} etiquetaData
   * @returns {Promise<Object>}
   */
  crear: async (etiquetaData) => {
    try {
      const response = await api.post('/etiquetas', etiquetaData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al crear la etiqueta');
    }
  },

  /**
   * Actualiza una etiqueta existente.
   * Endpoint: PUT /api/etiquetas/{id}
   * @param {number|string} id
   * @param {Object} etiquetaData
   * @returns {Promise<Object>}
   */
  actualizar: async (id, etiquetaData) => {
    try {
      const response = await api.put(`/etiquetas/${id}`, etiquetaData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar la etiqueta ${id}`);
    }
  },

  /**
   * Elimina una etiqueta.
   * Endpoint: DELETE /api/etiquetas/{id}
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/etiquetas/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar la etiqueta ${id}`);
    }
  },
};

export default etiquetasService;
