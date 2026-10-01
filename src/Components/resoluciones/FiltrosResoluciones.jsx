import React from 'react';

/**
 * Componente de barra de búsqueda y filtros para el módulo de resoluciones académicas.
 * Respeta la paleta institucional (#ea8207, #c68a00) y el estilo de bordes redondeados.
 */
export const FiltrosResoluciones = ({
  busqueda,
  setBusqueda,
  anio,
  setAnio,
  aniosDisponibles = [],
  categoria,
  setCategoria,
  categorias = [],
  estado,
  setEstado,
  onLimpiarFiltros
}) => {
  return (
    <div className="filtros-resoluciones-container mb-4">
      {/* 1. Barra de Búsqueda principal */}
      <div className="mb-3">
        <div className="buscador-input-group">
          <span className="buscador-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            className="buscador-input"
            placeholder="Buscar resolución Ej: 045/2026"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Filtros desplegables y botón limpiar */}
      <div className="filtros-grid">
        {/* Dropdown Años */}
        <div className="filtro-select-wrapper">
          <select
            className="filtro-select"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          >
            <option value="">Todos los años</option>
            {aniosDisponibles.map((a) => (
              <option key={a} value={a}>
                Año {a}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Categorías */}
        <div className="filtro-select-wrapper">
          <select
            className="filtro-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria || cat.nombre} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Estados */}
        <div className="filtro-select-wrapper">
          <select
            className="filtro-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Vigente">Vigente</option>
            <option value="Archivado">Archivado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>

        {/* Botón Limpiar filtros */}
        <div>
          <button
            type="button"
            className="btn-limpiar-filtros"
            onClick={onLimpiarFiltros}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosResoluciones;
