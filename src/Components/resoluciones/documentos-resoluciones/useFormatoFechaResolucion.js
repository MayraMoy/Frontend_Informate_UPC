export const formatearFechaResolucion = (fechaStr) => {
  if (!fechaStr) return '-';
  try {
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return fechaStr;
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return fechaStr;
  }
};

