import React from 'react';

const formatearFechaHora = (fechaStr) => {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return fechaStr;
  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const SeccionRegistroFechas = ({ noticia, estadoActual }) => {
  const fechaActualizacionExiste = Boolean(
    noticia?.fechaActualizacion ||
    noticia?.fechaModificacion ||
    (noticia?.fechaEdicion && noticia?.fechaEdicion !== noticia?.fechaCreacion)
  );

  const fechaPublicacionExiste = Boolean(
    noticia?.fechaPublicacion ||
    noticia?.estado === 'PUBLICADA' ||
    estadoActual === 'PUBLICADA'
  );

  return (
    <div className="editar-noticia__fechas-bloque">
      <h3 className="editar-noticia__fechas-titulo">Registro temporal</h3>

      {/* 1. Fecha de Creación: Siempre mostrada */}
      <div className="editar-noticia__fecha-fila">
        <span className="editar-noticia__fecha-icono" title="Fecha de creación" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <div className="editar-noticia__fecha-datos">
          <span className="editar-noticia__fecha-etiqueta">Fecha de creación</span>
          <span className="editar-noticia__fecha-texto">
            {formatearFechaHora(noticia?.fechaCreacion) || 'Registrada al crearse'}
          </span>
        </div>
      </div>

      {/* 2. Fecha de Actualización: Solo de acuerdo a si fue editada */}
      {fechaActualizacionExiste && (
        <div className="editar-noticia__fecha-fila">
          <span
            className="editar-noticia__fecha-icono editar-noticia__fecha-icono--edicion"
            title="Última edición"
            aria-hidden="true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </span>
          <div className="editar-noticia__fecha-datos">
            <span className="editar-noticia__fecha-etiqueta">Última actualización</span>
            <span className="editar-noticia__fecha-texto">
              {formatearFechaHora(noticia?.fechaActualizacion || noticia?.fechaModificacion)}
            </span>
          </div>
        </div>
      )}

      {/* 3. Fecha de Publicación: En caso de ser publicada */}
      {fechaPublicacionExiste && (
        <div className="editar-noticia__fecha-fila">
          <span
            className="editar-noticia__fecha-icono editar-noticia__fecha-icono--publicacion"
            title="Fecha de publicación"
            aria-hidden="true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <div className="editar-noticia__fecha-datos">
            <span className="editar-noticia__fecha-etiqueta">Fecha de publicación</span>
            <span className="editar-noticia__fecha-texto">
              {formatearFechaHora(noticia?.fechaPublicacion) || 'Publicada'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

