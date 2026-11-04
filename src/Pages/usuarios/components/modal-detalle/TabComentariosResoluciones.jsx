import React from 'react';

export const TabComentariosResoluciones = ({
  comentarios,
  cargando,
  usuario,
  formatearFecha,
}) => {
  if (cargando) {
    return (
      <div className="usuarios-actividad-loading">
        <div className="spinner-border spinner-border-sm text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="text-muted small">Recuperando comentarios del estudiante...</span>
      </div>
    );
  }

  if (comentarios.length === 0) {
    return (
      <div className="usuarios-actividad-vacia">
        <div className="usuarios-actividad-vacia-icono" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h5>Sin comentarios registrados</h5>
        <p className="text-muted small mb-0">
          Este usuario no ha emitido consultas, sugerencias ni reclamos sobre ninguna resolución académica hasta el momento.
        </p>
      </div>
    );
  }

  return (
    <div className="usuarios-tab-pane">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="usuarios-modal-seccion-titulo mb-0">
          Consultas y comentarios sobre Resoluciones
        </h4>
        <span className="text-muted small">
          {comentarios.length} {comentarios.length === 1 ? 'comentario' : 'comentarios'} registrado{comentarios.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="usuarios-comentarios-lista">
        {comentarios.map((c) => {
          const numResolucion = c.numeroResolucion || c.idResolucion;
          const asunto = `Respuesta a consulta sobre Resolución #${numResolucion} - Foro UPC`;
          const cuerpo = `Hola ${usuario.nombre || 'estudiante'},\n\nTe contactamos desde la administración institucional de la UPC en respuesta al comentario que dejaste en la Resolución #${numResolucion}:\n\n"${c.contenido}"\n\n`;

          return (
            <article
              key={c.idComentario || `${c.idResolucion}-${c.fechaCreacion}`}
              className="usuarios-comentario-item"
            >
              <div className="usuarios-comentario-head">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="usuarios-resolucion-ref-pill">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Resolución #{numResolucion}
                  </span>
                  {c.estado && (
                    <span className={`usuarios-estado-badge usuarios-estado-badge--${String(c.estado).toLowerCase()}`}>
                      ● {c.estado}
                    </span>
                  )}
                  {c.nombreCarrera && (
                    <span className="text-muted small">
                      • Carrera: {c.nombreCarrera} {c.anioCarrera ? `(${c.anioCarrera}° año)` : ''}
                    </span>
                  )}
                </div>
                <time className="text-muted small">
                  {formatearFecha(c.fechaCreacion)}
                </time>
              </div>

              <div className="usuarios-comentario-body">
                <p className="mb-0">"{c.contenido}"</p>
              </div>

              <div className="usuarios-comentario-footer">
                {usuario.email ? (
                  <a
                    href={`mailto:${usuario.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`}
                    className="usuarios-btn-responder-comentario"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 17 4 12 9 7" />
                      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                    </svg>
                    <span>Responder directamente por correo</span>
                  </a>
                ) : (
                  <span className="text-muted small">Sin correo registrado para responder</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default TabComentariosResoluciones;

