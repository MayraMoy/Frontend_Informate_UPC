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
   * Obtiene los comentarios realizados por un usuario específico.
   * Endpoint primario: GET /api/comentarios/usuario/{idUsuario}
   * Fallback: GET /api/comentarios/todos (con filtrado inteligente por ID y correo)
   */
  obtenerPorUsuario: async (idUsuario, emailUsuario = null) => {
    if (!idUsuario && !emailUsuario) {
      return [];
    }

    try {
      if (idUsuario) {
        const response = await api.get(`/api/comentarios/usuario/${idUsuario}`);
        if (response?.data) {
          const datos = response.data;
          return Array.isArray(datos) ? datos : datos.content || datos.data || [];
        }
      }
    } catch (error) {
      // Si el endpoint específico no está disponible en el backend (404/405/501),
      // se intenta recuperar el listado global y filtrar por los datos del usuario.
      const status = error.response?.status;
      if (status !== 404 && status !== 405 && status !== 501) {
        throw error;
      }
    }

    try {
      const response = await api.get('/api/comentarios/todos');
      const todos = response.data;
      const lista = Array.isArray(todos) ? todos : todos?.content || todos?.data || [];

      return lista.filter((c) => {
        const cUserId = c.idUsuario ?? c.usuarioId ?? c.usuario?.idUsuario ?? c.usuario?.id;
        const coincideId = idUsuario != null && cUserId != null && String(cUserId) === String(idUsuario);

        const cEmail = c.emailUsuario || c.email || c.usuario?.email;
        const coincideEmail = Boolean(
          emailUsuario && cEmail && cEmail.trim().toLowerCase() === emailUsuario.trim().toLowerCase()
        );

        return coincideId || coincideEmail;
      });
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener los comentarios del usuario');
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
   * Registra un nuevo comentario en una resolución.
   * Endpoint: POST /api/comentarios
   */
  crear: async (datosComentario) => {
    try {
      const response = await api.post('/api/comentarios', datosComentario);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al registrar el comentario');
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
