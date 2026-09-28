import api from '../axiosConfig';

/**
 * Servicio centralizado para gestionar las operaciones de usuarios y sesiones
 * comunicándose con la API del backend.
 */
export const usuarioService = {
  /**
   * Obtiene la lista completa de usuarios registrados.
   * @returns {Promise<Array>} Lista de usuarios.
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('/usuarios/obtener/todos');
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al obtener el listado de usuarios');
    }
  },

  /**
   * Consulta un usuario específico mediante su identificador.
   * @param {number|string} id - ID del usuario a consultar.
   * @returns {Promise<Object>} Datos del usuario.
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/usuarios/obtener/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al obtener el usuario con ID ${id}`);
    }
  },

  /**
   * Crea un nuevo usuario en el sistema (registro).
   * @param {Object} usuarioData - Datos del nuevo usuario (nombre, apellido, dni, email, contraseña, etc.).
   * @returns {Promise<Object>} Usuario creado.
   */
  crear: async (usuarioData) => {
    try {
      const response = await api.post('/usuarios/crear', usuarioData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || 'Error al registrar el usuario');
    }
  },

  /**
   * Modifica los datos de un usuario existente.
   * @param {number|string} id - ID del usuario a actualizar.
   * @param {Object} usuarioData - Datos actualizados del usuario.
   * @returns {Promise<Object>} Usuario actualizado.
   */
  actualizar: async (id, usuarioData) => {
    try {
      const response = await api.put(`/usuarios/actualizar/${id}`, usuarioData);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al actualizar el usuario con ID ${id}`);
    }
  },

  /**
   * Elimina (o desactiva) un usuario por su identificador.
   * @param {number|string} id - ID del usuario a eliminar.
   * @returns {Promise<string|Object>} Respuesta de confirmación.
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/usuarios/eliminar/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      throw new Error(mensaje || `Error al eliminar el usuario con ID ${id}`);
    }
  },

  /**
   * Autentica a un usuario verificando sus credenciales (email y contraseña)
   * e interactúa con el backend para gestionar la sesión.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<Object>} Usuario autenticado y datos de sesión.
   */
  iniciarSesion: async (email, password) => {
    try {
      // 1. Obtenemos los usuarios para validar la existencia y credenciales del usuario
      const usuarios = await usuarioService.obtenerTodos();
      const usuarioEncontrado = usuarios.find(
        (u) => u.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!usuarioEncontrado) {
        throw new Error('El correo electrónico no se encuentra registrado');
      }

      // Validamos contraseña (en el backend o contra el registro devuelto)
      if (usuarioEncontrado.contraseña !== password) {
        throw new Error('La contraseña ingresada es incorrecta');
      }

      if (usuarioEncontrado.estado && usuarioEncontrado.estado.toUpperCase() === 'INACTIVO') {
        throw new Error('La cuenta de usuario se encuentra inactiva');
      }

      // 2. Registramos la sesión activa en el backend
      try {
        const sesionPayload = {
          usuario: { idUsuario: usuarioEncontrado.idUsuario },
          tokenJwt: `token_${Date.now()}_${usuarioEncontrado.idUsuario}`,
          fechaInicio: new Date().toISOString(),
          activa: true,
        };
        await api.post('/sesiones/crear', sesionPayload);
      } catch (sesionError) {
        console.warn('Aviso: No se pudo registrar la sesión en /api/sesiones/crear:', sesionError);
      }

      return usuarioEncontrado;
    } catch (error) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Cierra la sesión activa de un usuario.
   * @param {number|string} idSesion - ID de la sesión a cerrar.
   * @returns {Promise<Object>}
   */
  cerrarSesion: async (idSesion) => {
    try {
      if (idSesion) {
        const response = await api.put(`/sesiones/actualizar/${idSesion}`, { activa: false });
        return response.data;
      }
    } catch (error) {
      console.warn('Aviso: Error al cerrar sesión en el servidor:', error);
    }
  },
};

export default usuarioService;
