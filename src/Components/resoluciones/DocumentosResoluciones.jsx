import React from 'react';
import { ResolucionDocumentoCard } from './documentos-resoluciones/ResolucionDocumentoCard.jsx';
import { ResolucionesEmptyState } from './documentos-resoluciones/ResolucionesEmptyState.jsx';
import './DocumentosResoluciones.css';

export const DocumentosResoluciones = ({
  resoluciones = [],
  onVerDetalle,
  onEditar,
  esAdmin = false,
}) => {
  if (!resoluciones || resoluciones.length === 0) {
    return <ResolucionesEmptyState />;
  }

  return (
    <div className="resoluciones-documentos-lista">
      {resoluciones.map((res, index) => (
        <ResolucionDocumentoCard
          key={res.idResolucion || res.codigoResolucion || index}
          resolucion={res}
          onVerDetalle={onVerDetalle}
          onEditar={onEditar}
          esAdmin={esAdmin}
        />
      ))}
    </div>
  );
};

export default DocumentosResoluciones;
