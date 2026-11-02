/**
 * Utilidades para el módulo de noticias pendientes de moderación.
 */

export const normalizar = (txt) =>
  String(txt || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

export const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Sin fecha';
  try {
    if (Array.isArray(fechaStr)) {
      const [anio, mes, dia] = fechaStr;
      const fecha = new Date(anio, (mes || 1) - 1, dia || 1);
      return isNaN(fecha.getTime())
        ? 'Sin fecha'
        : fecha.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
    }

    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return String(fechaStr);
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Sin fecha';
  }
};

export const obtenerAutor = (noticia) => {
  if (typeof noticia?.autor === 'object') {
    return (
      noticia.autor.nombre ||
      noticia.autor.username ||
      noticia.autor.email ||
      'Autor institucional'
    );
  }
  if (noticia?.nombreAutor) return noticia.nombreAutor;
  if (noticia?.autorNombre) return noticia.autorNombre;
  if (typeof noticia?.autor === 'string') return noticia.autor;
  return 'Personal UPC';
};

export const obtenerThumbnail = (noticia) => {
  const imagenes =
    noticia?.imagenes ||
    noticia?.imagenNoticias ||
    noticia?.imagenesNoticias ||
    (Array.isArray(noticia?.imagen) ? noticia.imagen : [noticia?.imagen]);

  if (Array.isArray(imagenes) && imagenes.length > 0) {
    const primera = imagenes.find((img) => img?.url || typeof img === 'string');
    return primera?.url || (typeof primera === 'string' ? primera : null);
  }
  return null;
};

export const obtenerExtracto = (noticia, longitud = 80) => {
  if (noticia?.resumen) return noticia.resumen;
  if (noticia?.descripcion) return noticia.descripcion;
  if (typeof noticia?.cuerpo === 'string') {
    const limpio = noticia.cuerpo.replace(/<[^>]+>/g, '').trim();
    if (limpio.length > longitud) {
      return limpio.slice(0, longitud) + '...';
    }
    return limpio;
  }
  return 'Sin resumen disponible';
};

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
  return 'General';
};
