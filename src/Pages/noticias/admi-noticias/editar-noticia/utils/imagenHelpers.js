/**
 * Utilidades para la manipulación y normalización de imágenes en la edición de noticias.
 */

export const normalizarImagenes = (candidatas) => {
  if (!candidatas) return [];
  const lista = Array.isArray(candidatas) ? candidatas : [candidatas];
  return lista
    .map((img, idx) => {
      if (!img) return null;
      if (typeof img === 'string') {
        return { id: idx, url: img, epigrafe: '' };
      }
      const url = img.url || img.ruta || img.imagenUrl || img.urlImagen || img.preview;
      if (!url) return null;
      return {
        id: img.id ?? img.idImagen ?? img.id_imagen ?? idx,
        url,
        epigrafe: img.epigrafe ?? img.pieDeFoto ?? img.descripcion ?? '',
      };
    })
    .filter(Boolean);
};

export const formatearImagenesParaPreview = (imagenesExistentes = [], nuevasImagenes = []) => [
  ...imagenesExistentes.map((img) => ({ id: `ex-${img.id}`, preview: img.url, epigrafe: img.epigrafe })),
  ...nuevasImagenes.map((img) => ({ id: `nu-${img.tempId}`, preview: img.preview, epigrafe: img.epigrafe })),
];

