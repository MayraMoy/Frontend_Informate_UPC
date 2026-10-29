import React from 'react';
import { Link } from 'react-router-dom';

export const NovedadCardTitulo = ({ headingLevel: Heading = 'h2', noticia }) => {
  return (
    <Heading className="novedad-card-title">
      <Link to={`/noticias/${noticia.id}`} state={{ noticia }}>
        {noticia.titulo}
      </Link>
    </Heading>
  );
};

export default NovedadCardTitulo;

