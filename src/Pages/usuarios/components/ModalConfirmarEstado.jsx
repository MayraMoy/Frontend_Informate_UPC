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
  const rolNombre = usuario.nombreRol || usuario.rol?.nombre || (typeof usuario.rol === 'string' ? usuario.rol : null);

  return (
    <div
      className="usuarios-modal-backdrop"
      onClick={onCancelar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-estado-title"
    >
      <div
        className="usuarios-modal-content usuarios-modal-content--sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Cabecera limpia estándar sin ícono invasivo */}
        <div className="usuarios-modal-header">
          <h3 id="modal-estado-title" className="usuarios-modal-titulo">
            {esActivo ? 'Suspender usuario' : 'Reactivar usuario'}
          </h3>
          <button
            type="button"
            className="usuarios-modal-cerrar"
            onClick={onCancelar}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* 2. Cuerpo con orden lógico y jerarquía visual clara */}
        <div className="usuarios-modal-body">
          {/* Pregunta principal orientada directamente al usuario a modificar */}
          <h4 className="modal-estado-pregunta">
            {esActivo
              ? `¿Estás seguro de que deseás suspender a ${nombreCompleto}?`
              : `¿Confirmás la reactivación de ${nombreCompleto}?`}
          </h4>

          {/* Metadatos de la cuenta: Email y Rol */}
          <div className="modal-estado-usuario-meta">
            <span className="modal-estado-meta-email">{usuario.email}</span>
            {rolNombre && (
              <>
                <span className="modal-estado-meta-separador" aria-hidden="true">•</span>
                <span className="modal-estado-meta-rol">{rolNombre}</span>
              </>
            )}
          </div>

          {/* Advertencia de consecuencia / impacto directo */}
          <div
            className={`modal-estado-aviso ${
              esActivo ? 'modal-estado-aviso--peligro' : 'modal-estado-aviso--exito'
            }`}
          >
            <p className="modal-estado-aviso-texto">
              {esActivo ? (
                <>
                  El usuario <strong>perderá el acceso</strong> a las funciones autenticadas de la plataforma y no podrá iniciar sesión hasta que sea reactivado.
                </>
              ) : (
                <>
                  El usuario <strong>recuperará el acceso</strong> inmediato a la plataforma con sus credenciales y permisos habituales.
                </>
              )}
            </p>
          </div>
        </div>

        {/* 3. Acciones de pie */}
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
            className={`usuarios-boton-accion-modal ${
              esActivo
                ? 'usuarios-boton-accion-modal--peligro'
                : 'usuarios-boton-accion-modal--exito'
            }`}
            onClick={() => onConfirmar(usuario)}
            disabled={procesando}
          >
            {procesando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
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
