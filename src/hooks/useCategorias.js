import { useEffect, useState } from "react";
import { listarCategoria } from "../Services/noticias/categoriasServices";

const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await listarCategoria();

        const datos = Array.isArray(respuesta)
          ? respuesta
          : respuesta?.data;

        setCategorias(Array.isArray(datos) ? datos : []);
      } catch (errorSolicitud) {
        setError("No se pudieron cargar las categorías.");
        console.error("Error al cargar categorías:", errorSolicitud);
      } finally {
        setCargando(false);
      }
    };

    cargarCategorias();
  }, []);

  return { categorias, cargando, error };
};

export default useCategorias;
