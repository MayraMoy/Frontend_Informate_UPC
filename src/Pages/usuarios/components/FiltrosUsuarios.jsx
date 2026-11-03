import React from 'react';

export const FiltrosUsuarios = ({
  busqueda,
  filtroRol,
  filtroEstado,
  roles,
  totalResultados,
  totalGeneral,
  onBusquedaChange,
  onFiltroRolChange,
  onFiltroEstadoChange,
  onLimpiarFiltros,
}) => {
  const hayFiltrosActivos = busqueda.trim() !== '' || filtroRol !== 'TODOS' || filtroEstado !== 'TODOS';

  return (
    <div className="usuarios-filtros-card">
      <div className="row g-3 align-items-end">
        {/* Buscador */}
        <div className="col-12 col-md-5">
          <label htmlFor="busqueda-usuarios" className="form-label usuarios-filtro-label">
            Buscar usuario
          </label>
          <div className="usuarios-busqueda-wrapper">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="usuarios-busqueda-icono">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="busqueda-usuarios"
              className="form-control usuarios-busqueda-input"
              placeholder="Buscar por nombre, apellido, DNI o correo..."
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
            />
            {busqueda && (
              <button
                type="button"
                className="usuarios-busqueda-limpiar"
                onClick={() => onBusquedaChange('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtro por Rol */}
        <div className="col-6 col-md-3">
          <label htmlFor="filtro-rol" className="form-label usuarios-filtro-label">
            Filtrar por rol
          </label>
          <select
            id="filtro-rol"
            className="form-select usuarios-filtro-select"
            value={filtroRol}
            onChange={(e) => onFiltroRolChange(e.target.value)}
          >
            <option value="TODOS">Todos los roles</option>
            {roles.map((r) => (
              <option key={r.idRol || r.id} value={r.nombre}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Estado */}
        <div className="col-6 col-md-2">
          <label htmlFor="filtro-estado" className="form-label usuarios-filtro-label">
            Estado
          </label>
          <select
            id="filtro-estado"
            className="form-select usuarios-filtro-select"
            value={filtroEstado}
            onChange={(e) => onFiltroEstadoChange(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>

        {/* Botón limpiar */}
        <div className="col-12 col-md-2 d-flex justify-content-md-end align-items-center">
          {hayFiltrosActivos ? (
            <button
              type="button"
              className="usuarios-boton-limpiar-filtros w-100"
              onClick={onLimpiarFiltros}
            >
              Limpiar filtros
            </button>
          ) : (
            <div className="usuarios-conteo-resultados text-muted small">
              Mostrando {totalResultados} de {totalGeneral}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltrosUsuarios;
