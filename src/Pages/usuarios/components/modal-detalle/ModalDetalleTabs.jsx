import React from 'react';

export const ModalDetalleTabs = ({
  pestanaActiva,
  onSelectPestana,
  comentariosCount = 0,
  noticiasCount = 0,
  resolucionesCount = 0,
}) => {
  return (
    <div className="usuarios-modal-tabs">
      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'comentarios' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('comentarios')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Comentarios en Resoluciones</span>
        <span className="usuarios-tab-contador">{comentariosCount}</span>
      </button>

      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'noticias' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('noticias')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
        </svg>
        <span>Noticias Redactadas</span>
        <span className="usuarios-tab-contador">{noticiasCount}</span>
      </button>

      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'resoluciones' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('resoluciones')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span>Resoluciones Oficiales</span>
        <span className="usuarios-tab-contador">{resolucionesCount}</span>
      </button>

      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'info' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('info')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Información de la Cuenta</span>
      </button>
    </div>
  );
};

export default ModalDetalleTabs;
