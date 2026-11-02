import React from 'react';
import PendientesFila from './PendientesFila';

export const PendientesTabla = ({
  noticias,
  cargando,
  accionEnProgreso,
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  onPublicar,
}) => {
  if (cargando) {
    return (
      <div className="pendientes-loading-state">
        <svg
          className="pendientes-loading-spinner"
          viewBox="0 0 24 24"
          width="32"
          height="32"
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
      <div className="pendientes-empty-state" role="status">
        <p className="empty-state-mensaje">
          No se encontraron noticias con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="pendientes-listado-seccion">
      {/* Grilla idéntica a Ver Noticias */}
      <div className="ver-noticias-grid" aria-live="polite">
        {noticias.map((noticia) => (
          <PendientesFila
            key={noticia.id}
            noticia={noticia}
            accionEnProgreso={accionEnProgreso}
            onPublicar={onPublicar}
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
              width="15"
              height="15"
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
              width="15"
              height="15"
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
