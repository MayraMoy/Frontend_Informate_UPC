import { useState, useRef, useEffect } from "react";
import { NOTICIA_INICIAL } from "../data/crearNoticiaData";
import validarNoticia from "../utils/validarNoticia";

const MAX_IMAGENES = 3;
const MAX_TAMANO = 5 * 1024 * 1024;
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];

const useFormularioNoticia = () => {
  const [valores, setValores] = useState({
    ...NOTICIA_INICIAL,
  });

  const [errores, setErrores] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [errorImagenes, setErrorImagenes] = useState("");

  const siguienteId = useRef(0);
  const urlsPreview = useRef(new Set());

  useEffect(() => {
    const urls = urlsPreview.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const manejarCambio = ({ target }) => {
    const { name, value } = target;

    setValores((actuales) => ({
      ...actuales,
      [name]: value,
    }));

    setErrores((actuales) => ({
      ...actuales,
      [name]: "",
    }));
  };

  const manejarSeleccionImagen = (archivosSeleccionados) => {
    const archivos = Array.from(archivosSeleccionados || []);
    const nuevasImagenes = [];
    const erroresSeleccion = [];

    const lugaresDisponibles = MAX_IMAGENES - imagenes.length;

    if (archivos.length > lugaresDisponibles) {
      erroresSeleccion.push(
        `Solo podés agregar ${lugaresDisponibles} imagen(es) más. El máximo es ${MAX_IMAGENES}.`
      );
    }

    for (const archivo of archivos.slice(0, lugaresDisponibles)) {
      if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
        erroresSeleccion.push(
          `${archivo.name}: formato no permitido. Usá JPEG, PNG o WEBP.`
        );
        continue;
      }

      if (archivo.size > MAX_TAMANO) {
        erroresSeleccion.push(
          `${archivo.name}: supera el límite de 5 MB.`
        );
        continue;
      }

      const preview = URL.createObjectURL(archivo);
      urlsPreview.current.add(preview);

      nuevasImagenes.push({
        id: ++siguienteId.current,
        archivo,
        epigrafe: "",
        preview,
      });
    }

    if (nuevasImagenes.length > 0) {
      setImagenes((actuales) => [
        ...actuales,
        ...nuevasImagenes,
      ]);
    }

    setErrorImagenes(erroresSeleccion.join(" "));
  };

  const manejarCambioEpigrafe = (id, epigrafe) => {
    setImagenes((actuales) => {
      const actualizadas = actuales.map((imagen) =>
        imagen.id === id
          ? { ...imagen, epigrafe }
          : imagen
      );

      const todasConEpigrafe = actualizadas.every(
        (img) => (img.epigrafe || "").trim().length > 0
      );

      if (todasConEpigrafe) {
        setErrorImagenes((errActual) => {
          if (
            errActual &&
            (errActual.toLowerCase().includes("epígrafe") ||
              errActual.toLowerCase().includes("epigrafe"))
          ) {
            return "";
          }
          return errActual;
        });

        setErrores((erroresActuales) => {
          if (erroresActuales.imagenes) {
            const { imagenes: _, ...resto } = erroresActuales;
            return resto;
          }
          return erroresActuales;
        });
      }

      return actualizadas;
    });
  };

  const manejarQuitarImagen = (id) => {
    const imagenAEliminar = imagenes.find(
      (imagen) => imagen.id === id
    );

    if (imagenAEliminar) {
      URL.revokeObjectURL(imagenAEliminar.preview);
      urlsPreview.current.delete(imagenAEliminar.preview);
    }

    setImagenes((actuales) => {
      const restantes = actuales.filter((imagen) => imagen.id !== id);
      const todasConEpigrafe = restantes.every(
        (img) => (img.epigrafe || "").trim().length > 0
      );

      if (restantes.length === 0 || todasConEpigrafe) {
        setErrorImagenes((errActual) => {
          if (
            errActual &&
            (errActual.toLowerCase().includes("epígrafe") ||
              errActual.toLowerCase().includes("epigrafe"))
          ) {
            return "";
          }
          return errActual;
        });

        setErrores((erroresActuales) => {
          if (erroresActuales.imagenes) {
            const { imagenes: _, ...resto } = erroresActuales;
            return resto;
          }
          return erroresActuales;
        });
      }

      return restantes;
    });
  };

  const validar = () => {
    const nuevosErrores = validarNoticia(valores, imagenes);

    let errorImg = errorImagenes;
    if (nuevosErrores.imagenes) {
      errorImg = nuevosErrores.imagenes;
      setErrorImagenes(nuevosErrores.imagenes);
    } else if (
      errorImagenes &&
      (errorImagenes.toLowerCase().includes("epígrafe") ||
        errorImagenes.toLowerCase().includes("epigrafe"))
    ) {
      errorImg = "";
      setErrorImagenes("");
    }

    setErrores(nuevosErrores);

    return (
      Object.keys(nuevosErrores).length === 0 &&
      !errorImg
    );
  };

  const obtenerDatos = () => ({
    titulo: valores.titulo.trim(),
    cuerpo: valores.cuerpo.trim(),
    categoriaId: Number(valores.categoriaId),
  });

  const limpiar = () => {
    urlsPreview.current.forEach((url) => URL.revokeObjectURL(url));
    urlsPreview.current.clear();

    setValores({ ...NOTICIA_INICIAL });
    setErrores({});
    setImagenes([]);
    setErrorImagenes("");
  };

  return {
    valores,
    errores,
    imagenes,
    errorImagenes,
    manejarCambio,
    manejarSeleccionImagen,
    manejarCambioEpigrafe,
    manejarQuitarImagen,
    validar,
    obtenerDatos,
    limpiar,
  };
};

export default useFormularioNoticia;
