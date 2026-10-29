import React from 'react';

export const ToolbarCategorias = ({
  totalCategorias,
  totalFiltradas,
  hayFiltro,
  filtro,
  setFiltro,
}) => {
  return (
    <div className="modal-categorias__lista-toolbar">
      <div className="modal-categorias__lista-titulo-wrap">
        <h3 className="modal-categorias__seccion-titulo mb-0">
          Categorías registradas
        </h3>
        <span className="modal-categorias__contador-texto">
          ({hayFiltro ? `${totalFiltradas}` : `${totalCategorias}`})
        </span>
      </div>

      <div className="modal-categorias__filtro-input-wrapper">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="modal-categorias__filtro-icono"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="modal-categorias__filtro-input"
          placeholder="Buscar categoría específica..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          aria-label="Buscar categoría específica"
        />
        {filtro && (
          <button
            type="button"
            className="modal-categorias__filtro-limpiar"
            onClick={() => setFiltro('')}
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolbarCategorias;

