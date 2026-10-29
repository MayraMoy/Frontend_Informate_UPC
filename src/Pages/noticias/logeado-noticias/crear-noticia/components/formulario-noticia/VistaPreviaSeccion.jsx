import React from 'react';
import VistaPreviaNoticia from '../VistaPreviaNoticia';
import { IconoEditar } from '../IconosNoticia';

export const VistaPreviaSeccion = ({
  valores,
  categorias,
  imagenes,
  usuario,
  onVolverEditor,
  onPublicar,
  guardando,
}) => {
  return (
    <div className="crear-noticia__preview-seccion">
      <VistaPreviaNoticia
        valores={valores}
        categorias={categorias}
        imagenes={imagenes}
        usuario={usuario}
      />
      <div className="crear-noticia__preview-acciones-pie">
        <button
          type="button"
          className="crear-noticia__boton-secundario"
          onClick={onVolverEditor}
        >
          <IconoEditar />
          <span>Volver a redactar</span>
        </button>
        <button
          type="button"
          className="crear-noticia__boton-principal"
          onClick={onPublicar}
          disabled={guardando}
        >
          <span>Publicar noticia</span>
        </button>
      </div>
    </div>
  );
};

export default VistaPreviaSeccion;

