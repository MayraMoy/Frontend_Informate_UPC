import React from 'react';

export const ResolucionesEmptyState = ({ mensaje = 'No se encontraron resoluciones oficiales disponibles.' }) => {
  return (
    <div className="text-center p-4 bg-white rounded-3 border">
      <p className="mb-0 text-muted">{mensaje}</p>
    </div>
  );
};

