import React from 'react';
import { Link } from 'react-router-dom';

export const EditorialHeader = ({ SectionHeading = 'h2' }) => {
  return (
    <header className="novedades-editorial-header">
      <SectionHeading id="noticias-titulo">Novedades</SectionHeading>
      <Link className="novedades-editorial-all-link" to="/noticias">
        Ver todas las noticias <span aria-hidden="true">→</span>
      </Link>
    </header>
  );
};

