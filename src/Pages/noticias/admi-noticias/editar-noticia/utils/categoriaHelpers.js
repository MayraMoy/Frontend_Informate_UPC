/**
 * Utilidades para la resolución flexible de categorías asociadas a una noticia.
 */

export const resolverCategoriaId = (noticia, listaCategorias = []) => {
  if (!noticia) return '';

  const obtenerId = (cat) =>
    String(
      cat?.id ??
      cat?.idCategoria ??
      cat?.id_categoria ??
      cat?.idCategoriaNoticia ??
      cat?.id_categoria_noticia ??
      ''
    ).trim();

  const normalizar = (txt) =>
    String(txt || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

  // 1. Extraer cualquier ID numérico o directo de categoría en noticia
  const posiblesIds = [
    typeof noticia.categoriaNoticia === 'object' ? obtenerId(noticia.categoriaNoticia) : null,
    typeof noticia.categoria === 'object' ? obtenerId(noticia.categoria) : null,
    noticia.categoriaNoticia !== null && noticia.categoriaNoticia !== undefined && !isNaN(noticia.categoriaNoticia)
      ? String(noticia.categoriaNoticia)
      : null,
    noticia.categoria !== null && noticia.categoria !== undefined && !isNaN(noticia.categoria)
      ? String(noticia.categoria)
      : null,
    noticia.categoriaId,
    noticia.categoria_id,
    noticia.idCategoria,
    noticia.id_categoria,
    noticia.categoriaNoticiaId,
    noticia.categoria_noticia_id,
    noticia.idCategoriaNoticia,
    noticia.id_categoria_noticia,
  ].filter((val) => val !== undefined && val !== null && String(val).trim() !== '' && !isNaN(val));

  // Buscar coincidencia directa en la lista de categorías por ID
  for (const rawId of posiblesIds) {
    const idStr = String(rawId).trim();
    if (listaCategorias && listaCategorias.length > 0) {
      const encontrada = listaCategorias.find((c) => obtenerId(c) === idStr);
      if (encontrada) {
        return obtenerId(encontrada);
      }
    } else {
      return idStr;
    }
  }

  // 2. Extraer cualquier nombre textual de categoría en noticia
  const posiblesNombres = [
    typeof noticia.categoriaNoticia === 'object' ? noticia.categoriaNoticia?.nombre : null,
    typeof noticia.categoriaNoticia === 'string' && isNaN(noticia.categoriaNoticia)
      ? noticia.categoriaNoticia
      : null,
    typeof noticia.categoria === 'object' ? noticia.categoria?.nombre : null,
    typeof noticia.categoria === 'string' && isNaN(noticia.categoria)
      ? noticia.categoria
      : null,
    noticia.nombreCategoria,
    noticia.nombre_categoria,
    noticia.categoriaNombre,
    noticia.categoria_nombre,
  ].filter((val) => val && typeof val === 'string' && val.trim() !== '');

  // Buscar coincidencia por nombre textual en listaCategorias
  for (const rawNombre of posiblesNombres) {
    const buscado = normalizar(rawNombre);
    if (listaCategorias && listaCategorias.length > 0) {
      const encontrada = listaCategorias.find((c) => normalizar(c.nombre) === buscado);
      if (encontrada) {
        return obtenerId(encontrada);
      }
    }
  }

  // Fallback si tenemos un rawId numérico
  if (posiblesIds.length > 0) {
    return String(posiblesIds[0]).trim();
  }

  // Fallback si tenemos un nombre textual previo
  if (posiblesNombres.length > 0) {
    return String(posiblesNombres[0]).trim();
  }

  return '';
};

