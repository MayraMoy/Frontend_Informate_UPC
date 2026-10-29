import React from 'react';
import { IconoEditar, IconoOjo } from '../IconosNoticia';

export const EncabezadoFormularioNoticia = ({
  pestanaActiva,
  setPestanaActiva,
  tieneContenido = false,
}) => {
  return (
    <header className="crear-noticia__encabezado-principal">
      <div className="crear-noticia__titulo-bloque">
        <h1 className="crear-noticia__titulo">Crear noticia</h1>
        <p className="crear-noticia__subtitulo">
          Redactá, adjuntá imágenes y publicá novedades institucionales en el portal
        </p>
      </div>

      {/* Pestañas Editor / Vista previa integradas */}
      <div className="crear-noticia__pestanas" role="tablist" aria-label="Modo de trabajo">
        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'editor'}
          className={`crear-noticia__pestana-btn ${
            pestanaActiva === 'editor' ? 'crear-noticia__pestana-btn--activa' : ''
          }`}
          onClick={() => setPestanaActiva('editor')}
        >
          <IconoEditar />
          <span>Redactar</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'preview'}
          className={`crear-noticia__pestana-btn ${
            pestanaActiva === 'preview' ? 'crear-noticia__pestana-btn--activa' : ''
          }`}
          onClick={() => setPestanaActiva('preview')}
        >
          <IconoOjo />
          <span>Vista previa</span>
          {tieneContenido && (
            <span
              className="crear-noticia__pestana-punto-activo"
              title="Contenido disponible"
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default EncabezadoFormularioNoticia;

