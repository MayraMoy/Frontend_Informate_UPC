import { NOTICIA_LIMITES } from "../data/crearNoticiaData";

const validarNoticia = (noticia) => {
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

  return errores;
};

export default validarNoticia;
