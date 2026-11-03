import React from 'react';

export const ModalDetalleUsuario = ({ usuario, onClose, onCopiarEmail }) => {
  if (!usuario) return null;

  const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario';
  const inicial = (usuario.nombre || 'U').charAt(0).toUpperCase();
  const rol = (usuario.nombreRol || usuario.rol?.nombre || 'ESTUDIANTE').toUpperCase();
  const estado = (usuario.estado || 'ACTIVO').toUpperCase();

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'Sin registro';
    try {
      return new Date(fechaStr).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return fechaStr;
    }
  };

  return (
    <div className="usuarios-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-detalle-title">
      <div className="usuarios-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="usuarios-modal-header">
          <div className="d-flex align-items-center gap-3">
            <div className="usuarios-avatar-lg" aria-hidden="true">
              {inicial}
            </div>
            <div>
              <h3 id="modal-detalle-title" className="usuarios-modal-titulo mb-1">{nombreCompleto}</h3>
              <div className="d-flex align-items-center gap-2">
                <span className={`usuarios-rol-pill usuarios-rol-pill--${rol.toLowerCase()}`}>{rol}</span>
                <span className={`usuarios-estado-pill usuarios-estado-pill--${estado.toLowerCase()}`}>● {estado}</span>
              </div>
            </div>
          </div>
          <button type="button" className="usuarios-modal-cerrar" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="usuarios-modal-body">
          <h4 className="usuarios-modal-subtitulo">Información de la cuenta</h4>
          <dl className="usuarios-detalle-dl">
            <div>
              <dt>Correo electrónico</dt>
              <dd className="d-flex align-items-center justify-content-between">
                <span>{usuario.email || '-'}</span>
              </dd>
            </div>
            <div>
              <dt>Documento (DNI)</dt>
              <dd>{usuario.dni || 'No registrado'}</dd>
            </div>
            <div>
              <dt>Fecha de registro</dt>
              <dd>{formatearFecha(usuario.fechaRegistro)}</dd>
            </div>
            <div>
              <dt>Último acceso</dt>
              <dd>{formatearFecha(usuario.ultimoAcceso)}</dd>
            </div>
          </dl>

          <h4 className="usuarios-modal-subtitulo mt-4">Contacto institucional</h4>
          <div className="usuarios-contacto-acciones">
            {usuario.email && (
              <>
                <a
                  href={`mailto:${usuario.email}?subject=Comunicación Institucional - Foro UPC`}
                  className="usuarios-boton-contacto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Enviar correo directo</span>
                </a>

                <button
                  type="button"
                  className="usuarios-boton-secundario"
                  onClick={() => onCopiarEmail(usuario.email)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copiar email</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="usuarios-modal-footer">
          <button type="button" className="usuarios-boton-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleUsuario;
