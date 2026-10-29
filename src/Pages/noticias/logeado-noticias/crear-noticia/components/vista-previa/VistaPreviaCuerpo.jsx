import React from 'react';
import ContenidoNoticia from '../ContenidoNoticia';

export const VistaPreviaCuerpo = ({ cuerpo, tieneCuerpo }) => {
  return (
    <div className="crear-noticia__preview-cuerpo">
      {tieneCuerpo ? (
        <ContenidoNoticia cuerpo={cuerpo} />
      ) : (
        <p className="crear-noticia__preview-cuerpo-vacio">
          [Contenido de la noticia]
        </p>
      )}
    </div>
  );
};

export default VistaPreviaCuerpo;

