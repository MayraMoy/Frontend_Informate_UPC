import React from 'react';
import NovedadCard from '../NovedadCard.jsx';
import { NovedadCardSkeleton } from '../novedad-card/NovedadCardSkeleton.jsx';

export const NoticiasListadoGrid = ({
  loading,
  noticias,
  CardHeading,
  categorias,
}) => {
  if (loading) {
    return (
      <div className="ver-noticias-grid" role="status" aria-label="Cargando noticias...">
        {Array.from({ length: 6 }).map((_, index) => (
          <NovedadCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (noticias.length > 0) {
    return (
      <div className="ver-noticias-grid" aria-live="polite" aria-atomic="true">
        {noticias.map((noticia) => (
          <NovedadCard
            key={noticia.id}
            noticia={noticia}
            headingLevel={CardHeading}
            categorias={categorias}
            /* Sin onEditar: los estudiantes nunca verán botones de edición */
          />
        ))}
      </div>
    );
  }

  return (
    <div className="ver-noticias-estado-vacio" role="status">
      <p>No se encontraron noticias con los filtros seleccionados.</p>
    </div>
  );
};

