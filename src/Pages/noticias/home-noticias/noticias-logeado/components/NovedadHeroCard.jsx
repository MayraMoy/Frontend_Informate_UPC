import React from 'react';
import { Link } from 'react-router-dom';
import { IconoPlaceholder } from './IconoPlaceholder.jsx';
import { useNoticiaCard } from '../../hooks/useNoticiaCard.js';

export const NovedadHeroCard = ({ noticia, onClick }) => {
  if (!noticia) return null;

  const { formatearFecha } = useNoticiaCard(noticia);
  const imgPrincipal = noticia?.imagenes?.find((img) => img?.url)?.url;
  const fechaPrincipal = formatearFecha(noticia?.fechaPublicacion);

  // Extracto para equilibrar el espacio negativo y jerarquía visual
  const extracto =
    noticia?.resumen ||
    noticia?.descripcion ||
    (typeof noticia?.cuerpo === 'string' && noticia.cuerpo.trim()
      ? noticia.cuerpo.replace(/<[^>]+>/g, '').slice(0, 120).trim() + '...'
      : '');

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
        <div className="novedad-hero-top-content">
          <div className="novedad-meta-bar">
            {fechaPrincipal && (
              <time className="novedad-meta-fecha">
                {fechaPrincipal}
              </time>
            )}
          </div>

          <h3 className="novedad-hero-title">
            <Link
              to={`/noticias/${noticia.id}`}
              state={{ noticia }}
              className="novedad-titulo-link"
            >
              {noticia.titulo}
            </Link>
          </h3>

          {extracto && (
            <p className="novedad-hero-excerpt">
              {extracto}
            </p>
          )}
        </div>

        <div className="novedad-hero-footer">
          <Link
            to={`/noticias/${noticia.id}`}
            state={{ noticia }}
            className="novedad-hero-cta"
          >
            <span>Leer noticia completa</span>
            <span aria-hidden="true" className="novedad-cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};


