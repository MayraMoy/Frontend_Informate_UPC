import React from 'react';

export const TabPublicaciones = ({
  noticias,
  resoluciones,
  formatearSoloFecha,
}) => {
  return (
    <div className="usuarios-tab-pane">
      <h4 className="usuarios-modal-seccion-titulo mb-3">Noticias Redactadas</h4>
      {noticias.length === 0 ? (
        <p className="text-muted small mb-4 fst-italic">No registra autoría en noticias institucionales.</p>
      ) : (
        <div className="usuarios-publicaciones-lista mb-4">
          {noticias.map((n) => (
            <div key={n.id || n.idNoticia} className="usuarios-publicacion-item">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fw-semibold text-dark">{n.titulo}</span>
                <span className="text-muted small">{formatearSoloFecha(n.fechaPublicacion || n.fechaCreacion)}</span>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <span className="badge bg-light text-secondary border small">{n.categoria?.nombre || 'General'}</span>
                <span className="small text-muted">Estado: {n.estado || 'PUBLICADA'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4 className="usuarios-modal-seccion-titulo mb-3">Resoluciones Oficiales</h4>
      {resoluciones.length === 0 ? (
        <p className="text-muted small mb-0 fst-italic">No registra autoría en resoluciones académicas.</p>
      ) : (
        <div className="usuarios-publicaciones-lista">
          {resoluciones.map((r) => (
            <div key={r.idResolucion || r.id} className="usuarios-publicacion-item">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fw-semibold text-dark">RES #{r.numeroResolucion}: {r.titulo}</span>
                <span className="text-muted small">{formatearSoloFecha(r.fechaCreacion || r.fechaPublicacion)}</span>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <span className="badge bg-light text-secondary border small">{r.categoria?.nombre || 'Académica'}</span>
                <span className="small text-muted">Estado: {r.estado || 'PUBLICADA'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabPublicaciones;

