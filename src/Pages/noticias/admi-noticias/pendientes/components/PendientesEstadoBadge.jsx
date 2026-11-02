import React from 'react';

const CONFIG_ESTADOS = {
  BORRADOR: {
    label: 'Borrador',
    className: 'badge-estado-borrador',
  },
  ARCHIVADA: {
    label: 'Archivada',
    className: 'badge-estado-archivada',
  },
  SUSPENDIDA: {
    label: 'Suspendida',
    className: 'badge-estado-suspendida',
  },
  PUBLICADA: {
    label: 'Publicada',
    className: 'badge-estado-publicada',
  },
};

export const PendientesEstadoBadge = ({ estado }) => {
  const estadoClave = String(estado || '').trim().toUpperCase();
  const config = CONFIG_ESTADOS[estadoClave] || {
    label: estadoClave || 'Pendiente',
    className: 'badge-estado-desconocido',
  };

  return (
    <span className={`pendientes-estado-badge ${config.className}`}>
      <svg
        className="badge-dot-icon"
        viewBox="0 0 8 8"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="4" cy="4" r="3" />
      </svg>
      <span>{config.label}</span>
    </span>
  );
};

export default PendientesEstadoBadge;

