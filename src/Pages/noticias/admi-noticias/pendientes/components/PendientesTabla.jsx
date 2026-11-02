import React from 'react';
import PendientesFila from './PendientesFila';

export const PendientesTabla = ({
  noticias,
  categorias,
  cargando,
  accionEnProgreso,
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  onPrevisualizar,
  onPublicar,
  onCambiarEstado,
  onEliminar,
}) => {
  if (cargando) {
    return (
      <div className="pendientes-loading-state">
        <svg
          className="pendientes-loading-spinner"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
        </svg>
        <p>Cargando noticias pendientes...</p>
      </div>
    );
  }

  if (!noticias || noticias.length === 0) {
    return (
      <div className="pendientes-empty-state">
        <div className="empty-state-icon-circle">
          <svg
            className="empty-state-icon"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <h3 className="empty-state-titulo">No se encontraron noticias pendientes</h3>
        <p className="empty-state-desc">
          No hay publicaciones que coincidan con los filtros seleccionados o todas las noticias han sido procesadas.
        </p>
      </div>
    );
  }

  return (
    <div className="pendientes-listado-seccion">
      <div className="pendientes-cards-container">
        {noticias.map((noticia) => (
          <PendientesFila
            key={noticia.id}
            noticia={noticia}
            categorias={categorias}
            accionEnProgreso={accionEnProgreso}
            onPrevisualizar={onPrevisualizar}
            onPublicar={onPublicar}
            onCambiarEstado={onCambiarEstado}
            onEliminar={onEliminar}
          />
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <nav className="pendientes-paginacion" aria-label="Navegación de páginas">
          <button
            type="button"
            className="paginacion-btn"
            disabled={paginaActual <= 1}
            onClick={() => onCambiarPagina(paginaActual - 1)}
            aria-label="Página anterior"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="paginacion-btn-texto">Anterior</span>
          </button>

          <div className="paginacion-numeros">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`paginacion-num-btn ${num === paginaActual ? 'activo' : ''}`}
                onClick={() => onCambiarPagina(num)}
                aria-current={num === paginaActual ? 'page' : undefined}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="paginacion-btn"
            disabled={paginaActual >= totalPaginas}
            onClick={() => onCambiarPagina(paginaActual + 1)}
            aria-label="Página siguiente"
          >
            <span className="paginacion-btn-texto">Siguiente</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
};

export default PendientesTabla;

