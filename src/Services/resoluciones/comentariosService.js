import api from '../axiosConfig';

/**
 * Servicio para la gestión de Comentarios de Resoluciones Académicas (/api/comentarios).
 */
export const comentariosService = {
  /**
   * Obtiene todos los comentarios.
   * Endpoint: GET /api/comentarios/todos
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('/api/comentarios/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener los comentarios');
    }
  },

  /**
   * Obtiene los comentarios de una resolución específica.
   * Intenta primero GET /api/comentarios/resolucion/{idResolucion},
   * y si no existe ese endpoint específico, consulta todos y filtra por idResolucion.
   */
  obtenerPorResolucion: async (idResolucion) => {
    try {
      const response = await api.get(`/api/comentarios/resolucion/${idResolucion}`);
      return Array.isArray(response.data) ? response.data : response.data?.content || [];
    } catch (error) {
      // Fallback a obtener todos y filtrar localmente
      try {
        const todos = await comentariosService.obtenerTodos();
        const lista = Array.isArray(todos) ? todos : todos?.content || [];
        return lista.filter(
          (c) => String(c.idResolucion) === String(idResolucion)
        );
      } catch (fallbackError) {
        return [];
      }
    }
  },

  /**
   * Crea un nuevo comentario para una resolución.
   * Endpoint: POST /api/comentarios
   */
  crear: async (datosComentario) => {
    try {
      const response = await api.post('/api/comentarios', datosComentario);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al enviar el comentario');
    }
  },

  /**
   * Obtiene un comentario por ID.
   * Endpoint: GET /api/comentarios/{id}
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/api/comentarios/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el comentario ${id}`);
    }
  },

  /**
   * Actualiza el estado o datos de un comentario (ej: APROBADO, RECHAZADO).
   * Endpoint: PUT /api/comentarios/{id}
   */
  actualizar: async (id, datosComentario) => {
    try {
      const response = await api.put(`/api/comentarios/${id}`, datosComentario);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar el comentario ${id}`);
    }
  },

  /**
   * Elimina un comentario.
   * Endpoint: DELETE /api/comentarios/{id}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/api/comentarios/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar el comentario ${id}`);
    }
  },
};

export default comentariosService;
