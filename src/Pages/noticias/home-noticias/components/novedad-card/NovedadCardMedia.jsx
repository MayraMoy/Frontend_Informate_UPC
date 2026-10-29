import { useState } from 'react';
import { Link } from 'react-router-dom';

const IconoImagen = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="7" y="9" width="34" height="30" rx="4" />
    <circle cx="18" cy="19" r="3" />
    <path d="m9 34 10-10 7 7 5-5 8 8" />
  </svg>
);

export const NovedadCardMedia = ({ noticia, imagen }) => {
  const [imagenFallida, setImagenFallida] = useState(false);

  return (
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
          <div className="novedad-card-image-placeholder">
            <IconoImagen />
          </div>
        )}
      </Link>
    </div>
  );
};

export default NovedadCardMedia;

