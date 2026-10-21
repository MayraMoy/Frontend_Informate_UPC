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

  return {
    noticia,
    formatearFecha,
    getBadgeClass,
    obtenerNombreAutor,
  };
};