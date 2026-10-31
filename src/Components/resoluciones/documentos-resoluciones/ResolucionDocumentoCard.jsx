import React from 'react';
import { formatearFechaResolucion } from './useFormatoFechaResolucion.js';

export const ResolucionDocumentoCard = ({
  resolucion,
  onVerDetalle,
  onEditar,
  esAdmin = false,
}) => {
  return (
    <article className="resolucion-documento-card">
      <div className="resolucion-documento-main">
        <div className="resolucion-doc-info">
          {/* Número de resolución */}
          {resolucion.numeroResolucion && (
            <div className="resolucion-doc-badges">
              <span className="resolucion-doc-numero">{resolucion.numeroResolucion}</span>
            </div>
          )}

          {/* Título de la resolución */}
          <h3 className="resolucion-doc-titulo">
            {resolucion.titulo}
          </h3>

          {/* Fecha de publicación */}
          <div className="resolucion-doc-meta">
            <span>Publicada el {formatearFechaResolucion(resolucion.fechaCreacion)}</span>
          </div>
        </div>
      </div>

      {/* Acciones a la derecha */}
      <div className="resolucion-doc-acciones">
        {esAdmin && (
          <button
            type="button"
            className="btn btn-sm btn-outline-warning text-dark font-weight-bold"
            onClick={() => onEditar && onEditar(resolucion)}
            title="Modificar estado o contenido de esta resolución"
          >
            EDITAR
          </button>
        )}

        <button
          type="button"
          className="btn-descargar-doc"
          onClick={() => onVerDetalle && onVerDetalle(resolucion)}
          title="Descargar o consultar documento oficial"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Descargar PDF</span>
        </button>

        <button
          type="button"
          className="btn-ver-doc"
          onClick={() => onVerDetalle && onVerDetalle(resolucion)}
        >
          <span>Ver detalles</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
};

