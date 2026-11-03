import React, { useEffect } from 'react';
import './styles/ModalConfirmacionEliminar.css';

const IconoPapeleraPeligro = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const ModalConfirmacionEliminar = ({
  isOpen,
  titulo = '¿Eliminar noticia definitivamente?',
  mensaje = 'Esta acción es permanente y no se podrá deshacer. La noticia será retirada del portal.',
  itemNombre = '',
  textoBotonConfirmar = 'Eliminar noticia',
  textoBotonCancelar = 'Cancelar',
  enProgreso = false,
  onConfirmar,
  onCancelar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !enProgreso && onCancelar) {
        onCancelar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, enProgreso, onCancelar]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-destructivo-overlay"
      onClick={!enProgreso ? onCancelar : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destructivo-titulo"
    >
      <div
        className="modal-destructivo-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-destructivo-icono-circulo" aria-hidden="true">
          <IconoPapeleraPeligro />
        </div>

        <h3 id="modal-destructivo-titulo" className="modal-destructivo-titulo">
          {titulo}
        </h3>

        <p className="modal-destructivo-mensaje">{mensaje}</p>

        {itemNombre && (
          <div className="modal-destructivo-item-preview" title={itemNombre}>
            {itemNombre}
          </div>
        )}

        <div className="modal-destructivo-acciones">
          <button
            type="button"
            className="modal-destructivo-btn-cancelar"
            onClick={onCancelar}
            disabled={enProgreso}
          >
            {textoBotonCancelar}
          </button>

          <button
            type="button"
            className="modal-destructivo-btn-confirmar"
            onClick={onConfirmar}
            disabled={enProgreso}
          >
            {enProgreso && <span className="modal-destructivo-spinner" aria-hidden="true" />}
            <span>{enProgreso ? 'Eliminando...' : textoBotonConfirmar}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionEliminar;

