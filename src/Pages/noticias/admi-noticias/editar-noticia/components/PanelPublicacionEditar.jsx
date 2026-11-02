import React from 'react';
import { SeccionEstadoNoticia } from './SeccionEstadoNoticia';
import { SeccionRegistroFechas } from './SeccionRegistroFechas';

export const PanelPublicacionEditar = ({
  estado,
  onChangeEstado,
  esAdmin,
  user,
  noticia,
  guardando,
  onSubmit,
  onVerPreview,
  onCancelar,
}) => {
  return (
    <div className="crear-noticia__card-sidebar crear-noticia__card-sidebar--publicacion">
      <div className="crear-noticia__card-sidebar-encabezado">
        <h2 className="crear-noticia__card-sidebar-titulo">Publicación</h2>
      </div>

      {/* Selector de Estado según ROL */}
      <SeccionEstadoNoticia estado={estado} onChangeEstado={onChangeEstado} esAdmin={esAdmin} />

      {/* Historial de Fechas y Trazabilidad */}
      <SeccionRegistroFechas noticia={noticia} estadoActual={estado} user={user} />

      {/* Botones de acción */}
      <div className="editar-noticia__acciones-botones">
        <button
          type="button"
          className="crear-noticia__boton-principal w-100"
          onClick={onSubmit}
          disabled={guardando}
        >
          {guardando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              <span>Guardando cambios...</span>
            </>
          ) : (
            <span>Guardar cambios</span>
          )}
        </button>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="crear-noticia__boton-secundario flex-grow-1"
            onClick={onVerPreview}
          >
            Vista previa
          </button>
          <button
            type="button"
            className="crear-noticia__boton-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

