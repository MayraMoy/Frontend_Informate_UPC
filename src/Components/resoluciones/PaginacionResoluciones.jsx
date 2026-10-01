import React from 'react';

/**
 * Paginador con estilo idéntico al diseño de resoluciones (flechas y botón activo naranja).
 */
export const PaginacionResoluciones = ({
  paginaActual = 1,
  totalPaginas = 1,
  onCambiarPagina
}) => {
  if (totalPaginas <= 1) return null;

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <nav className="paginacion-resoluciones-nav d-flex justify-content-end align-items-center gap-2 mt-4" aria-label="Paginación de resoluciones">
      {/* Botón Anterior */}
      <button
        type="button"
        className="btn-pag-arrow"
        disabled={paginaActual === 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        aria-label="Página anterior"
      >
        &#9666;
      </button>

      {/* Botones de número */}
      {paginas.map((num) => (
        <button
          key={num}
          type="button"
          className={`btn-pag-number ${num === paginaActual ? 'active' : ''}`}
          onClick={() => onCambiarPagina(num)}
        >
          {num}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        type="button"
        className="btn-pag-arrow"
        disabled={paginaActual === totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        aria-label="Página siguiente"
      >
        &#9656;
      </button>
    </nav>
  );
};

export default PaginacionResoluciones;
