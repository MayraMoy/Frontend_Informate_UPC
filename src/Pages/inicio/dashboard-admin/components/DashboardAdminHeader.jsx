import React from 'react';
import { formatearFechaActual } from '../utils/dashboardHelpers';

export const DashboardAdminHeader = ({ user, cargando, onRecargar }) => {
  const nombreUsuario =
    user?.nombre ||
    user?.username ||
    user?.email?.split('@')[0] ||
    'Administrador';

  const fechaHoy = formatearFechaActual();

  return (
    <header className="dashboard-admin__header">
      <div className="dashboard-admin__header-info">
        <div className="dashboard-admin__header-badges">
          <span className="dashboard-admin__fecha-texto">{fechaHoy}</span>
        </div>
        <h1 className="dashboard-admin__saludo">
          Hola, <span className="dashboard-admin__nombre-resaltado">{nombreUsuario}</span>
        </h1>
        <p className="dashboard-admin__subtitulo">
          Supervisá el estado general del portal, gestioná contenidos pendientes y accedé a las acciones principales.
        </p>
      </div>

      <div className="dashboard-admin__header-acciones">
        <button
          type="button"
          className="dashboard-admin__btn-actualizar"
          onClick={onRecargar}
          disabled={cargando}
          title="Actualizar datos del panel"
          aria-label="Actualizar datos del panel"
        >
          <svg
            className={`dashboard-admin__icono-recargar ${cargando ? 'dashboard-admin__icono-recargar--girando' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          <span>{cargando ? 'Actualizando...' : 'Actualizar'}</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardAdminHeader;

