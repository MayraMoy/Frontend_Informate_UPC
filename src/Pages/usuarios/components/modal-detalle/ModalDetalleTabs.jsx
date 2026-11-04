import React from 'react';

export const ModalDetalleTabs = ({
  pestanaActiva,
  onSelectPestana,
  comentariosCount,
  publicacionesCount,
  mostrarPublicaciones,
}) => {
  return (
    <div className="usuarios-modal-tabs">
      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'comentarios' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('comentarios')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Comentarios en Resoluciones</span>
        <span className="usuarios-tab-contador">{comentariosCount}</span>
      </button>

      <button
        type="button"
        className={`usuarios-modal-tab ${pestanaActiva === 'info' ? 'usuarios-modal-tab--activa' : ''}`}
        onClick={() => onSelectPestana('info')}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Información de la Cuenta</span>
      </button>

      {mostrarPublicaciones && (
        <button
          type="button"
          className={`usuarios-modal-tab ${pestanaActiva === 'publicaciones' ? 'usuarios-modal-tab--activa' : ''}`}
          onClick={() => onSelectPestana('publicaciones')}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Publicaciones ({publicacionesCount})</span>
        </button>
      )}
    </div>
  );
};

export default ModalDetalleTabs;

