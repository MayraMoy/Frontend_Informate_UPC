import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoticiaCard } from '../hooks/useNoticiaCard.js';

const IconoImagen = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="7" y="9" width="34" height="30" rx="4" />
    <circle cx="18" cy="19" r="3" />
    <path d="m9 34 10-10 7 7 5-5 8 8" />
  </svg>
);

const NovedadCard = ({ noticia, headingLevel, onEditar }) => {
  const { formatearFecha, getBadgeClass } = useNoticiaCard(noticia);
  const [imagenFallida, setImagenFallida] = useState(false);
  const imagen = noticia.imagenes?.find((item) => item?.url);
  const Heading = headingLevel;
  const nombreCategoria = noticia.categoriaNoticia?.nombre || noticia.categoria?.nombre;

  return (
    <article className="novedad-card">
      <div className="novedad-card-media">
        <Link
          to={`/noticias/${noticia.id}`}
          state={{ noticia }}
          tabIndex={-1}
          aria-hidden="true"
          className="d-block w-100 h-100"
        >
          {imagen?.url && !imagenFallida ? (
            <img
              src={imagen.url}
              alt={imagen.epigrafe || noticia.titulo}
              loading="lazy"
              onError={() => setImagenFallida(true)}
            />
          ) : (
            <div className="novedad-card-image-placeholder"><IconoImagen /></div>
          )}
        </Link>
      </div>

      <div className="novedad-card-content">
        <div className="d-flex justify-content-between align-items-center mb-1">
          {nombreCategoria && (
            <span
              className={`badge rounded-pill px-2.5 py-1 ${getBadgeClass(nombreCategoria)}`}
              style={{ fontSize: '0.72rem', fontWeight: 600 }}
            >
              {nombreCategoria.toUpperCase()}
            </span>
          )}
          <time className="novedad-card-date mb-0 ms-auto" dateTime={noticia.fechaPublicacion || undefined}>
            {formatearFecha(noticia.fechaPublicacion)}
          </time>
        </div>
        <Heading className="novedad-card-title">
          <Link to={`/noticias/${noticia.id}`} state={{ noticia }}>
            {noticia.titulo}
          </Link>
        </Heading>

        {onEditar && (
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
        )}
      </div>
    </article>
  );
};

export default NovedadCard;
