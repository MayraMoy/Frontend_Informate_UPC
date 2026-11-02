import React from 'react';
import { TABS_PENDIENTES } from '../data/pendientesData';

export const PendientesFiltros = ({
  tabEstado,
  onCambiarTab,
  conteos,
  busqueda,
  onBusquedaChange,
  categoriaSeleccionada,
  onCategoriaChange,
  categorias,
}) => {
  return (
    <div className="pendientes-filtros-container">
      {/* Pestañas de Estado */}
      <nav className="pendientes-tabs-nav" aria-label="Filtro por estado de publicación">
        {TABS_PENDIENTES.map((tab) => {
          const estaActivo = tabEstado === tab.id;
          const cantidad = conteos[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              type="button"
              className={`pendientes-tab-btn ${estaActivo ? 'activo' : ''}`}
              onClick={() => onCambiarTab(tab.id)}
            >
              <span className="tab-texto">{tab.etiqueta}</span>
              <span className="tab-contador">{cantidad}</span>
            </button>
          );
        })}
      </nav>

      {/* Barra de Búsqueda y Selector de Categoría */}
      <div className="pendientes-controles-fila">
        <div className="pendientes-buscador-wrapper">
          <svg
            className="buscador-icono"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="pendientes-buscador-input"
            placeholder="Buscar por título, contenido o autor..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
          />
          {busqueda && (
            <button
              type="button"
              className="buscador-limpiar-btn"
              onClick={() => onBusquedaChange('')}
              title="Limpiar búsqueda"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="pendientes-select-wrapper">
          <select
            id="select-categoria-pendientes"
            className="pendientes-select-categoria"
            value={categoriaSeleccionada}
            onChange={(e) => onCategoriaChange(e.target.value)}
            aria-label="Categorías"
          >
            <option value="Todas">Categorías</option>
            {categorias.map((cat) => {
              const nombre = cat.nombre || cat.nombreCategoria || cat.denominacion || '';
              if (!nombre) return null;
              return (
                <option key={cat.id || nombre} value={nombre}>
                  {nombre}
                </option>
              );
            })}
          </select>
          <svg
            className="select-chevron-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PendientesFiltros;

