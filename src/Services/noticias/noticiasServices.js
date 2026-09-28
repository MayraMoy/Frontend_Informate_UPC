import clientAxios from '../axiosConfig';

// POST: Crear una nueva noticia
export const crearNoticia = async (NoticiaResponse) => {
    const response = await clientAxios.post('api/noticias', NoticiaResponse);
    return response.data;
}

// GET: Traer todas las noticias
export const listarNoticiasPublicadas = async () => {
    const response = await clientAxios.get('api/noticias/todos');
    return response.data;
}

// GET: Consultar una noticia
export const consultarNoticia = async (id) => {
    const response = await clientAxios.get(`api/noticias/${id}`);
    return response.data;
};

// PUT: Editar una Noticia
export const editarNoticia = async (id, noticiaResponse) => {
    const response = await clientAxios.put(`api/noticias/${id}`, noticiaResponse);
    return response.data;
};

// Eliminar una Noticia
export const eliminarNoticia = async (id) => {
    const response = await clientAxios.delete(`api/noticias/${id}`);
    return response.data;
};