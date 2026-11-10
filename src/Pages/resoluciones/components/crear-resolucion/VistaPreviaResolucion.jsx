import React from 'react';
import {
  IconoEditar,
  IconoCheck,
  IconoReloj,
  IconoPdf,
  IconoDocumento,
  IconoEtiqueta,
} from './IconosResolucion';

export const VistaPreviaResolucion = ({
  numeroResolucion = '',
  titulo = '',
  descripcion = '',
  idCategoria = '',
  categorias = [],
  observaciones = '',
  etiquetas = [],
  archivoPdf = null,
  usuario = null,
  onVolverEditor,
  onPublicar,
  guardando = false,
}) => {
  const categoriaSeleccionada = categorias.find(
    (c) => String(c.idCategoria ?? c.id) === String(idCategoria)
  );
  const nombreCategoria = categoriaSeleccionada?.nombre || categoriaSeleccionada?.nombreCategoria || 'Categoría no asignada';

  const tieneContenido =
    Boolean(numeroResolucion.trim()) ||
    Boolean(titulo.trim()) ||
    Boolean(descripcion.trim());

  const fechaHoy = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const autorNombre = usuario?.nombre
    ? `${usuario.nombre} ${usuario.apellido || ''}`.trim()
    : 'Autoridad Institucional';

  if (!tieneContenido) {
    return (
      <div className="crear-resolucion__preview-vacia">
        <div className="crear-resolucion__preview-vacia-icono">
          <IconoDocumento />
        </div>
        <h3 className="crear-resolucion__preview-vacia-titulo">
          Aún no hay contenido para previsualizar
        </h3>
        <p className="crear-resolucion__preview-vacia-texto">
          Ingresá al menos el número de resolución y el título oficial en la pestaña Redactar para ver la maqueta formal.
        </p>
        <button
          type="button"
          className="crear-resolucion__boton-secundario"
          onClick={onVolverEditor}
        >
          <IconoEditar />
          <span>Volver a Redactar</span>
        </button>
      </div>
    );
  }

  return (
    <div className="crear-resolucion__preview-seccion">
      {/* Documento Oficial */}
      <article className="crear-resolucion__preview-documento">
        {/* Membrete Institucional UPC */}
        <header className="crear-resolucion__preview-membrete">
          <div className="crear-resolucion__preview-membrete-texto">
            <span className="crear-resolucion__preview-institucion">
              UNIVERSIDAD PROVINCIAL DE CÓRDOBA
            </span>
            <span className="crear-resolucion__preview-sede">
              Sede Regional Dr. Bernardo Houssay • Repositorio Oficial de Resoluciones
            </span>
          </div>
          <div className="crear-resolucion__preview-membrete-linea" />
        </header>

        {/* Encabezado y Badges */}
        <div className="crear-resolucion__preview-header-meta">
          <div className="crear-resolucion__preview-badges">
            <span className="crear-resolucion__preview-badge-numero">
              {numeroResolucion || 'Sin número asignado'}
            </span>
            <span className="crear-resolucion__preview-badge-categoria">
              {nombreCategoria}
            </span>
            <span className="crear-resolucion__preview-badge-estado">
              VIGENTE (OFICIAL)
            </span>
          </div>
          <div className="crear-resolucion__preview-fecha">
            Fecha de emisión: {fechaHoy}
          </div>
        </div>

        {/* Título Oficial */}
        <h1 className="crear-resolucion__preview-titulo">
          {titulo || 'Título de la Resolución pendiente de redacción'}
        </h1>

        {/* Cuerpo Oficial de la Disposición */}
        <div className="crear-resolucion__preview-cuerpo">
          {descripcion.trim() ? (
            descripcion.split('\n').map((parrafo, idx) => {
              const limpio = parrafo.trim();
              if (!limpio) return null;
              const esConsiderando = /^CONSIDERANDO|^VISTO|^EL\s+CONSEJO|^RESUELVE|^ART[IÍ]CULO/i.test(limpio);
              return (
                <p
                  key={idx}
                  className={`crear-resolucion__preview-parrafo ${
                    esConsiderando ? 'crear-resolucion__preview-parrafo--destacado' : ''
                  }`}
                >
                  {limpio}
                </p>
              );
            })
          ) : (
            <p className="crear-resolucion__preview-parrafo-vacio">
              (No se ingresó cuerpo de considerandos o artículos para esta resolución).
            </p>
          )}
        </div>

        {/* Documento PDF Adjunto */}
        {archivoPdf && (
          <div className="crear-resolucion__preview-adjunto">
            <div className="crear-resolucion__preview-adjunto-icono">
              <IconoPdf />
            </div>
            <div className="crear-resolucion__preview-adjunto-info">
              <span className="crear-resolucion__preview-adjunto-titulo">
                Documento Oficial Digitalizado
              </span>
              <span className="crear-resolucion__preview-adjunto-nombre">
                {archivoPdf.name} ({(archivoPdf.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <span className="crear-resolucion__preview-adjunto-badge">
              PDF Certificado
            </span>
          </div>
        )}

        {/* Observaciones Internas */}
        {observaciones.trim() && (
          <div className="crear-resolucion__preview-observaciones">
            <h4 className="crear-resolucion__preview-observaciones-titulo">
              Observaciones del Registro
            </h4>
            <p className="crear-resolucion__preview-observaciones-texto">
              {observaciones}
            </p>
          </div>
        )}

        {/* Etiquetas */}
        {etiquetas.length > 0 && (
          <div className="crear-resolucion__preview-etiquetas">
            <IconoEtiqueta className="crear-resolucion__preview-etiquetas-icono" />
            <div className="crear-resolucion__preview-etiquetas-lista">
              {etiquetas.map((tag) => (
                <span key={tag} className="crear-resolucion__preview-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pie de Metadatos */}
        <footer className="crear-resolucion__preview-pie">
          <div className="crear-resolucion__preview-pie-autor">
            <strong>Registrado por:</strong> {autorNombre}
          </div>
          <div className="crear-resolucion__preview-pie-validez">
            Documento de Validez Académica Oficial • Versión 1.0
          </div>
        </footer>
      </article>

      {/* Barra de Acciones al Pie de la Vista Previa */}
      <div className="crear-resolucion__preview-acciones-pie">
        <button
          type="button"
          className="crear-resolucion__boton-secundario"
          onClick={onVolverEditor}
          disabled={guardando}
        >
          <IconoEditar />
          <span>Volver a redactar</span>
        </button>

        <div className="crear-resolucion__preview-grupo-botones">
          <button
            type="button"
            className="crear-resolucion__boton-outline"
            onClick={() => onPublicar('PENDIENTE')}
            disabled={guardando}
          >
            <IconoReloj />
            <span>Guardar como Pendiente</span>
          </button>

          <button
            type="button"
            className="crear-resolucion__boton-principal"
            onClick={() => onPublicar('VIGENTE')}
            disabled={guardando}
          >
            {guardando ? (
              <>
                <span className="crear-resolucion__mini-spinner" aria-hidden="true" />
                <span>Publicando...</span>
              </>
            ) : (
              <>
                <IconoCheck />
                <span>Aprobar y Publicar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaPreviaResolucion;
