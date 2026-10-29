import React from 'react';

export const NovedadCardAcciones = ({ noticia, onEditar }) => {
  if (!onEditar) return null;

  return (
    <div className="novedad-card-acciones mt-auto pt-2">
      <button
        type="button"
        className="novedad-card-btn-editar"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEditar(noticia);
        }}
        title="Editar noticia"
        aria-label={`Editar noticia: ${noticia.titulo}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span>Editar</span>
      </button>
    </div>
  );
};

export default NovedadCardAcciones;

