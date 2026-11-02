import React from 'react';

export const BotonHerramienta = ({
  icono,
  accion,
  activo = false,
  deshabilitado = false,
  titulo = '',
}) => {
  return (
    <button
      type="button"
      title={titulo}
      aria-label={titulo}
      aria-pressed={activo}
      disabled={deshabilitado}
      className={`editor-noticia__boton ${activo ? 'editor-noticia__boton--activo' : ''}`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={accion}
    >
      {icono}
    </button>
  );
};

export default BotonHerramienta;

