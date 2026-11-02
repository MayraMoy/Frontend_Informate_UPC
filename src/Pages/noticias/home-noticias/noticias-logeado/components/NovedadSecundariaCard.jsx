import React from 'react';
import { Link } from 'react-router-dom';
import { IconoPlaceholder } from './IconoPlaceholder.jsx';
import { useNoticiaCard } from '../../hooks/useNoticiaCard.js';

export const NovedadSecundariaCard = ({ noticia, onClick }) => {
  if (!noticia) return null;

  const { formatearFecha } = useNoticiaCard(noticia);
  const imgSecundaria = noticia?.imagenes?.find((img) => img?.url)?.url;
  const fechaValor =
    noticia?.fechaPublicacion ||
    noticia?.fechaCreacion ||
    noticia?.fechaActualizacion ||
    noticia?.fecha ||
    noticia?.createdAt;
  const fechaSecundaria = formatearFecha(fechaValor);

  const extracto =
    noticia?.resumen ||
    noticia?.descripcion ||
    (typeof noticia?.cuerpo === 'string' && noticia.cuerpo.trim()
      ? noticia.cuerpo.replace(/<[^>]+>/g, '').slice(0, 90).trim() + '...'
      : '');

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
        <div className="novedad-secundaria-top">
          <div className="novedad-meta-bar">
            {fechaSecundaria && (
              <time className="novedad-meta-fecha">
                {fechaSecundaria}
              </time>
            )}
          </div>

          <h4 className="novedad-secundaria-title">
            <Link
              to={`/noticias/${noticia.id}`}
              state={{ noticia }}
              className="novedad-titulo-link"
            >
              {noticia.titulo}
            </Link>
          </h4>

          {extracto && (
            <p className="novedad-secundaria-excerpt">
              {extracto}
            </p>
          )}
        </div>

        <div className="novedad-secundaria-footer">
          <Link
            to={`/noticias/${noticia.id}`}
            state={{ noticia }}
            className="novedad-secundaria-cta"
          >
            <span>Leer más</span>
            <span aria-hidden="true" className="novedad-cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};


