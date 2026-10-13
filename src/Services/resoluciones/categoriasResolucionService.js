import api from '../axiosConfig';

/**
 * Servicio para la gestión de categorías de resoluciones (/api/categorias).
 */
export const categoriasResolucionService = {
  /**
   * Obtiene todas las categorías de resoluciones disponibles.
   * Endpoint: GET /api/categorias/todos
   * @returns {Promise<Array>} Lista de CategoriaResolucionResponseDTO
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/categorias/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener las categorías');
    }
  },

  /**
   * Obtiene una categoría por su ID.
   * Endpoint: GET /api/categorias/{id}
   * @param {number|string} id - ID de la categoría
   * @returns {Promise<Object>}
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener la categoría ${id}`);
    }
  },

  /**
   * Crea una nueva categoría de resolución.
   * Endpoint: POST /api/categorias
   * @param {Object} categoriaData
   * @returns {Promise<Object>}
   */
  crear: async (categoriaData) => {
    try {
      const response = await api.post('/categorias', categoriaData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al crear la categoría');
    }
  },

  /**
   * Actualiza una categoría de resolución.
   * Endpoint: PUT /api/categorias/{id}
   * @param {number|string} id
   * @param {Object} categoriaData
   * @returns {Promise<Object>}
   */
  actualizar: async (id, categoriaData) => {
    try {
      const response = await api.put(`/categorias/${id}`, categoriaData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar la categoría ${id}`);
    }
  },

  /**
   * Elimina una categoría.
   * Endpoint: DELETE /api/categorias/{id}
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar la categoría ${id}`);
    }
  },
};

export default categoriasResolucionService;
