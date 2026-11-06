import React from 'react';

export const PerfilTabs = ({
  tabActiva,
  onCambiarTab,
  conteoComentarios = 0,
}) => {
  return (
    <nav className="perfil-tabs-nav" aria-label="Secciones del perfil">
      <div className="perfil-tabs-list" role="tablist">
        <button
          type="button"
          role="tab"
          id="tab-datos"
          aria-controls="panel-datos"
          aria-selected={tabActiva === 'datos'}
          className={`perfil-tab-btn${tabActiva === 'datos' ? ' is-active' : ''}`}
          onClick={() => onCambiarTab('datos')}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Datos personales</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-comentarios"
          aria-controls="panel-comentarios"
          aria-selected={tabActiva === 'comentarios'}
          className={`perfil-tab-btn${tabActiva === 'comentarios' ? ' is-active' : ''}`}
          onClick={() => onCambiarTab('comentarios')}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Mis comentarios</span>
          {typeof conteoComentarios === 'number' && (
            <span className="perfil-tab-badge">
              {conteoComentarios}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default PerfilTabs;
