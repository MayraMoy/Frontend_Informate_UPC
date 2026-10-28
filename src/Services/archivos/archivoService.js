import clientAxios from "../axiosConfig";

export const subirImagenCloudinary = async (archivo) => {
    const formData = new FormData();
    formData.append("archivo", archivo);

    const response = await clientAxios.post(
      "api/archivos/subir-imagen",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
};

const archivoService = {
  subirImagen: subirImagenCloudinary,
};

export default archivoService;
