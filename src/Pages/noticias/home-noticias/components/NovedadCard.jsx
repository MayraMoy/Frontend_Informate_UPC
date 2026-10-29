import React from 'react';
import { useNoticiaCard } from '../hooks/useNoticiaCard.js';
import {
  NovedadCardMedia,
  NovedadCardMeta,
  NovedadCardTitulo,
  NovedadCardAcciones,
} from './novedad-card';

const NovedadCard = ({ noticia, headingLevel = 'h2', onEditar, categorias = [] }) => {
  const { formatearFecha, getBadgeClass, resolverCategoria } = useNoticiaCard(noticia);
  const imagen = noticia.imagenes?.find((item) => item?.url);
  const nombreCategoria = resolverCategoria(categorias);

  return (
    <article className="novedad-card">
      <NovedadCardMedia noticia={noticia} imagen={imagen} />

      <div className="novedad-card-content">
        <NovedadCardMeta
          nombreCategoria={nombreCategoria}
          badgeClass={getBadgeClass(nombreCategoria)}
          fechaPublicacion={noticia.fechaPublicacion}
          fechaFormateada={formatearFecha(noticia.fechaPublicacion)}
        />

        <NovedadCardTitulo headingLevel={headingLevel} noticia={noticia} />

        <NovedadCardAcciones noticia={noticia} onEditar={onEditar} />
      </div>
    </article>
  );
};

export default NovedadCard;
