import React from 'react';

export const NovedadCardMeta = ({
  nombreCategoria,
  badgeClass,
  fechaPublicacion,
  fechaFormateada,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-1">
      {nombreCategoria && (
        <span
          className={`badge rounded-pill px-2.5 py-1 ${badgeClass}`}
          style={{ fontSize: '0.72rem', fontWeight: 600 }}
        >
          {nombreCategoria.toUpperCase()}
        </span>
      )}
      <time className="novedad-card-date mb-0 ms-auto" dateTime={fechaPublicacion || undefined}>
        {fechaFormateada}
      </time>
    </div>
  );
};

export default NovedadCardMeta;

