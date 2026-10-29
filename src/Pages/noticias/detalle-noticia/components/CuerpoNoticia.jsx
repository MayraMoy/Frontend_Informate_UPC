import React from 'react';
import ContenidoNoticia from '../../logeado-noticias/crear-noticia/components/ContenidoNoticia';

export const CuerpoNoticia = ({ cuerpo = '' }) => {
  if (!cuerpo) {
    return (
      <div className="detalle-noticia-cuerpo-vacio text-secondary py-3">
        <em>Esta noticia no contiene cuerpo de texto adicional.</em>
      </div>
    );
  }

  return (
    <section className="detalle-noticia-cuerpo" aria-label="Contenido principal de la noticia">
      <ContenidoNoticia cuerpo={cuerpo} />
    </section>
  );
};

export default CuerpoNoticia;

