import React from 'react';
import { IconoOjo, IconoReloj } from '../IconosNoticia';

const getBadgeClass = (nombreCat = '') => {
  const normal = (nombreCat || '').toLowerCase();
  if (normal.includes('acad')) return 'badge-academica';
  if (normal.includes('invest')) return 'badge-investigacion';
  if (normal.includes('bien')) return 'badge-bienestar';
  return 'badge-default';
};

export const VistaPreviaHeader = ({
  categoria,
  lectura,
  titulo,
  tieneTitulo,
  nombreAutor,
  fechaHoy,
}) => {
  return (
    <>
      {/* Banner de previsualización */}
      <div className="crear-noticia__preview-aviso">
        <span className="crear-noticia__preview-aviso-texto">
          <IconoOjo />
          <span>Vista previa</span>
        </span>
        <small>Visualización de la noticia antes de publicar</small>
      </div>

      <header className="crear-noticia__preview-header">
        <div className="crear-noticia__preview-metadatos-top">
          <span className={`crear-noticia__preview-categoria ${getBadgeClass(categoria?.nombre)}`}>
            {categoria ? categoria.nombre : 'Sin categoría'}
          </span>
          <span className="crear-noticia__preview-lectura">
            <IconoReloj />
            <span>{lectura}</span>
          </span>
        </div>

        <h1 className="crear-noticia__preview-titulo">
          {tieneTitulo ? titulo : 'Título de la noticia'}
        </h1>

        <div className="crear-noticia__preview-autor-fila">
          <div className="crear-noticia__preview-avatar">
            {nombreAutor.charAt(0).toUpperCase()}
          </div>
          <div className="crear-noticia__preview-autor-info">
            <span className="crear-noticia__preview-autor-nombre">{nombreAutor}</span>
            <span className="crear-noticia__preview-fecha">{fechaHoy}</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default VistaPreviaHeader;

