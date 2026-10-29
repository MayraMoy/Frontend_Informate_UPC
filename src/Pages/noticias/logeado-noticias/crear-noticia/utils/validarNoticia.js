import { NOTICIA_LIMITES } from "../data/crearNoticiaData";

const validarNoticia = (noticia, imagenes = []) => {
  const errores = {};

  const tituloLimpio = (noticia?.titulo || "").trim();
  if (!tituloLimpio) {
    errores.titulo = "El título de la noticia es obligatorio.";
  } else if (tituloLimpio.length > NOTICIA_LIMITES.titulo) {
    errores.titulo = `El título no puede superar los ${NOTICIA_LIMITES.titulo} caracteres (actual: ${tituloLimpio.length}).`;
  }

  const cuerpoOriginal = noticia?.cuerpo || "";
  const textoPlano = cuerpoOriginal
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

  if (!textoPlano) {
    errores.cuerpo = "El contenido de la noticia es obligatorio.";
  } else if (cuerpoOriginal.length > NOTICIA_LIMITES.cuerpo) {
    errores.cuerpo = `El contenido supera el límite máximo permitido (${NOTICIA_LIMITES.cuerpo} caracteres).`;
  }

  if (!noticia?.categoriaId) {
    errores.categoriaId = "Seleccioná una categoría para clasificar la noticia.";
  }

  if (Array.isArray(imagenes) && imagenes.length > 0) {
    const imagenesSinEpigrafe = imagenes.filter(
      (img) => !(img.epigrafe || "").trim()
    );
    if (imagenesSinEpigrafe.length > 0) {
      errores.imagenes =
        imagenes.length === 1
          ? "El epígrafe de la imagen es obligatorio para poder publicar la noticia."
          : `Cada imagen agregada debe incluir un epígrafe obligatorio (${imagenesSinEpigrafe.length} pendiente${imagenesSinEpigrafe.length > 1 ? "s" : ""}).`;
    }
  }

  return errores;
};

export default validarNoticia;
