import React from 'react';
import { EditorialHeader } from './EditorialHeader.jsx';

export const EditorialSkeleton = ({ SectionHeading = 'h2' }) => {
  return (
    <section id="noticias" className="novedades-editorial-section container" aria-labelledby="noticias-titulo">
      <EditorialHeader SectionHeading={SectionHeading} />
      <div className="novedades-editorial-grid" aria-label="Cargando novedades...">
        <div className="novedad-hero-card skeleton-box" style={{ minHeight: '380px' }} />
        <div className="novedades-secundarias-stack">
          <div className="novedad-secundaria-card skeleton-box" style={{ minHeight: '175px' }} />
          <div className="novedad-secundaria-card skeleton-box" style={{ minHeight: '175px' }} />
        </div>
      </div>
    </section>
  );
};

