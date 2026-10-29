export const obtenerNombreCategoria = (noticia, categorias = []) => {
  if (typeof noticia?.categoriaNoticia === 'object' && noticia?.categoriaNoticia?.nombre) {
    return noticia.categoriaNoticia.nombre;
  }
  if (typeof noticia?.categoria === 'object' && noticia?.categoria?.nombre) {
    return noticia.categoria.nombre;
  }
  if (noticia?.nombreCategoria) return noticia.nombreCategoria;
  if (noticia?.categoriaNombre) return noticia.categoriaNombre;
  if (typeof noticia?.categoriaNoticia === 'string' && isNaN(noticia.categoriaNoticia)) {
    return noticia.categoriaNoticia;
  }
  if (typeof noticia?.categoria === 'string' && isNaN(noticia.categoria)) {
    return noticia.categoria;
  }
  const idCat =
    noticia?.categoriaNoticia?.id ||
    noticia?.categoria?.id ||
    (typeof noticia?.categoriaNoticia === 'number' ? noticia.categoriaNoticia : null) ||
    (typeof noticia?.categoria === 'number' ? noticia.categoria : null) ||
    noticia?.idCategoria ||
    noticia?.categoriaId;
  if (idCat && Array.isArray(categorias) && categorias.length > 0) {
    const encontrada = categorias.find(
      (c) => String(c?.id ?? c?.idCategoria ?? c?.id_categoria ?? '') === String(idCat)
    );
    if (encontrada?.nombre) return encontrada.nombre;
  }
  return '';
};

export const useNoticiaCard = (noticia) => {
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';

    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getBadgeClass = (nombreCategoria) => {
    const categoriaNormalizada = nombreCategoria
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    if (categoriaNormalizada?.includes('investig')) return 'badge-investigacion';
    if (categoriaNormalizada?.includes('academ')) return 'badge-academica';
    if (categoriaNormalizada?.includes('bienestar')) return 'badge-bienestar';
    if (!categoriaNormalizada) return 'badge-default';

    const hashCategoria = [...categoriaNormalizada].reduce(
      (hash, caracter) => (hash * 31 + caracter.charCodeAt(0)) >>> 0,
      0,
    );

    return `badge-categoria badge-categoria-${hashCategoria % 8}`;
  };

  const obtenerNombreAutor = (autorObj) => {
    if (!autorObj) return 'Institucional';
    if (autorObj.nombreCompleto) return autorObj.nombreCompleto;
    if (autorObj.nombre && autorObj.apellido) return `${autorObj.nombre} ${autorObj.apellido}`;
    return autorObj.nombre || autorObj.username || 'Institucional';
  };

  const resolverCategoria = (categorias = []) => obtenerNombreCategoria(noticia, categorias);

  return {
    noticia,
    formatearFecha,
    getBadgeClass,
    obtenerNombreAutor,
    resolverCategoria,
  };
};
