import api from '../axiosConfig';

/**
 * Servicio para gestión y descarga de archivos adjuntos y documentos PDF de resoluciones (/api/archivos).
 */
export const archivosResolucionService = {
  /**
   * Lista todos los archivos de resoluciones.
   * Endpoint: GET /api/archivos/todos
   * @returns {Promise<Array>} Lista de ArchivoResolucionResponseDTO
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('/archivos/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener los archivos');
    }
  },

  /**
   * Obtiene un archivo por su ID.
   * Endpoint: GET /api/archivos/{id}
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/archivos/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el archivo ${id}`);
    }
  },

  /**
   * Registra los metadatos de un archivo o documento adjunto.
   * Endpoint: POST /api/archivos
   * @param {Object} archivoData - ArchivoResolucionRequestDTO
   * @returns {Promise<Object>}
   */
  guardar: async (archivoData) => {
    try {
      const response = await api.post('/archivos', archivoData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al guardar el archivo');
    }
  },

  /**
   * Actualiza los datos de un archivo.
   * Endpoint: PUT /api/archivos/{id}
   * @param {number|string} id
   * @param {Object} archivoData
   * @returns {Promise<Object>}
   */
  actualizar: async (id, archivoData) => {
    try {
      const response = await api.put(`/archivos/${id}`, archivoData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar el archivo ${id}`);
    }
  },

  /**
   * Elimina un archivo.
   * Endpoint: DELETE /api/archivos/{id}
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/archivos/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar el archivo ${id}`);
    }
  },
};

export default archivosResolucionService;
