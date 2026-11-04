import React from 'react';
import { Link } from 'react-router-dom';

export const TabPublicaciones = ({
  noticias = [],
  resoluciones = [],
  mostrarTipo = 'todas', // 'noticias' | 'resoluciones' | 'todas'
  formatearSoloFecha,
}) => {
  const verNoticias = mostrarTipo === 'todas' || mostrarTipo === 'noticias';
  const verResoluciones = mostrarTipo === 'todas' || mostrarTipo === 'resoluciones';

  return (
    <div className="usuarios-tab-pane">
      {verNoticias && (
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="usuarios-modal-seccion-titulo mb-0">Noticias Redactadas</h4>
            <span className="text-muted small">
              {noticias.length} {noticias.length === 1 ? 'noticia' : 'noticias'}
            </span>
          </div>

          {noticias.length === 0 ? (
            <div className="usuarios-actividad-vacia py-4">
              <p className="text-muted small mb-0">Este usuario no registra autoría en noticias institucionales.</p>
            </div>
          ) : (
            <div className="usuarios-publicaciones-lista">
              {noticias.map((n) => {
                const idNoticia = n.id ?? n.idNoticia;
                const nombreCat = n.categoria?.nombre || n.categoriaNoticia?.nombre || n.nombreCategoria || 'Institucional';
                const estadoNot = n.estado || n.estadoNoticia || 'PUBLICADA';

                return (
                  <article key={idNoticia || n.titulo} className="usuarios-publicacion-item">
                    <div className="d-flex align-items-start justify-content-between gap-3">
                      <div>
                        <h5 className="usuarios-pub-titulo mb-1">
                          {idNoticia ? (
                            <Link to={`/noticias/${idNoticia}`} className="text-decoration-none text-dark hover-amarillo">
                              {n.titulo}
                            </Link>
                          ) : (
                            n.titulo
                          )}
                        </h5>
                        <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
                          <span className="badge bg-light text-dark border small">{nombreCat}</span>
                          <span className="usuarios-estado-badge usuarios-estado-badge--aprobado">
                            {estadoNot}
                          </span>
                        </div>
                      </div>
                      <time className="text-muted small text-nowrap">
                        {formatearSoloFecha(n.fechaPublicacion || n.fechaCreacion)}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {verResoluciones && (
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="usuarios-modal-seccion-titulo mb-0">Resoluciones Oficiales</h4>
            <span className="text-muted small">
              {resoluciones.length} {resoluciones.length === 1 ? 'resolución' : 'resoluciones'}
            </span>
          </div>

          {resoluciones.length === 0 ? (
            <div className="usuarios-actividad-vacia py-4">
              <p className="text-muted small mb-0">Este usuario no registra autoría en resoluciones académicas oficiales.</p>
            </div>
          ) : (
            <div className="usuarios-publicaciones-lista">
              {resoluciones.map((r) => {
                const numRes = r.numeroResolucion || r.idResolucion || r.id;
                const nombreCat = r.categoria?.nombre || r.categoriaResolucion?.nombre || 'Académica';
                const estadoRes = r.estado || 'PUBLICADA';

                return (
                  <article key={r.idResolucion || r.id} className="usuarios-publicacion-item">
                    <div className="d-flex align-items-start justify-content-between gap-3">
                      <div>
                        <h5 className="usuarios-pub-titulo mb-1">
                          <span className="usuarios-resolucion-ref-pill me-2">RES #{numRes}</span>
                          <span className="text-dark">{r.titulo}</span>
                        </h5>
                        <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
                          <span className="badge bg-light text-dark border small">{nombreCat}</span>
                          <span className="usuarios-estado-badge usuarios-estado-badge--aprobado">
                            {estadoRes}
                          </span>
                        </div>
                      </div>
                      <time className="text-muted small text-nowrap">
                        {formatearSoloFecha(r.fechaCreacion || r.fechaPublicacion)}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabPublicaciones;
