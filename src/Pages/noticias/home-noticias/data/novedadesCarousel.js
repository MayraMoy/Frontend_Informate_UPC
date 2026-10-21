export const ordenarNoticiasRecientes = (noticias) => [...noticias].sort((noticiaA, noticiaB) => {
  const fechaA = Date.parse(noticiaA.fechaPublicacion);
  const fechaB = Date.parse(noticiaB.fechaPublicacion);
  const fechaAValida = Number.isFinite(fechaA);
  const fechaBValida = Number.isFinite(fechaB);

  if (!fechaAValida || !fechaBValida) {
    return fechaAValida === fechaBValida ? 0 : fechaAValida ? -1 : 1;
  }

  return fechaB - fechaA;
});

export const obtenerPaginasVisibles = (totalPaginas, paginaActual, limite = 5) => {
  const cantidad = Math.min(totalPaginas, limite);
  if (cantidad <= 0) return [];

  const inicio = Math.min(
    Math.max(0, paginaActual - Math.floor(cantidad / 2)),
    totalPaginas - cantidad,
  );

  return Array.from({ length: cantidad }, (_, indice) => inicio + indice);
};
