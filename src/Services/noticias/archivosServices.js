import clientAxios from '../axiosConfig';

// POST: Crear un nuevo archivo
export const agregarArchivo = async (ArchivoNoticiaResponse) => {
    const response = await clientAxios.post('api/archivo-noticias', ArchivoNoticiaResponse);
    return response.data;
}

// GET: Consultar un archivo
export const consultarArchivosDeNoticias = async (id) => {
    const response = await clientAxios.get(`api/archivo-noticias/${id}`);
    return response.data;
};

// PUT: Editar un archivo
export const modificarArchivo = async (id, ArchivoNoticiaResponse) => {
    const response = await clientAxios.put(`api/archivo-noticias/${id}`, ArchivoNoticiaResponse);
    return response.data;
};

// Eliminar un archivo
export const eliminarArchivo = async (id) => {
    const response = await clientAxios.delete(`api/archivo-noticias/${id}`);
    return response.data;
};