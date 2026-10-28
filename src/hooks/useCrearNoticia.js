import { useCallback, useState } from "react";
import {
  crearNoticia as crearNoticiaApi,
} from "../Services/noticias/noticiasServices";
import archivoService from "../Services/archivos/archivoService";
import { agregarImagen } from "../Services/noticias/imagenesServices";

const obtenerMensajeError = (error) => {
  const detalle = error?.response?.data;

  return typeof detalle === "string"
    ? detalle
    : detalle?.message ||
        error?.message ||
        "Ocurrió un error al guardar la noticia.";
};

const useCrearNoticia = () => {
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const crearNoticia = useCallback(
    async (datosNoticia, usuarioId, imagenes = []) => {
      if (!usuarioId) {
        setError("No se pudo identificar al usuario autenticado.");
        return { exito: false };
      }

      if (imagenes.length > 3) {
        setError("Podés adjuntar un máximo de 3 imágenes.");
        return { exito: false };
      }

      setGuardando(true);
      setError("");

      let noticiaCreada = null;
      let imagenesRegistradas = 0;

      try {
        noticiaCreada = await crearNoticiaApi(
          datosNoticia,
          usuarioId
        );

        if (imagenes.length === 0) {
          return { exito: true, noticia: noticiaCreada };
        }

        const idNoticia = noticiaCreada?.id;

        if (!idNoticia) {
          throw new Error(
            "La noticia se creó, pero no se encontró su identificador."
          );
        }

        for (const imagen of imagenes) {
          const resultadoSubida = await archivoService.subirImagen(
            imagen.archivo
          );

          if (!resultadoSubida?.url) {
            throw new Error(
              "Cloudinary no devolvió la URL de una imagen."
            );
          }

          await agregarImagen(
            {
              url: resultadoSubida.url,
              epigrafe: (imagen.epigrafe || "").trim(),
              noticiaId: idNoticia,
            },
            idNoticia
          );

          imagenesRegistradas++;
        }

        return { exito: true, noticia: noticiaCreada };
      } catch (errorSolicitud) {
        const mensaje = obtenerMensajeError(errorSolicitud);

        if (noticiaCreada) {
          const mensajeParcial =
            `La noticia se creó correctamente, pero solo se registraron ` +
            `${imagenesRegistradas} de ${imagenes.length} imágenes. ${mensaje}`;

          setError(mensajeParcial);

          return {
            exito: false,
            creacionParcial: true,
            noticia: noticiaCreada,
            imagenesRegistradas,
          };
        }

        setError(mensaje);
        return { exito: false };
      } finally {
        setGuardando(false);
      }
    },
    []
  );

  return { guardando, error, crearNoticia };
};

export default useCrearNoticia;