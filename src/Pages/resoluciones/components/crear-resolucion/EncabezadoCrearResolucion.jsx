import React from 'react';
import { IconoEditar, IconoOjo } from './IconosResolucion';

export const EncabezadoCrearResolucion = ({
  pestanaActiva,
  setPestanaActiva,
  tieneContenido = false,
}) => {
  return (
    <header className="crear-resolucion__encabezado-principal">
      <div className="crear-resolucion__titulo-bloque">
        <h1 className="crear-resolucion__titulo">Crear Resolución Académica</h1>
        <p className="crear-resolucion__subtitulo">
          Redactá, registrá y disponé normativas oficiales institucionales en el repositorio de la UPC
        </p>
      </div>

      {/* Pestañas Redactar / Vista previa integradas */}
      <div className="crear-resolucion__pestanas" role="tablist" aria-label="Modo de trabajo">
        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'editor'}
          className={`crear-resolucion__pestana-btn ${
            pestanaActiva === 'editor' ? 'crear-resolucion__pestana-btn--activa' : ''
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
          className={`crear-resolucion__pestana-btn ${
            pestanaActiva === 'preview' ? 'crear-resolucion__pestana-btn--activa' : ''
          }`}
          onClick={() => setPestanaActiva('preview')}
        >
          <IconoOjo />
          <span>Vista previa</span>
          {tieneContenido && (
            <span
              className="crear-resolucion__pestana-punto-activo"
              title="Contenido disponible para previsualizar"
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default EncabezadoCrearResolucion;
