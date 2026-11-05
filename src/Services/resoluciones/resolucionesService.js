import api from '../axiosConfig';

/**
 * Extrae de forma robusta el mensaje de error devuelto por el backend Spring Boot.
 */
const extraerMensajeError = (error, fallback = 'Error en el servicio de resoluciones') => {
  const data = error.response?.data;
  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object') {
    if (data.message && typeof data.message === 'string') return data.message;
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors
        .map((e) => (typeof e === 'string' ? e : e.defaultMessage || e.message || `${e.field}: inválido`))
        .join('. ');
    }
    if (data.error && typeof data.error === 'string') return data.error;
    const entries = Object.entries(data).filter(([_, val]) => typeof val === 'string');
    if (entries.length > 0) {
      return entries.map(([campo, msg]) => `${campo}: ${msg}`).join('. ');
    }
  }
  return error.message || fallback;
};

/**
 * Servicio para la gestión de Resoluciones Académicas conectado con BackendForoUPC (/api/resoluciones).
 */
export const resolucionesService = {
  /**
   * Obtiene las seis resoluciones más recientes (endpoint público).
   * Endpoint: GET /api/resoluciones/ultimas-seis
   * @returns {Promise<Array>} Lista de ResolucionResponseDTO
   */
  listar6Resoluciones: async () => {
    try {
      const response = await api.get('/api/resoluciones/ultimas-seis');
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, 'Error al obtener las seis resoluciones más recientes');
      throw new Error(mensaje);
    }
  },

  /**
   * Obtiene la lista completa de resoluciones.
   * Endpoint: GET /api/resoluciones/todos
   * @returns {Promise<Array>} Lista de ResolucionResponseDTO
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/api/resoluciones/todos');
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, 'Error al obtener las resoluciones');
      throw new Error(mensaje);
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
      const response = await api.get(`/api/resoluciones/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, `Error al obtener la resolución ${id}`);
      throw new Error(mensaje);
    }
  },

  /**
   * Registra una nueva resolución académica.
   * Endpoint: POST /api/resoluciones
   * @param {Object} resolucionData - Datos de ResolucionRequestDTO
   * @param {number|string} [usuarioId] - ID del autor opcional para query param
   * @returns {Promise<Object>} ResolucionResponseDTO
   */
  crear: async (resolucionData, usuarioId) => {
    try {
      const idUsuario = usuarioId || resolucionData?.idAutor || resolucionData?.usuarioId;
      const params = idUsuario ? { usuarioId: idUsuario, idAutor: idUsuario } : {};
      const response = await api.post('/api/resoluciones', resolucionData, { params });
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, 'Error al crear la resolución');
      throw new Error(mensaje);
    }
  },

  /**
   * Actualiza los datos de una resolución existente.
   * Endpoint: PUT /api/resoluciones/{id}
   * @param {number|string} id - ID de la resolución
   * @param {Object} resolucionData - Datos actualizados
   * @param {number|string} [usuarioId] - ID del autor opcional para query param
   * @returns {Promise<Object>} ResolucionResponseDTO
   */
  actualizar: async (id, resolucionData, usuarioId) => {
    try {
      const idUsuario = usuarioId || resolucionData?.idAutor || resolucionData?.usuarioId;
      const params = idUsuario ? { usuarioId: idUsuario, idAutor: idUsuario } : {};
      const response = await api.put(`/api/resoluciones/${id}`, resolucionData, { params });
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, `Error al actualizar la resolución ${id}`);
      throw new Error(mensaje);
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
      const response = await api.delete(`/api/resoluciones/${id}`);
      return response.data;
    } catch (error) {
      const mensaje = extraerMensajeError(error, `Error al eliminar/archivar la resolución ${id}`);
      throw new Error(mensaje);
    }
  },
};

export default resolucionesService;
