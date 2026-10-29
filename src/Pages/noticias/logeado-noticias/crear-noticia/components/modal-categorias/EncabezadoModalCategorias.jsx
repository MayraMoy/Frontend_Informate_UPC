import React from 'react';

export const EncabezadoModalCategorias = ({ onClose }) => {
  return (
    <div className="modal-categorias__encabezado">
      <div className="modal-categorias__encabezado-texto">
        <h2 id="modal-categorias-titulo" className="modal-categorias__titulo">
          Gestión de categorías y etiquetas
        </h2>
        <p className="modal-categorias__subtitulo">
          Creá nuevas etiquetas, editá sus nombres directamente en la tabla o eliminalas.
        </p>
      </div>

      <button
        type="button"
        className="modal-categorias__btn-cerrar"
        onClick={onClose}
        aria-label="Cerrar modal"
        title="Cerrar ventana"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default EncabezadoModalCategorias;

