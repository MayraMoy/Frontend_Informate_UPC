import React from 'react';
import { Link } from 'react-router-dom';
import { IconoPlaceholder } from './IconoPlaceholder.jsx';

export const NovedadHeroCard = ({ noticia, onClick }) => {
  if (!noticia) return null;

  const imgPrincipal = noticia?.imagenes?.find((img) => img?.url)?.url;
  const fechaPrincipal = noticia?.fechaPublicacion
    ? new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <article
      className="novedad-hero-card"
      onClick={onClick}
      role="article"
      aria-label={noticia.titulo}
    >
      <Link
        to={`/noticias/${noticia.id}`}
        state={{ noticia }}
        className="novedad-hero-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        {imgPrincipal ? (
          <img
            src={imgPrincipal}
            alt={noticia.titulo}
            className="novedad-hero-img"
            loading="lazy"
          />
        ) : (
          <div className="novedad-placeholder-img">
            <IconoPlaceholder />
          </div>
        )}
      </Link>

      <div className="novedad-hero-body">
        <div>
          {fechaPrincipal && (
            <time className="novedad-meta-fecha">
              {fechaPrincipal}
            </time>
          )}

          <h3 className="novedad-hero-title">
            <Link
              to={`/noticias/${noticia.id}`}
              state={{ noticia }}
              className="novedad-titulo-link"
            >
              {noticia.titulo}
            </Link>
          </h3>

          {(noticia.descripcion || noticia.resumen) && (
            <p className="novedad-hero-excerpt">
              {noticia.descripcion || noticia.resumen}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

