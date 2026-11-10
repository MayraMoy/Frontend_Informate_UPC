import React from 'react';
import { IconoDocumento, IconoAlerta } from './IconosResolucion';

export const CamposPrincipalesResolucion = ({
  numeroResolucion,
  setNumeroResolucion,
  titulo,
  setTitulo,
  descripcion,
  setDescripcion,
  observaciones,
  setObservaciones,
  errores = {},
  guardando = false,
}) => {
  return (
    <div className="crear-resolucion__card-panel">
      <div className="crear-resolucion__seccion-encabezado">
        <IconoDocumento className="crear-resolucion__seccion-icono" />
        <div>
          <h2 className="crear-resolucion__seccion-titulo">Contenido Oficial de la Resolución</h2>
          <p className="crear-resolucion__seccion-bajada">
            Completá los datos reglamentarios de la disposición académica según la normativa institucional.
          </p>
        </div>
      </div>

      {/* Número de Resolución */}
      <div className="crear-resolucion__campo">
        <div className="crear-resolucion__label-wrapper">
          <label htmlFor="numeroResolucion" className="crear-resolucion__label">
            Número de Resolución <span className="crear-resolucion__requerido">*</span>
          </label>
          <span className="crear-resolucion__ayuda">Identificador administrativo único</span>
        </div>
        <input
          id="numeroResolucion"
          type="text"
          className={`crear-resolucion__input ${errores.numeroResolucion ? 'crear-resolucion__input--error' : ''}`}
          placeholder="Ej: Res. Rectoral 0542/2026 o Res. Decanal 0118/2026"
          value={numeroResolucion}
          onChange={(e) => setNumeroResolucion(e.target.value)}
          disabled={guardando}
          maxLength={100}
        />
        {errores.numeroResolucion && (
          <p className="crear-resolucion__error-mensaje" role="alert">
            <IconoAlerta />
            <span>{errores.numeroResolucion}</span>
          </p>
        )}
      </div>

      {/* Título Oficial */}
      <div className="crear-resolucion__campo">
        <div className="crear-resolucion__label-wrapper">
          <label htmlFor="tituloResolucion" className="crear-resolucion__label">
            Título Oficial de la Resolución <span className="crear-resolucion__requerido">*</span>
          </label>
          <span className="crear-resolucion__contador">
            {titulo.length}/255 caracteres
          </span>
        </div>
        <input
          id="tituloResolucion"
          type="text"
          className={`crear-resolucion__input ${errores.titulo ? 'crear-resolucion__input--error' : ''}`}
          placeholder="Ej: Calendario Académico Período Lectivo 2026 - Modalidad Presencial y Distancia"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={guardando}
          maxLength={255}
        />
        {errores.titulo && (
          <p className="crear-resolucion__error-mensaje" role="alert">
            <IconoAlerta />
            <span>{errores.titulo}</span>
          </p>
        )}
      </div>

      {/* Cuerpo y Considerandos de la Resolución */}
      <div className="crear-resolucion__campo">
        <div className="crear-resolucion__label-wrapper">
          <label htmlFor="descripcionResolucion" className="crear-resolucion__label">
            Cuerpo, Considerandos y Resuelve
          </label>
          <span className="crear-resolucion__ayuda">Texto completo o resumen oficial</span>
        </div>
        <textarea
          id="descripcionResolucion"
          className="crear-resolucion__textarea"
          rows="9"
          placeholder="VISTO la normativa vigente y el expediente académico N°...&#10;&#10;CONSIDERANDO:&#10;Que resulta necesario establecer las pautas lectivas...&#10;&#10;EL CONSEJO ACADÉMICO RESUELVE:&#10;ARTÍCULO 1°.- Aprobar las fechas estipuladas en el anexo adjunto..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={guardando}
        />
      </div>

      {/* Observaciones y Notas de Aprobación */}
      <div className="crear-resolucion__campo">
        <div className="crear-resolucion__label-wrapper">
          <label htmlFor="observacionesResolucion" className="crear-resolucion__label">
            Observaciones y Notas Internas
          </label>
          <span className="crear-resolucion__ayuda">Visible para el cuerpo administrativo</span>
        </div>
        <textarea
          id="observacionesResolucion"
          className="crear-resolucion__textarea crear-resolucion__textarea--compacto"
          rows="3"
          placeholder="Ingresá notas internas, número de expediente, dependencia de origen o instrucciones especiales..."
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          disabled={guardando}
        />
      </div>
    </div>
  );
};

export default CamposPrincipalesResolucion;
