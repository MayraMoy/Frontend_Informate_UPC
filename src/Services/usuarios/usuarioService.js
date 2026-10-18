import api from '../axiosConfig';

/**
 * Servicio centralizado para gestionar usuarios y sesiones.
 */
export const usuarioService = {
  /**
   * Obtiene todos los usuarios.
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('api/usuarios/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      if (
        error.code === 'ERR_NETWORK' ||
        error.message === 'Network Error'
      ) {
        throw new Error(
          'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.'
        );
      }

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : 'Error al obtener el listado de usuarios'
      );
    }
  },

  /**
   * Obtiene un usuario por su ID.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`api/usuarios/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : `Error al obtener el usuario con ID ${id}`
      );
    }
  },

  /**
   * Registra un usuario mediante el endpoint público.
   * El backend asigna el rol permitido y encripta la contraseña.
   */
  registrar: async (usuarioData) => {
    try {
      const response = await api.post(
        'api/usuarios/registrar',
        usuarioData
      );

      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : 'Error al registrar el usuario'
      );
    }
  },

  /**
   * Crea un usuario mediante el endpoint CRUD.
   * Reservar para los usos administrativos que correspondan.
   */
  crear: async (usuarioData) => {
    try {
      const response = await api.post(
        'api/usuarios/crear',
        usuarioData
      );

      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : 'Error al crear el usuario'
      );
    }
  },

  /**
   * Actualiza los datos de un usuario.
   */
  actualizar: async (id, usuarioData) => {
    try {
      const response = await api.put(
        `api/usuarios/actualizar/${id}`,
        usuarioData
      );

      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : `Error al actualizar el usuario con ID ${id}`
      );
    }
  },

  /**
   * Desactiva un usuario.
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(
        `api/usuarios/eliminar/${id}`
      );

      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : `Error al eliminar el usuario con ID ${id}`
      );
    }
  },

  /**
   * Verifica las credenciales mediante el backend.
   */
  iniciarSesion: async (email, password) => {
    try {
        const response = await api.post('api/usuarios/login', {
            email: email.trim().toLowerCase(),
            contraseña: password,
        });

        return response.data;
    } catch (error) {
        const mensaje =
            error.response?.data?.message ||
            error.response?.data ||
            error.message;

        throw new Error(
            typeof mensaje === 'string'
                ? mensaje
                : 'Error al iniciar sesión'
        );
    }
},

  /**
   * Cierra una sesión registrada en el backend.
   */
  cerrarSesion: async (idSesion) => {
    if (!idSesion) {
      return;
    }

    try {
      const response = await api.put(
        `api/sesiones/actualizar/${idSesion}`,
        { activa: false }
      );

      return response.data;
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data ||
        error.message;

      throw new Error(
        typeof mensaje === 'string'
          ? mensaje
          : 'No se pudo cerrar la sesión en el servidor'
      );
    }
  },
};

export default usuarioService;

