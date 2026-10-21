import clientAxios from '../axiosConfig';

// POST: Crear un nuevo rol de usuario
export const guardar = async (RolRequestDTO) => {
    const response = await clientAxios.post('api/roles/crear', RolRequestDTO);
    return response.data;
}

// GET: Traer todos los roles de usuario
export const listarTodos = async () => {
    const response = await clientAxios.get('api/roles/obtener/todos');
    return response.data;
}

// GET: Traer unicamente los roles por id
export const buscarPorId = async (id) => {
    const response = await clientAxios.get(`api/roles/obtener/${id}`);
    return response.data;
}

// GET: Traer unicamente los roles por nombre
export const buscarPorNombre = async (nombre) => {
    const response = await clientAxios.get(`api/roles/obtener/nombre/${nombre}`);
    return response.data;
};

// PUT: Editar un rol de usuario
export const editarRol = async (id, RolRequestDTO) => {
    const response = await clientAxios.put(`api/roles/actualizar/${id}`, RolRequestDTO);
    return response.data;
};

// Eliminar un rol de usuario
export const eliminarRol = async (id) => {
    const response = await clientAxios.delete(`api/roles/eliminar/${id}`);
    return response.data;
};