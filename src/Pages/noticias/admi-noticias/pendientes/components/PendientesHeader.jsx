import React from 'react';

export const PendientesHeader = () => {
  return (
    <header className="pendientes-header">
      <div className="pendientes-header-info">
        <h1 className="pendientes-titulo">Noticias Pendientes</h1>
        <p className="pendientes-descripcion">
          Revisá, aprobá y gestioná las publicaciones en estado de borrador, archivadas o
          suspendidas antes de su visibilidad en el portal.
        </p>
      </div>
    </header>
  );
};

export default PendientesHeader;
