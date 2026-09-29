import clientAxios from '../axiosConfig';

// POST: Crear una nueva categoria
export const crearCategoria = async (CategoriaNoticiaResponse) => {
    const response = await clientAxios.post('api/categoria-noticias', CategoriaNoticiaResponse);
    return response.data;
}

// GET: Traer todas las categoria
export const listarCategoria = async () => {
    const response = await clientAxios.get('api/categoria-noticias/todos');
    return response.data;
}

// GET: Consultar una categoria
export const consultarCategoria = async (id) => {
    const response = await clientAxios.get(`api/categoria-noticias/${id}`);
    return response.data;
};

// PUT: Editar una categoria
export const modificarCategoria = async (id, CategoriaNoticiaResponse) => {
    const response = await clientAxios.put(`api/categoria-noticias/${id}`, CategoriaNoticiaResponse);
    return response.data;
};

// Eliminar una categoria
export const eliminarCategoria = async (id) => {
    const response = await clientAxios.delete(`api/categorias-noticias/${id}`);
    return response.data;
};