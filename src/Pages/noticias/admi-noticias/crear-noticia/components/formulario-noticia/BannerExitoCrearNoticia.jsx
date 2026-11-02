import React from 'react';
import { IconoCheck } from '../IconosNoticia';

export const BannerExitoCrearNoticia = ({ mensajeExito, onCrearOtra }) => {
  if (!mensajeExito) return null;

  return (
    <section className="crear-noticia__exito-banner" role="status">
      <div className="crear-noticia__exito-icono">
        <IconoCheck />
      </div>
      <div className="crear-noticia__exito-texto">
        <h3>{mensajeExito}</h3>
        <p>La noticia ya se encuentra registrada en el sistema.</p>
      </div>
      <div className="crear-noticia__exito-botones">
        <button
          type="button"
          className="crear-noticia__boton-exito-principal"
          onClick={onCrearOtra}
        >
          Crear otra noticia
        </button>
      </div>
    </section>
  );
};

export default BannerExitoCrearNoticia;

