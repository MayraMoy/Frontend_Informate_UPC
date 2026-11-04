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
  const inicial = (usuario.nombre?.[0] || usuario.email?.[0] || 'U').toUpperCase();
  const rolNombre = usuario.nombreRol || usuario.rol?.nombre || (typeof usuario.rol === 'string' ? usuario.rol : null);

  return (
    <div className="usuarios-modal-backdrop" onClick={onCancelar} role="dialog" aria-modal="true" aria-labelledby="modal-estado-title">
      <div className="usuarios-modal-content usuarios-modal-content--sm modal-estado-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabecera con Icono y Jerarquía de Acción */}
        <div className="modal-estado-header">
          <div className={`modal-estado-icono-circulo ${esActivo ? 'modal-estado-icono--peligro' : 'modal-estado-icono--exito'}`} aria-hidden="true">
            {esActivo ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
          </div>

          <div className="modal-estado-header-textos">
            <h3 id="modal-estado-title" className="modal-estado-titulo">
              {esActivo ? '¿Suspender usuario?' : '¿Reactivar usuario?'}
            </h3>
            <p className="modal-estado-bajada">
              {esActivo
                ? 'Esta acción inhabilitará de forma temporal el acceso a la plataforma.'
                : 'Esta acción restablecerá el acceso a las funciones del portal.'}
            </p>
          </div>

          <button type="button" className="usuarios-modal-cerrar" onClick={onCancelar} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        {/* Cuerpo Jerarquizado: Ficha del usuario + Aviso de impacto */}
        <div className="modal-estado-body">
          {/* 1. Tarjeta resumen del usuario afectado */}
          <div className="modal-estado-user-badge">
            <div className="modal-estado-avatar" aria-hidden="true">
              {inicial}
            </div>
            <div className="modal-estado-user-info">
              <span className="modal-estado-user-nombre">{nombreCompleto}</span>
              <span className="modal-estado-user-email">{usuario.email}</span>
            </div>
            {rolNombre && (
              <span className="modal-estado-rol-tag">{rolNombre}</span>
            )}
          </div>

          {/* 2. Alerta de consecuencia bien diferenciada */}
          <div className={`modal-estado-aviso ${esActivo ? 'modal-estado-aviso--peligro' : 'modal-estado-aviso--exito'}`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="modal-estado-aviso-icono">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="modal-estado-aviso-texto">
              {esActivo ? (
                <>
                  El usuario <strong>no podrá iniciar sesión</strong> en su cuenta hasta que un administrador la reactive.
                </>
              ) : (
                <>
                  El usuario <strong>podrá volver a ingresar</strong> con sus credenciales y permisos habituales.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Botonera de Acción */}
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
