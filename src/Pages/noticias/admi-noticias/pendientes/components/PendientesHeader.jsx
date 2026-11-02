import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PendientesHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="pendientes-header">
      <div className="pendientes-header-info">
        <div className="pendientes-header-badge">
          <svg
            className="pendientes-badge-icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Gestión de Contenidos</span>
        </div>
        <h1 className="pendientes-titulo">Noticias Pendientes</h1>
        <p className="pendientes-descripcion">
          Revisá, aprobá y gestioná las publicaciones en estado de borrador, archivadas o
          suspendidas antes de su visibilidad en el portal.
        </p>
      </div>

      <div className="pendientes-header-actions">
        <button
          type="button"
          className="btn-crear-noticia"
          onClick={() => navigate('/crear-noticia')}
          title="Crear una nueva noticia"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Nueva Noticia</span>
        </button>
      </div>
    </header>
  );
};

export default PendientesHeader;

