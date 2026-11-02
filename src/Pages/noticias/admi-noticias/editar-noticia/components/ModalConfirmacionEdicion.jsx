import React, { useEffect } from 'react';
import { IconoCheck, IconoVolver } from '../../crear-noticia/components/IconosNoticia';
import '../styles/ModalConfirmacionEdicion.css';

/**
 * Modal emergente de confirmación tras registrar los cambios de una noticia.
 * Breve, legible y con las acciones directas de "Seguir editando" y "Volver al listado".
 */
export const ModalConfirmacionEdicion = ({
  isOpen,
  onVolverListado,
  onCerrar,
}) => {
  // Manejo de tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onCerrar) {
        onCerrar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCerrar]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-confirmacion-edicion__overlay"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-edicion-titulo"
      aria-describedby="modal-edicion-descripcion"
    >
      <div
        className="modal-confirmacion-edicion__card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre en esquina superior */}
        {onCerrar && (
          <button
            type="button"
            className="modal-confirmacion-edicion__btn-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        )}

        {/* Ícono de confirmación */}
        <div className="modal-confirmacion-edicion__icono-wrapper" aria-hidden="true">
          <div className="modal-confirmacion-edicion__icono-circulo">
            <IconoCheck />
          </div>
        </div>

        {/* Título y descripción breves y directos */}
        <h2 id="modal-edicion-titulo" className="modal-confirmacion-edicion__titulo">
          ¡Cambios guardados con éxito!
        </h2>

        <p id="modal-edicion-descripcion" className="modal-confirmacion-edicion__descripcion">
          El cambio quedó registrado correctamente en la plataforma.
        </p>

        {/* Acciones: exactamente los dos botones previos */}
        <div className="modal-confirmacion-edicion__acciones">
          {onCerrar && (
            <button
              type="button"
              className="modal-confirmacion-edicion__btn-secundario"
              onClick={onCerrar}
            >
              Seguir editando
            </button>
          )}

          <button
            type="button"
            className="modal-confirmacion-edicion__btn-principal"
            onClick={onVolverListado}
            autoFocus
          >
            <IconoVolver />
            <span>Volver al listado</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionEdicion;
