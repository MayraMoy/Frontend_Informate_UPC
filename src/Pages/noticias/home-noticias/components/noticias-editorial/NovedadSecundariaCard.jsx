import React from 'react';
import { Link } from 'react-router-dom';
import { IconoPlaceholder } from './IconoPlaceholder.jsx';

export const NovedadSecundariaCard = ({ noticia, onClick }) => {
  if (!noticia) return null;

  const imgSecundaria = noticia?.imagenes?.find((img) => img?.url)?.url;
  const fechaSecundaria = noticia?.fechaPublicacion
    ? new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <article
      className="novedad-secundaria-card"
      onClick={onClick}
      role="article"
      aria-label={noticia.titulo}
    >
      <Link
        to={`/noticias/${noticia.id}`}
        state={{ noticia }}
        className="novedad-secundaria-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        {imgSecundaria ? (
          <img
            src={imgSecundaria}
            alt={noticia.titulo}
            className="novedad-secundaria-img"
            loading="lazy"
          />
        ) : (
          <div className="novedad-placeholder-img">
            <IconoPlaceholder />
          </div>
        )}
      </Link>

      <div className="novedad-secundaria-body">
        <div>
          {fechaSecundaria && (
            <time className="novedad-meta-fecha">
              {fechaSecundaria}
            </time>
          )}

          <h4 className="novedad-secundaria-title">
            <Link
              to={`/noticias/${noticia.id}`}
              state={{ noticia }}
              className="novedad-titulo-link"
            >
              {noticia.titulo}
            </Link>
          </h4>

          {(noticia.descripcion || noticia.resumen) && (
            <p className="novedad-secundaria-excerpt">
              {noticia.descripcion || noticia.resumen}
            </p>
          )}
        </div>

        <Link
          to={`/noticias/${noticia.id}`}
          state={{ noticia }}
          className="novedad-secundaria-cta"
        >
          <span>Leer más</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

