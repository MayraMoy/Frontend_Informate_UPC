import React from 'react';

export const ModalDetalleKpis = ({
  comentariosCount,
  noticiasCount,
  resolucionesCount,
  cargando,
  pestanaActiva,
  onSelectPestana,
}) => {
  return (
    <div className="usuarios-modal-kpis">
      <button
        type="button"
        className={`usuarios-kpi-item ${pestanaActiva === 'comentarios' ? 'usuarios-kpi-item--activo' : ''}`}
        onClick={() => onSelectPestana('comentarios')}
      >
        <div className="usuarios-kpi-icono usuarios-kpi-icono--comentarios" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="usuarios-kpi-texto">
          <span className="usuarios-kpi-valor">{cargando ? '...' : comentariosCount}</span>
          <span className="usuarios-kpi-label">Comentarios en Resoluciones</span>
        </div>
      </button>

      <button
        type="button"
        className={`usuarios-kpi-item ${pestanaActiva === 'noticias' ? 'usuarios-kpi-item--activo' : ''}`}
        onClick={() => onSelectPestana('noticias')}
      >
        <div className="usuarios-kpi-icono usuarios-kpi-icono--noticias" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
          </svg>
        </div>
        <div className="usuarios-kpi-texto">
          <span className="usuarios-kpi-valor">{cargando ? '...' : noticiasCount}</span>
          <span className="usuarios-kpi-label">Noticias Redactadas</span>
        </div>
      </button>

      <button
        type="button"
        className={`usuarios-kpi-item ${pestanaActiva === 'resoluciones' ? 'usuarios-kpi-item--activo' : ''}`}
        onClick={() => onSelectPestana('resoluciones')}
      >
        <div className="usuarios-kpi-icono usuarios-kpi-icono--resoluciones" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div className="usuarios-kpi-texto">
          <span className="usuarios-kpi-valor">{cargando ? '...' : resolucionesCount}</span>
          <span className="usuarios-kpi-label">Resoluciones Creadas</span>
        </div>
      </button>
    </div>
  );
};

export default ModalDetalleKpis;

