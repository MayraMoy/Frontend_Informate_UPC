import React from 'react';

export const ModalConfirmarEstado = ({
  usuario,
  procesando,
  onConfirmar,
  onCancelar,
}) => {
  if (!usuario) return null;

  const esActivo = (usuario.estado || 'ACTIVO').toUpperCase() === 'ACTIVO';
  const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || usuario.email;

  return (
    <div className="usuarios-modal-backdrop" onClick={onCancelar} role="dialog" aria-modal="true" aria-labelledby="modal-estado-title">
      <div className="usuarios-modal-content usuarios-modal-content--sm" onClick={(e) => e.stopPropagation()}>
        <div className="usuarios-modal-header">
          <h3 id="modal-estado-title" className="usuarios-modal-titulo">
            {esActivo ? 'Suspender usuario' : 'Reactivar usuario'}
          </h3>
          <button type="button" className="usuarios-modal-cerrar" onClick={onCancelar} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="usuarios-modal-body">
          <p className="usuarios-modal-texto">
            {esActivo ? (
              <>
                ¿Estás seguro de que deseás suspender la cuenta de <strong>{nombreCompleto}</strong>?
                El usuario perderá el acceso a las funciones autenticadas de la plataforma hasta ser reactivado.
              </>
            ) : (
              <>
                ¿Confirmás la reactivación de la cuenta de <strong>{nombreCompleto}</strong>?
                El usuario volverá a tener acceso regular a la plataforma.
              </>
            )}
          </p>
        </div>

        <div className="usuarios-modal-footer">
          <button
            type="button"
            className="usuarios-boton-cerrar"
            onClick={onCancelar}
            disabled={procesando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={`usuarios-boton-accion-modal ${esActivo ? 'usuarios-boton-accion-modal--peligro' : 'usuarios-boton-accion-modal--exito'}`}
            onClick={() => onConfirmar(usuario)}
            disabled={procesando}
          >
            {procesando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>{esActivo ? 'Sí, suspender cuenta' : 'Sí, reactivar cuenta'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEstado;
