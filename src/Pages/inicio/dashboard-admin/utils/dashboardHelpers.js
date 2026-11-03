/**
 * Utilidades para el Dashboard Administrativo de UPC
 */

export const formatearFechaActual = () => {
  const hoy = new Date();
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formateada = hoy.toLocaleDateString('es-AR', opciones);
  return formateada.charAt(0).toUpperCase() + formateada.slice(1);
};

export const formatearFechaCorta = (fechaStr) => {
  if (!fechaStr) return 'Reciente';
  try {
    if (Array.isArray(fechaStr)) {
      const [anio, mes, dia] = fechaStr;
      const f = new Date(anio, (mes || 1) - 1, dia || 1);
      if (isNaN(f.getTime())) return 'Reciente';
      return f.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }

    const f = new Date(fechaStr);
    if (isNaN(f.getTime())) return String(fechaStr);
    return f.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Reciente';
  }
};

export const extraerNombreAutor = (item) => {
  if (!item) return 'Autor institucional';
  if (typeof item.autor === 'object' && item.autor !== null) {
    return item.autor.nombre || item.autor.username || item.autor.email || 'Autor institucional';
  }
  return item.nombreAutor || item.autorNombre || (typeof item.autor === 'string' ? item.autor : 'Autor institucional');
};

export const extraerNombreCategoria = (item) => {
  if (!item) return 'General';
  if (typeof item.categoria === 'object' && item.categoria !== null) {
    return item.categoria.nombre || item.categoria.nombreCategoria || 'General';
  }
  return item.nombreCategoria || item.categoriaNombre || (typeof item.categoria === 'string' ? item.categoria : 'General');
};

