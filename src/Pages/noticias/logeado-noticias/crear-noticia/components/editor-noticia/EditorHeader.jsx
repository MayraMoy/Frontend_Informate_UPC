import React from 'react';

export const EditorHeader = ({ requerido = true, lectura, palabras }) => {
  return (
    <div className="editor-noticia__encabezado">
      <label className="editor-noticia__etiqueta">
        Cuerpo de la noticia
        {requerido && <span className="crear-noticia__requerido" aria-hidden="true"> *</span>}
      </label>
      <span className="editor-noticia__lectura-badge">
        {lectura} · {palabras} {palabras === 1 ? 'palabra' : 'palabras'}
      </span>
    </div>
  );
};

export default EditorHeader;

