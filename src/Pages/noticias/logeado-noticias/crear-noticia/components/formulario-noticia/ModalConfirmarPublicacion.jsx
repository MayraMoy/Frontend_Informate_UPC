import React from 'react';

export const ModalConfirmarPublicacion = ({
  isOpen,
  onCancelar,
  onConfirmar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="crear-noticia__overlay" role="presentation">
      <section
        className="crear-noticia__dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmacion-titulo"
      >
        <h2 id="confirmacion-titulo" style={{ marginBottom: '1.5rem' }}>
          ¿Confirmás la publicación?
        </h2>

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
            className="crear-noticia__boton-principal"
            onClick={onConfirmar}
          >
            Confirmar y publicar
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalConfirmarPublicacion;
