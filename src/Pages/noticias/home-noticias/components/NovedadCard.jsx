import React, { useContext } from 'react';
import AppContext from '../../../../Context/AppContext.js';
import { useNoticiaCard } from '../hooks/useNoticiaCard.js';
import {
  NovedadCardMedia,
  NovedadCardMeta,
  NovedadCardTitulo,
  NovedadCardAcciones,
} from './novedad-card';

const NovedadCard = ({
  noticia,
  headingLevel = 'h2',
  onEditar,
  categorias = [],
  mostrarCategoria: mostrarCategoriaProp,
}) => {
  const { user } = useContext(AppContext);
  const mostrarCategoria =
    typeof mostrarCategoriaProp === 'boolean'
      ? mostrarCategoriaProp
      : false;

  const { formatearFecha, getBadgeClass, resolverCategoria } = useNoticiaCard(noticia);
  const imagen = noticia.imagenes?.find((item) => item?.url);
  const nombreCategoria = mostrarCategoria ? resolverCategoria(categorias) : '';

  const fechaValor =
    noticia.fechaPublicacion ||
    noticia.fechaCreacion ||
    noticia.fechaActualizacion ||
    noticia.fecha ||
    noticia.createdAt;

  return (
    <article className="novedad-card">
      <NovedadCardMedia noticia={noticia} imagen={imagen} />

      <div className="novedad-card-content">
        <NovedadCardMeta
          nombreCategoria={nombreCategoria}
          badgeClass={getBadgeClass(nombreCategoria)}
          fechaPublicacion={fechaValor}
          fechaFormateada={formatearFecha(fechaValor)}
        />

        <NovedadCardTitulo headingLevel={headingLevel} noticia={noticia} />

        <NovedadCardAcciones noticia={noticia} onEditar={onEditar} />
      </div>
    </article>
  );
};

export default NovedadCard;
