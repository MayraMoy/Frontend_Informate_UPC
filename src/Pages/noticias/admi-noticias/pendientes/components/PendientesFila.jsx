import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatearFecha, obtenerThumbnail } from '../utils/pendientesHelpers';

const IconoImagenPlaceholder = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" width="36" height="36">
    <rect x="7" y="9" width="34" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="18" cy="19" r="3" fill="currentColor" />
    <path d="m9 34 10-10 7 7 5-5 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const PendientesFila = ({ noticia, onEliminar }) => {
  const navigate = useNavigate();
  const [imagenFallida, setImagenFallida] = useState(false);

  const thumbnail = obtenerThumbnail(noticia);
  const fecha = formatearFecha(
    noticia.fechaPublicacion || noticia.fechaCreacion || noticia.fechaActualizacion || noticia.fecha || noticia.createdAt
  );

  const handleEditar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/noticias/editar/${noticia.id}`, { state: { noticia } });
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEliminar) {
      onEliminar(noticia);
    }
  };

  return (
    <article className="novedad-card">
      {/* Imagen / Media idéntica a Ver Noticias */}
      <div className="novedad-card-media">
        <Link
          to={`/noticias/${noticia.id}`}
          state={{ noticia }}
          tabIndex={-1}
          aria-hidden="true"
          className="d-block w-100 h-100"
        >
          {thumbnail && !imagenFallida ? (
            <img
              src={thumbnail}
              alt={noticia.titulo || 'Noticia UPC'}
              loading="lazy"
              onError={() => setImagenFallida(true)}
            />
          ) : (
            <div className="novedad-card-image-placeholder">
              <IconoImagenPlaceholder />
            </div>
          )}
        </Link>
      </div>

      {/* Contenido idéntico a Ver Noticias */}
      <div className="novedad-card-content">
        <div className="novedad-card-meta d-flex align-items-center mb-2">
          <time className="novedad-card-date mb-0">
            {fecha}
          </time>
        </div>

        <h2 className="novedad-card-title">
          <Link to={`/noticias/${noticia.id}`} state={{ noticia }}>
            {noticia.titulo || 'Sin título'}
          </Link>
        </h2>

        {/* Acciones al pie: Editar y Eliminar */}
        <div className="novedad-card-acciones mt-auto pt-2">
          <button
            type="button"
            className="novedad-card-btn-editar"
            onClick={handleEditar}
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

          {onEliminar && (
            <button
              type="button"
              className="novedad-card-btn-eliminar"
              onClick={handleEliminar}
              title="Eliminar noticia"
              aria-label={`Eliminar noticia: ${noticia.titulo}`}
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
                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span>Eliminar</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default PendientesFila;
