import React from 'react';

/**
 * Tarjeta destacada de resolución para la sección inferior del catálogo.
 * Muestra categoría, fecha, número, título, autor y acción LEER.
 */
export const ResolucionCardDestacada = ({ resolucion, onVerDetalle }) => {
  if (!resolucion) return null;

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) return fechaStr;
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return fechaStr;
    }
  };

  const getCategoriaBadgeClass = (nombreCategoria = '') => {
    const cat = nombreCategoria.toUpperCase();
    if (cat.includes('ACADÉMICA') || cat.includes('ACADEMICA')) return 'badge-cat-academica';
    if (cat.includes('GRADO')) return 'badge-cat-grado';
    return 'badge-cat-default';
  };

  return (
    <div className="card-destacada-wrapper">
      <div className="card-destacada-header d-flex align-items-center gap-2 mb-2">
        <span className={`badge-categoria-pill ${getCategoriaBadgeClass(resolucion.nombreCategoria)}`}>
          {resolucion.nombreCategoria || 'GENERAL'}
        </span>
        <span className="card-destacada-fecha text-muted">
          {formatearFecha(resolucion.fechaCreacion)}
        </span>
      </div>

      <h5 className="card-destacada-numero mb-1">
        {resolucion.numeroResolucion}
      </h5>

      <p className="card-destacada-titulo mb-3">
        {resolucion.titulo}
      </p>

      <div className="card-destacada-footer d-flex justify-content-between align-items-center pt-2">
        <span className="card-destacada-autor text-muted">
          {resolucion.rolAutor || resolucion.nombreAutor || 'Secretaría'}
        </span>
        <button
          type="button"
          className="btn-leer-resolucion"
          onClick={() => onVerDetalle && onVerDetalle(resolucion)}
        >
          LEER <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default ResolucionCardDestacada;
