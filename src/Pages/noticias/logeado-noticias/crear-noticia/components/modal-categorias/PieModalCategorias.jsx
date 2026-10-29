import React from 'react';

export const PieModalCategorias = ({ onClose }) => {
  return (
    <div className="modal-categorias__pie">
      <p className="modal-categorias__pie-info">
        Los cambios se actualizan de forma inmediata en los formularios de creación y edición.
      </p>
      <button
        type="button"
        className="modal-categorias__btn-listo"
        onClick={onClose}
      >
        Listo
      </button>
    </div>
  );
};

export default PieModalCategorias;

