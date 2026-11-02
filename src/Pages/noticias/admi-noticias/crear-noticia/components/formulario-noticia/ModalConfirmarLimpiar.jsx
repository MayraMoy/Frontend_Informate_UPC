import React from 'react';

export const ModalConfirmarLimpiar = ({ isOpen, onCancelar, onConfirmar }) => {
  if (!isOpen) return null;

  return (
    <div className="crear-noticia__overlay" role="presentation">
      <section
        className="crear-noticia__dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="limpiar-titulo"
        aria-describedby="limpiar-descripcion"
      >
        <h2 id="limpiar-titulo">¿Limpiar formulario?</h2>

        <p id="limpiar-descripcion">
          Se restablecerán el título, el contenido y las imágenes seleccionadas.
        </p>

        <div className="crear-noticia__acciones-dialogo">
          <button
            type="button"
            className="crear-noticia__boton-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="crear-noticia__boton-peligro"
            onClick={onConfirmar}
          >
            Limpiar campos
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalConfirmarLimpiar;

