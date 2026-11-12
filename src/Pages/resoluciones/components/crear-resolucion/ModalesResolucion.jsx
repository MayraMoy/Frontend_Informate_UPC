import React from 'react';
import { IconoCheck, IconoAlerta } from './IconosResolucion';

export const ModalConfirmarResolucion = ({
  isOpen,
  estado = 'VIGENTE',
  onCancelar,
  onConfirmar,
}) => {
  if (!isOpen) return null;

  const esVigente = estado.toUpperCase() === 'VIGENTE';

  return (
    <div className="crear-resolucion__overlay" role="presentation">
      <section
        className="crear-resolucion__dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmacion-resolucion-titulo"
      >
        <div className="crear-resolucion__dialogo-icono">
          <IconoCheck />
        </div>
        <h2 id="confirmacion-resolucion-titulo" className="crear-resolucion__dialogo-titulo">
          {esVigente ? '¿Confirmás la publicación oficial?' : '¿Guardar resolución como pendiente?'}
        </h2>
        <p className="crear-resolucion__dialogo-texto">
          {esVigente
            ? 'La resolución quedará con estado VIGENTE y será visible en el repositorio institucional para toda la comunidad académica.'
            : 'La resolución quedará registrada con estado PENDIENTE para su posterior evaluación y aprobación por parte del Consejo.'}
        </p>

        <div className="crear-resolucion__acciones-dialogo">
          <button
            type="button"
            className="crear-resolucion__boton-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="crear-resolucion__boton-principal"
            onClick={onConfirmar}
          >
            {esVigente ? 'Confirmar y Publicar' : 'Confirmar y Guardar'}
          </button>
        </div>
      </section>
    </div>
  );
};

export const ModalConfirmarLimpiarResolucion = ({
  isOpen,
  onCancelar,
  onConfirmar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="crear-resolucion__overlay" role="presentation">
      <section
        className="crear-resolucion__dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmacion-limpiar-titulo"
      >
        <div className="crear-resolucion__dialogo-icono crear-resolucion__dialogo-icono--alerta">
          <IconoAlerta />
        </div>
        <h2 id="confirmacion-limpiar-titulo" className="crear-resolucion__dialogo-titulo">
          ¿Deseas limpiar todos los campos?
        </h2>
        <p className="crear-resolucion__dialogo-texto">
          Se perderá todo el texto redactado, el número de resolución y el archivo PDF seleccionado. Esta acción no se puede deshacer.
        </p>

        <div className="crear-resolucion__acciones-dialogo">
          <button
            type="button"
            className="crear-resolucion__boton-secundario"
            onClick={onCancelar}
          >
            Conservar datos
          </button>

          <button
            type="button"
            className="crear-resolucion__boton-peligro"
            onClick={onConfirmar}
          >
            Sí, limpiar formulario
          </button>
        </div>
      </section>
    </div>
  );
};

export const OverlayCargaResolucion = ({ visible = false, mensaje = 'Guardando resolución...' }) => {
  if (!visible) return null;

  return (
    <div className="crear-resolucion__overlay-carga" role="status" aria-live="polite">
      <div className="crear-resolucion__overlay-caja">
        <span className="crear-resolucion__spinner" aria-hidden="true" />
        <p className="crear-resolucion__overlay-texto">{mensaje}</p>
      </div>
    </div>
  );
};
