/**
 * Funciones auxiliares para fechas y trazabilidad de noticias institucionales.
 */

export const formatearFechaHora = (fechaStr) => {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return fechaStr;

  const dia = fecha.getDate();
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${dia} de ${mes} de ${anio} • ${horas}:${minutos} hs`;
};

export const extraerNombreUsuario = (u) => {
  if (!u) return '';
  if (typeof u === 'string') return u.trim();
  const obj = u.data || u.usuario || u.user || u;
  if (!obj || typeof obj !== 'object') return '';
  if (obj.nombreCompleto) return String(obj.nombreCompleto).trim();
  if (obj.nombre_completo) return String(obj.nombre_completo).trim();
  if (obj.nombre && obj.apellido) return `${obj.nombre} ${obj.apellido}`.trim();
  if (obj.name) return String(obj.name).trim();
  if (obj.nombre) return String(obj.nombre).trim();
  if (obj.username) return String(obj.username).trim();
  if (obj.email) return String(obj.email).trim();
  return '';
};

export const verificarHuboModificacion = (noticia) => {
  const fechaAct = noticia?.fechaActualizacion || noticia?.fechaModificacion || noticia?.fechaEdicion;
  const fechaCrea = noticia?.fechaCreacion;

  if (!fechaAct) return false;
  if (!fechaCrea) return true;

  const msAct = new Date(fechaAct).getTime();
  const msCrea = new Date(fechaCrea).getTime();

  if (isNaN(msAct) || isNaN(msCrea)) {
    return Boolean(fechaAct && fechaAct !== fechaCrea);
  }

  // Si la diferencia es menor o igual a 2 segundos, se crearon simultáneamente en BD (sin edición)
  return (msAct - msCrea) > 2000;
};

export const verificarEstaPublicada = (noticia, estadoActual) => {
  return Boolean(
    (noticia?.estado && String(noticia.estado).toUpperCase() === 'PUBLICADA') ||
    (estadoActual && String(estadoActual).toUpperCase() === 'PUBLICADA') ||
    noticia?.fechaPublicacion
  );
};
