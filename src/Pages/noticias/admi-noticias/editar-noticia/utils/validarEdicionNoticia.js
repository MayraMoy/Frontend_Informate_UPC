import { LIMITES_EDICION } from '../data/editarNoticiaData';

/**
 * Valida los datos requeridos para editar una noticia institucional.
 */
export const validarEdicionNoticia = ({
  titulo = '',
  cuerpo = '',
  categoriaId = '',
  imagenesExistentes = [],
  nuevasImagenes = [],
  errorImagenesActual = '',
}) => {
  const errores = {};

  const tituloLimpio = String(titulo).trim();
  if (!tituloLimpio) {
    errores.titulo = 'El título de la noticia es obligatorio.';
  } else if (tituloLimpio.length > LIMITES_EDICION.titulo) {
    errores.titulo = `El título no puede superar ${LIMITES_EDICION.titulo} caracteres.`;
  }

  const textoPlano = String(cuerpo)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();

  if (!textoPlano) {
    errores.cuerpo = 'El cuerpo de la noticia es obligatorio.';
  }

  if (!categoriaId) {
    errores.categoriaId = 'Seleccioná una categoría.';
  }

  // Obligatoriedad de epígrafe en cada imagen (existente o nueva)
  const totalImagenes = imagenesExistentes.length + nuevasImagenes.length;
  const existentesSinEpigrafe = imagenesExistentes.filter((img) => !img.epigrafe?.trim());
  const nuevasSinEpigrafe = nuevasImagenes.filter((img) => !img.epigrafe?.trim());
  const totalSinEpigrafe = existentesSinEpigrafe.length + nuevasSinEpigrafe.length;

  let errorImagenes = errorImagenesActual;
  if (totalSinEpigrafe > 0) {
    errorImagenes =
      totalImagenes === 1
        ? 'El epígrafe de la imagen es obligatorio para guardar los cambios.'
        : `Cada imagen agregada debe incluir un epígrafe obligatorio (${totalSinEpigrafe} sin completar).`;
    errores.imagenes = errorImagenes;
  } else if (errorImagenes && errorImagenes.toLowerCase().includes('epígrafe')) {
    errorImagenes = '';
  }

  const esValido =
    Object.keys(errores).length === 0 && !errorImagenes && totalSinEpigrafe === 0;

  return {
    esValido,
    errores,
    errorImagenes,
  };
};

