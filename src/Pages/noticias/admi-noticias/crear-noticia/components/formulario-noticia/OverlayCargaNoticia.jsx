import React from 'react';

export const OverlayCargaNoticia = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className="crear-noticia__overlay"
      role="status"
      aria-live="polite"
    >
      <section className="crear-noticia__dialogo crear-noticia__dialogo--carga">
        <span className="crear-noticia__spinner" aria-hidden="true" />
        <h2>Guardando noticia...</h2>
        <p>Por favor, esperá un momento mientras se suben los datos.</p>
      </section>
    </div>
  );
};

export default OverlayCargaNoticia;

