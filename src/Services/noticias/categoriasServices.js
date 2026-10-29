import clientAxios from '../axiosConfig';

// POST: Crear una nueva categoria
export const crearCategoria = async (CategoriaNoticiaResponse) => {
    const payload = typeof CategoriaNoticiaResponse === 'string'
        ? { nombre: CategoriaNoticiaResponse.trim() }
        : CategoriaNoticiaResponse;
    try {
        const response = await clientAxios.post('api/categoria-noticias', payload);
        return response.data;
    } catch (err) {
        if (err?.response?.status === 404) {
            const fallbackResp = await clientAxios.post('api/categorias-noticias', payload);
            return fallbackResp.data;
        }
        throw err;
    }
};

// GET: Traer todas las categoria
export const listarCategoria = async () => {
    try {
        const response = await clientAxios.get('api/categoria-noticias/todos');
        return response.data;
    } catch (err) {
        if (err?.response?.status === 404) {
            const fallbackResp = await clientAxios.get('api/categorias-noticias/todos');
            return fallbackResp.data;
        }
        throw err;
    }
};

// GET: Consultar una categoria
export const consultarCategoria = async (id) => {
    try {
        const response = await clientAxios.get(`api/categoria-noticias/${id}`);
        return response.data;
    } catch (err) {
        if (err?.response?.status === 404) {
            const fallbackResp = await clientAxios.get(`api/categorias-noticias/${id}`);
            return fallbackResp.data;
        }
        throw err;
    }
};

// PUT: Editar una categoria
export const modificarCategoria = async (id, CategoriaNoticiaResponse) => {
    const payload = typeof CategoriaNoticiaResponse === 'string'
        ? { nombre: CategoriaNoticiaResponse.trim() }
        : CategoriaNoticiaResponse;
    try {
        const response = await clientAxios.put(`api/categoria-noticias/${id}`, payload);
        return response.data;
    } catch (err) {
        if (err?.response?.status === 404) {
            const fallbackResp = await clientAxios.put(`api/categorias-noticias/${id}`, payload);
            return fallbackResp.data;
        }
        throw err;
    }
};

// Eliminar una categoria
export const eliminarCategoria = async (id) => {
    try {
        const response = await clientAxios.delete(`api/categoria-noticias/${id}`);
        return response.data;
    } catch (err) {
        if (err?.response?.status === 404) {
            const fallbackResp = await clientAxios.delete(`api/categorias-noticias/${id}`);
            return fallbackResp.data;
        }
        throw err;
    }
};
