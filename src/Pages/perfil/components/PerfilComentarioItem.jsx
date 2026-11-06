import React from 'react';
import { Link } from 'react-router-dom';

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Fecha no disponible';
  try {
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return fechaStr;
    return fecha.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return fechaStr;
  }
};

const renderEstadoBadge = (estadoRaw = '') => {
  const estado = String(estadoRaw).toUpperCase();

  if (estado === 'APROBADO' || estado === 'PUBLICADO') {
    return (
      <span className="comentario-badge-estado comentario-badge-estado--aprobado" title="Visible para todos los usuarios">
        <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>Publicado</span>
      </span>
    );
  }

  if (estado === 'PENDIENTE') {
    return (
      <span className="comentario-badge-estado comentario-badge-estado--pendiente" title="En revisión por las autoridades">
        <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span>En moderación</span>
      </span>
    );
  }

  if (estado === 'RECHAZADO') {
    return (
      <span className="comentario-badge-estado comentario-badge-estado--rechazado" title="No aprobado por incumplir normas de convivencia">
        <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>No aprobado</span>
      </span>
    );
  }

  return (
    <span className="comentario-badge-estado comentario-badge-estado--neutro">
      <span>{estadoRaw || 'Registrado'}</span>
    </span>
  );
};

export const PerfilComentarioItem = ({
  comentario,
  resolucionInfo,
  onEliminar,
}) => {
  const idRes = comentario.idResolucion;
  const numRes = resolucionInfo?.numeroResolucion || `RES #${idRes || '-'}`;
  const tituloRes = resolucionInfo?.titulo || null;
  const busquedaLink = resolucionInfo?.numeroResolucion || idRes;

  return (
    <article className="comentario-item-card">
      <header className="comentario-item-header">
        <div className="comentario-item-contexto">
          <span className="comentario-resolucion-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>{numRes}</span>
          </span>

          {tituloRes && (
            <h3 className="comentario-resolucion-titulo" title={tituloRes}>
              {tituloRes}
            </h3>
          )}
        </div>

        <div className="comentario-item-estado-wrapper">
          {renderEstadoBadge(comentario.estado)}
        </div>
      </header>

      <div className="comentario-item-cuerpo">
        <p className="comentario-item-texto">
          {comentario.contenido}
        </p>
      </div>

      <footer className="comentario-item-footer">
        <div className="comentario-item-metas">
          <span className="comentario-meta-fecha" title="Fecha en que enviaste este comentario">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formatearFecha(comentario.fechaCreacion)}</span>
          </span>

          {(comentario.nombreCarrera || comentario.anioCarrera) && (
            <span className="comentario-meta-carrera">
              {comentario.nombreCarrera && <span>{comentario.nombreCarrera}</span>}
              {comentario.nombreCarrera && comentario.anioCarrera && <span> • </span>}
              {comentario.anioCarrera && <span>{comentario.anioCarrera}° año</span>}
            </span>
          )}
        </div>

        <div className="comentario-item-acciones">
          {idRes && (
            <Link
              to={`/resoluciones?q=${encodeURIComponent(busquedaLink)}`}
              className="comentario-btn-enlace"
              title="Ir al listado de resoluciones para consultar este documento"
            >
              <span>Ver resolución</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )}

          <button
            type="button"
            className="comentario-btn-eliminar"
            onClick={() => onEliminar(comentario)}
            aria-label="Eliminar este comentario"
            title="Eliminar este comentario"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Eliminar</span>
          </button>
        </div>
      </footer>
    </article>
  );
};

export default PerfilComentarioItem;
