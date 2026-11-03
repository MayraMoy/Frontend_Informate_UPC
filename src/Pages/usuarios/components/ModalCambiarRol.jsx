import React from 'react';

export const ModalCambiarRol = ({
  usuario,
  roles,
  rolSeleccionado,
  procesando,
  onChangeRol,
  onGuardar,
  onCancelar,
}) => {
  if (!usuario) return null;

  const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || usuario.email;

  return (
    <div className="usuarios-modal-backdrop" onClick={onCancelar} role="dialog" aria-modal="true" aria-labelledby="modal-rol-title">
      <div className="usuarios-modal-content usuarios-modal-content--sm" onClick={(e) => e.stopPropagation()}>
        <div className="usuarios-modal-header">
          <h3 id="modal-rol-title" className="usuarios-modal-titulo">Modificar rol de usuario</h3>
          <button type="button" className="usuarios-modal-cerrar" onClick={onCancelar} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="usuarios-modal-body">
          <p className="usuarios-modal-texto mb-3">
            Seleccioná el nuevo rol que tendrá <strong>{nombreCompleto}</strong>:
          </p>

          <div className="mb-3">
            <label htmlFor="select-cambiar-rol" className="form-label usuarios-filtro-label">Rol institucional</label>
            <select
              id="select-cambiar-rol"
              className="form-select usuarios-filtro-select"
              value={rolSeleccionado}
              onChange={(e) => onChangeRol(e.target.value)}
              disabled={procesando}
            >
              <option value="" disabled>Seleccioná un rol...</option>
              {roles.map((r) => (
                <option key={r.idRol || r.id} value={r.idRol || r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </div>
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
            className="usuarios-boton-accion-modal usuarios-boton-accion-modal--primario"
            onClick={onGuardar}
            disabled={procesando || !rolSeleccionado}
          >
            {procesando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                <span>Guardando...</span>
              </>
            ) : (
              <span>Asignar nuevo rol</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCambiarRol;
