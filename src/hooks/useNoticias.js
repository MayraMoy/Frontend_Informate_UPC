import { useCallback, useEffect, useState } from "react";
import {
  listarNoticiasPublicadas,
} from "../Services/noticias/noticiasServices";

const normalizarNoticias = (respuesta) => {
  if (Array.isArray(respuesta)) return respuesta;
  if (Array.isArray(respuesta?.data)) return respuesta.data;
  if (Array.isArray(respuesta?.content)) return respuesta.content;

  return [];
};

const esRespuestaSinNoticias = (error) => {
  const detalle = error?.response?.data;
  const mensaje =
    typeof detalle === "string" ? detalle : detalle?.message;

  return mensaje?.includes("No hay noticias disponibles") ?? false;
};

const useNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const recargarNoticias = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const respuesta = await listarNoticiasPublicadas();

      setNoticias(normalizarNoticias(respuesta));
      return true;
    } catch (errorSolicitud) {
      if (esRespuestaSinNoticias(errorSolicitud)) {
        setNoticias([]);
        return true;
      }

      setError(
        "No se pudieron cargar las noticias. Intenta nuevamente."
      );

      return false;
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargarNoticias();
  }, [recargarNoticias]);

  return {
    noticias,
    cargando,
    error,
    recargarNoticias,
  };
};

export default useNoticias;