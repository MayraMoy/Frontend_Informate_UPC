import React from 'react';

export const PieModalCategorias = ({ onClose }) => {
  return (
    <div className="modal-categorias__pie">
      <p className="modal-categorias__pie-info">
        Los cambios se reflejan de forma inmediata en las noticias institucionales.
      </p>
      <button
        type="button"
        className="modal-categorias__btn-listo"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
};

export default PieModalCategorias;

