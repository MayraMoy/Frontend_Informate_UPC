import React, { useEffect } from 'react';

export const ModalConfirmarEliminarComentario = ({
  comentario,
  resolucionInfo,
  isOpen,
  eliminando,
  onClose,
  onConfirmar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !eliminando) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, eliminando, onClose]);

  if (!isOpen || !comentario) return null;

  const resTitulo = resolucionInfo?.titulo || `Resolución #${comentario.idResolucion}`;
  const contenido = comentario.contenido || '';
  const snippet = contenido.length > 140 ? `${contenido.slice(0, 140)}...` : contenido;

  return (
    <div
      className="modal-eliminar-comentario-backdrop"
      onClick={eliminando ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-eliminar-titulo"
    >
      <div
        className="modal-eliminar-comentario-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-eliminar-icon-wrapper" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h3 id="modal-eliminar-titulo" className="modal-eliminar-titulo">
          ¿Eliminar comentario?
        </h3>

        <p className="modal-eliminar-descripcion">
          Esta acción removerá definitivamente tu comentario realizado en{' '}
          <strong>{resTitulo}</strong>. Esta acción no se puede deshacer.
        </p>

        {snippet && (
          <blockquote className="modal-eliminar-cita">
            "{snippet}"
          </blockquote>
        )}

        <div className="modal-eliminar-acciones">
          <button
            type="button"
            className="modal-eliminar-btn-cancelar"
            onClick={onClose}
            disabled={eliminando}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="modal-eliminar-btn-confirmar"
            onClick={onConfirmar}
            disabled={eliminando}
          >
            {eliminando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Eliminando...
              </>
            ) : (
              'Sí, eliminar comentario'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEliminarComentario;
