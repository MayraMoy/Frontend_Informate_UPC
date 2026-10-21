import clientAxios from '../axiosConfig';

// POST: Crear una nuevo imagen
export const agregarImagen = async (ImagenNoticiaResponse) => {
    const response = await clientAxios.post('api/imagen-noticias', ImagenNoticiaResponse);
    return response.data;
}

// GET: Consultar una imagen
export const consultarImagenesPorNoticia = async (id) => {
    const response = await clientAxios.get(`api/imagen-noticias/${id}`);
    return response.data;
};

// PUT: Editar una imagen
export const modificarImagen = async (id, ImagenNoticiaResponse) => {
    const response = await clientAxios.put(`api/imagen-noticias/${id}`, ImagenNoticiaResponse);
    return response.data;
};

// Eliminar una imagen
export const eliminarImagen = async (id) => {
    const response = await clientAxios.delete(`api/imagen-noticias/${id}`);
    return response.data;
};