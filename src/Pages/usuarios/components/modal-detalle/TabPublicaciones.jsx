import React from 'react';
import { Link } from 'react-router-dom';

const obtenerClaseEstado = (estado) => {
  const est = String(estado || '').toLowerCase().trim();
  if (['publicada', 'publicado', 'aprobada', 'aprobado', 'vigente', 'activo'].includes(est)) {
    return 'usuarios-estado-badge--aprobado';
  }
  if (['borrador', 'pendiente', 'en_revision', 'en revision'].includes(est)) {
    return 'usuarios-estado-badge--pendiente';
  }
  if (['rechazada', 'rechazado', 'archivada', 'archivado', 'suspendido'].includes(est)) {
    return 'usuarios-estado-badge--rechazado';
  }
  return 'usuarios-estado-badge--neutral';
};

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
          <div className="usuarios-tab-context-bar d-flex align-items-center justify-content-between mb-3">
            <span className="text-muted small">
              Publicaciones redactadas por este usuario en el portal ({noticias.length})
            </span>
          </div>

          {noticias.length === 0 ? (
            <div className="usuarios-actividad-vacia py-4">
              <div className="usuarios-actividad-vacia-icono" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                </svg>
              </div>
              <h5>Sin noticias registradas</h5>
              <p className="text-muted small mb-0">Este usuario no registra autoría en noticias institucionales.</p>
            </div>
          ) : (
            <div className="usuarios-publicaciones-lista">
              {noticias.map((n) => {
                const idNoticia = n.id ?? n.idNoticia;
                const nombreCat = n.categoria?.nombre || n.categoriaNoticia?.nombre || n.nombreCategoria || 'Institucional';
                const estadoNot = n.estado || n.estadoNoticia || 'PUBLICADA';
                const resumenTexto = n.resumen || n.copete || n.bajada || n.descripcion || '';

                return (
                  <article key={idNoticia || n.titulo} className="usuarios-publicacion-card">
                    {/* Fila superior: Categoría, Estado y Fecha */}
                    <div className="usuarios-pub-card-top">
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="usuarios-tag-categoria">{nombreCat}</span>
                        <span className={`usuarios-estado-badge ${obtenerClaseEstado(estadoNot)}`}>
                          {estadoNot}
                        </span>
                      </div>

                      <time className="usuarios-pub-fecha" dateTime={n.fechaPublicacion || n.fechaCreacion}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{formatearSoloFecha(n.fechaPublicacion || n.fechaCreacion)}</span>
                      </time>
                    </div>

                    {/* Título de la Noticia */}
                    <h5 className="usuarios-pub-titulo">
                      {idNoticia ? (
                        <Link to={`/noticias/${idNoticia}`} className="usuarios-pub-titulo-link">
                          {n.titulo}
                        </Link>
                      ) : (
                        n.titulo
                      )}
                    </h5>

                    {/* Resumen o Copete si existe */}
                    {resumenTexto && (
                      <p className="usuarios-pub-resumen">
                        {resumenTexto}
                      </p>
                    )}

                    {/* Pie de la card con enlace de acción */}
                    <div className="usuarios-pub-card-footer">
                      <span className="usuarios-pub-tipo-label">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                        </svg>
                        <span>Noticia Institucional</span>
                      </span>

                      {idNoticia && (
                        <Link to={`/noticias/${idNoticia}`} className="usuarios-pub-link-accion">
                          <span>Leer noticia completa</span>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </Link>
                      )}
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
          <div className="usuarios-tab-context-bar d-flex align-items-center justify-content-between mb-3">
            <span className="text-muted small">
              Resoluciones y disposiciones académicas asociadas ({resoluciones.length})
            </span>
          </div>

          {resoluciones.length === 0 ? (
            <div className="usuarios-actividad-vacia py-4">
              <div className="usuarios-actividad-vacia-icono" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h5>Sin resoluciones registradas</h5>
              <p className="text-muted small mb-0">Este usuario no registra autoría en resoluciones académicas oficiales.</p>
            </div>
          ) : (
            <div className="usuarios-publicaciones-lista">
              {resoluciones.map((r) => {
                const numRes = r.numeroResolucion || r.idResolucion || r.id;
                const nombreCat = r.categoria?.nombre || r.categoriaResolucion?.nombre || 'Académica';
                const estadoRes = r.estado || 'PUBLICADA';
                const descTexto = r.descripcion || r.resumen || '';

                return (
                  <article key={r.idResolucion || r.id} className="usuarios-publicacion-card">
                    {/* Fila superior: Identificador oficial, Categoría, Estado y Fecha */}
                    <div className="usuarios-pub-card-top">
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="usuarios-resolucion-ref-pill">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          RES #{numRes}
                        </span>
                        <span className="usuarios-tag-categoria">{nombreCat}</span>
                        <span className={`usuarios-estado-badge ${obtenerClaseEstado(estadoRes)}`}>
                          {estadoRes}
                        </span>
                      </div>

                      <time className="usuarios-pub-fecha" dateTime={r.fechaCreacion || r.fechaPublicacion}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{formatearSoloFecha(r.fechaCreacion || r.fechaPublicacion)}</span>
                      </time>
                    </div>

                    {/* Título de la Resolución */}
                    <h5 className="usuarios-pub-titulo">
                      <span className="text-dark">{r.titulo}</span>
                    </h5>

                    {/* Descripción o extracto si existe */}
                    {descTexto && (
                      <p className="usuarios-pub-resumen">
                        {descTexto}
                      </p>
                    )}

                    {/* Pie de la card con enlace de acción */}
                    <div className="usuarios-pub-card-footer">
                      <span className="usuarios-pub-tipo-label">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span>Disposición Oficial</span>
                      </span>

                      <Link to="/resoluciones" className="usuarios-pub-link-accion">
                        <span>Ver en resoluciones</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
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
