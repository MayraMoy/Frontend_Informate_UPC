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

const NovedadCard = ({ noticia, headingLevel }) => {
  const { formatearFecha } = useNoticiaCard(noticia);
  const [imagenFallida, setImagenFallida] = useState(false);
  const imagen = noticia.imagenes?.find((item) => item?.url);
  const Heading = headingLevel;

  return (
    <article className="novedad-card">
      <div className="novedad-card-media">
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
      </div>

      <div className="novedad-card-content">
        <time className="novedad-card-date" dateTime={noticia.fechaPublicacion || undefined}>
          {formatearFecha(noticia.fechaPublicacion)}
        </time>
        <Heading className="novedad-card-title">
          <Link to={`/noticias/${noticia.id}`}>{noticia.titulo}</Link>
        </Heading>
      </div>
    </article>
  );
};

export default NovedadCard;
