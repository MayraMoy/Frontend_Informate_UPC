import React from 'react';
import { IconoImagen } from '../IconosNoticia';

export const VistaPreviaVacia = () => {
  return (
    <div className="crear-noticia__preview-vacia">
      <div className="crear-noticia__preview-vacia-icono">
        <IconoImagen />
      </div>
      <h3>La vista previa está lista</h3>
      <p>Ingresá el título y contenido para ver la vista previa.</p>
    </div>
  );
};

export default VistaPreviaVacia;

