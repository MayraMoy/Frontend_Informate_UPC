import React from 'react';
import {
  IconoCheck,
  IconoReloj,
  IconoOjo,
  IconoLimpiar,
  IconoVolver,
  IconoPdf,
  IconoSubir,
  IconoAlerta,
  IconoEtiqueta,
} from './IconosResolucion';

export const SidebarPublicacionResolucion = ({
  idCategoria,
  setIdCategoria,
  categorias = [],
  cargandoCategorias = false,
  errorCategoria = '',
  archivoPdf,
  setArchivoPdf,
  etiquetasSeleccionadas = [],
  setEtiquetasSeleccionadas,
  nuevaEtiqueta,
  setNuevaEtiqueta,
  guardando = false,
  errorGeneral = '',
  onSubmit,
  onVerPreview,
  onLimpiar,
  onCancelar,
}) => {
  const agregarEtiqueta = (e) => {
    e?.preventDefault?.();
    const tag = nuevaEtiqueta.trim().toUpperCase().replace(/^#+/, '');
    if (tag && !etiquetasSeleccionadas.includes(tag)) {
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, tag]);
      setNuevaEtiqueta('');
    }
  };

  const eliminarEtiqueta = (tagEliminar) => {
    setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter((t) => t !== tagEliminar));
  };

  const formatearTamanoArchivo = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  return (
    <aside className="crear-resolucion__columna-lateral">
      {/* 1. Tarjeta de Categoría Institucional */}
      <div className="crear-resolucion__card-sidebar">
        <h3 className="crear-resolucion__card-sidebar-titulo-peq">
          Categoría Institucional <span className="crear-resolucion__requerido">*</span>
        </h3>
        <p className="crear-resolucion__sidebar-descripcion">
          Asigna el ámbito reglamentario correspondiente a esta disposición.
        </p>

        <select
          className={`crear-resolucion__select ${errorCategoria ? 'crear-resolucion__input--error' : ''}`}
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          disabled={guardando || cargandoCategorias}
        >
          <option value="">Seleccioná una categoría...</option>
          {categorias.map((cat) => {
            const idCat = cat.idCategoria ?? cat.id;
            const nombreCat = cat.nombre ?? cat.nombreCategoria ?? `Categoría ${idCat}`;
            return (
              <option key={idCat} value={idCat}>
                {nombreCat}
              </option>
            );
          })}
        </select>

        {errorCategoria && (
          <p className="crear-resolucion__error-mensaje" role="alert">
            <IconoAlerta />
            <span>{errorCategoria}</span>
          </p>
        )}
      </div>

      {/* 2. Tarjeta de Documento PDF Oficial */}
      <div className="crear-resolucion__card-sidebar">
        <h3 className="crear-resolucion__card-sidebar-titulo-peq">
          Documento PDF Oficial
        </h3>
        <p className="crear-resolucion__sidebar-descripcion">
          Adjuntá el archivo digitalizado con firmas y sellos oficiales.
        </p>

        {!archivoPdf ? (
          <label className="crear-resolucion__dropzone">
            <IconoPdf className="crear-resolucion__dropzone-icono" />
            <span className="crear-resolucion__dropzone-texto">
              Hacé clic para seleccionar el PDF
            </span>
            <span className="crear-resolucion__dropzone-hint">
              Formatos admitidos: .pdf (máx. 10MB)
            </span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="crear-resolucion__input-file-oculto"
              onChange={(e) => {
                const archivo = e.target.files?.[0] || null;
                setArchivoPdf(archivo);
              }}
              disabled={guardando}
            />
          </label>
        ) : (
          <div className="crear-resolucion__archivo-preview">
            <div className="crear-resolucion__archivo-icono-box">
              <IconoPdf />
            </div>
            <div className="crear-resolucion__archivo-info">
              <span className="crear-resolucion__archivo-nombre" title={archivoPdf.name}>
                {archivoPdf.name}
              </span>
              <span className="crear-resolucion__archivo-tamano">
                {formatearTamanoArchivo(archivoPdf.size)}
              </span>
            </div>
            <button
              type="button"
              className="crear-resolucion__archivo-quitar"
              onClick={() => setArchivoPdf(null)}
              disabled={guardando}
              title="Quitar archivo adjunto"
              aria-label="Quitar archivo"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* 3. Tarjeta de Etiquetas (Tags) */}
      <div className="crear-resolucion__card-sidebar">
        <div className="crear-resolucion__sidebar-header-inline">
          <IconoEtiqueta className="crear-resolucion__sidebar-icono-inline" />
          <h3 className="crear-resolucion__card-sidebar-titulo-peq">
            Etiquetas y Palabras Clave
          </h3>
        </div>
        <p className="crear-resolucion__sidebar-descripcion">
          Facilitan la búsqueda de la resolución en el catálogo digital.
        </p>

        <div className="crear-resolucion__tags-input-group">
          <input
            type="text"
            className="crear-resolucion__input crear-resolucion__input--tag"
            placeholder="Ej: CALENDARIO, RECTORADO"
            value={nuevaEtiqueta}
            onChange={(e) => setNuevaEtiqueta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarEtiqueta(e)}
            disabled={guardando}
          />
          <button
            type="button"
            className="crear-resolucion__btn-agregar-tag"
            onClick={agregarEtiqueta}
            disabled={guardando || !nuevaEtiqueta.trim()}
          >
            + Agregar
          </button>
        </div>

        <div className="crear-resolucion__tags-wrapper">
          {etiquetasSeleccionadas.length === 0 ? (
            <span className="crear-resolucion__tags-vacio">No hay etiquetas agregadas</span>
          ) : (
            etiquetasSeleccionadas.map((tag) => (
              <span key={tag} className="crear-resolucion__tag-chip">
                <span>#{tag}</span>
                <button
                  type="button"
                  className="crear-resolucion__tag-remove"
                  onClick={() => eliminarEtiqueta(tag)}
                  title={`Eliminar etiqueta ${tag}`}
                  aria-label={`Eliminar etiqueta ${tag}`}
                  disabled={guardando}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* 4. Tarjeta de Publicación y Acciones (Ubicada abajo de todo) */}
      <div className="crear-resolucion__card-sidebar crear-resolucion__card-sidebar--publicacion">
        <div className="crear-resolucion__card-sidebar-encabezado">
          <h2 className="crear-resolucion__card-sidebar-titulo">Publicación</h2>
          <span className="crear-resolucion__estado-badge crear-resolucion__estado-badge--vigente">
            Oficial
          </span>
        </div>

        {errorGeneral && (
          <div className="crear-resolucion__alerta-error" role="alert">
            <IconoAlerta />
            <span>{errorGeneral}</span>
          </div>
        )}

        <div className="crear-resolucion__acciones-panel">
          {/* Botón Principal: Publicar y Aprobar */}
          <button
            type="button"
            className="crear-resolucion__boton-principal crear-resolucion__boton-publicar"
            onClick={() => onSubmit('VIGENTE')}
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

          {/* Botón Outline: Solicitar Aprobación / Guardar Pendiente */}
          <button
            type="button"
            className="crear-resolucion__boton-outline"
            onClick={() => onSubmit('PENDIENTE')}
            disabled={guardando}
            title="Guardar como borrador para revisión posterior"
          >
            <IconoReloj />
            <span>Guardar como Pendiente</span>
          </button>

          <div className="crear-resolucion__acciones-secundarias">
            {onVerPreview && (
              <button
                type="button"
                className="crear-resolucion__boton-secundario"
                onClick={onVerPreview}
                disabled={guardando}
                title="Previsualizar formato oficial"
              >
                <IconoOjo />
                <span>Vista previa</span>
              </button>
            )}

            <button
              type="button"
              className="crear-resolucion__boton-secundario"
              onClick={onLimpiar}
              disabled={guardando}
              title="Borrar todos los campos ingresados"
            >
              <IconoLimpiar />
              <span>Limpiar</span>
            </button>
          </div>

          <button
            type="button"
            className="crear-resolucion__boton-cancelar"
            onClick={onCancelar}
            disabled={guardando}
          >
            <IconoVolver />
            <span>Cancelar y volver al listado</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarPublicacionResolucion;
