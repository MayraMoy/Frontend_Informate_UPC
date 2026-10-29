import React from 'react';
import { IconoEditar, IconoOjo } from '../../crear-noticia/components/IconosNoticia';

export const EncabezadoEditarNoticia = ({ id, pestanaActiva, onCambiarPestana }) => {
  return (
    <header className="crear-noticia__encabezado-principal">
      <div className="crear-noticia__titulo-bloque">
        <div className="d-flex align-items-center">
          <h1 className="crear-noticia__titulo">Editar noticia</h1>
          <span className="editar-noticia__id-badge">ID #{id}</span>
        </div>
        <p className="crear-noticia__subtitulo">
          Modificá el contenido, gestioná imágenes y actualizá el estado de la noticia institucional.
        </p>
      </div>

      {/* Pestañas Editar / Vista previa */}
      <div className="crear-noticia__pestanas" role="tablist" aria-label="Modo de trabajo">
        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'editor'}
          className={`crear-noticia__pestana-btn ${
            pestanaActiva === 'editor' ? 'crear-noticia__pestana-btn--activa' : ''
          }`}
          onClick={() => onCambiarPestana('editor')}
        >
          <IconoEditar />
          <span>Editar</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'preview'}
          className={`crear-noticia__pestana-btn ${
            pestanaActiva === 'preview' ? 'crear-noticia__pestana-btn--activa' : ''
          }`}
          onClick={() => onCambiarPestana('preview')}
        >
          <IconoOjo />
          <span>Vista previa</span>
        </button>
      </div>
    </header>
  );
};

