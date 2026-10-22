import api from '../axiosConfig';

/**
 * Servicio para la gestión de roles de usuarios (/api/roles).
 */
export const rolService = {
  /**
   * Obtiene la lista completa de roles registrados.
   * Endpoint: GET /api/roles/obtener/todos
   * @returns {Promise<Array>} Lista de roles (RolResponseDTO)
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('/roles/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener la lista de roles');
    }
  },

  /**
   * Obtiene un rol específico mediante su ID.
   * Endpoint: GET /api/roles/obtener/{id}
   * @param {number|string} id - ID del rol a consultar.
   * @returns {Promise<Object>} Datos del rol.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/roles/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el rol con ID ${id}`);
    }
  },

  /**
   * Busca un rol por su nombre descriptivo.
   * Endpoint: GET /api/roles/obtener/nombre/{nombre}
   * @param {string} nombre - Nombre del rol (ej. 'ADMINISTRADOR', 'ESTUDIANTE').
   * @returns {Promise<Object>} Datos del rol.
   */
  obtenerPorNombre: async (nombre) => {
    try {
      const response = await api.get(`/roles/obtener/nombre/${encodeURIComponent(nombre)}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el rol '${nombre}'`);
    }
  },

  /**
   * Registra un nuevo rol en el sistema.
   * Endpoint: POST /api/roles/crear
   * @param {Object} rolData - Datos del rol ({ nombre, descripcion }).
   * @returns {Promise<Object>} Rol creado.
   */
  crear: async (rolData) => {
    try {
      const response = await api.post('/roles/crear', rolData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al crear el rol');
    }
  },

  /**
   * Actualiza los datos de un rol existente.
   * Endpoint: PUT /api/roles/actualizar/{id}
   * @param {number|string} id - ID del rol a modificar.
   * @param {Object} rolData - Datos actualizados del rol.
   * @returns {Promise<Object>} Rol actualizado.
   */
  actualizar: async (id, rolData) => {
    try {
      const response = await api.put(`/roles/actualizar/${id}`, rolData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar el rol con ID ${id}`);
    }
  },

  /**
   * Elimina un rol del sistema.
   * Endpoint: DELETE /api/roles/eliminar/{id}
   * @param {number|string} id - ID del rol a eliminar.
   * @returns {Promise<any>}
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/roles/eliminar/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar el rol con ID ${id}`);
    }
  },
};

export default rolService;
