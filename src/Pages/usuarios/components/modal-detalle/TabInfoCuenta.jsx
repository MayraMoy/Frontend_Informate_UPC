import React from 'react';

export const TabInfoCuenta = ({
  usuario,
  copiado,
  onCopiarEmail,
  formatearFecha,
}) => {
  return (
    <div className="usuarios-tab-pane">
      <h4 className="usuarios-modal-seccion-titulo mb-3">Datos Generales</h4>
      <dl className="usuarios-detalle-dl">
        <div>
          <dt>Correo electrónico</dt>
          <dd className="d-flex align-items-center gap-2">
            <span className="usuarios-email-texto">{usuario.email || 'No registrado'}</span>
            {usuario.email && (
              <button
                type="button"
                className={`usuarios-btn-copiar-inline ${copiado ? 'usuarios-btn-copiar-inline--copiado' : ''}`}
                onClick={onCopiarEmail}
                title={copiado ? '¡Correo copiado al portapapeles!' : 'Copiar correo'}
                aria-label={copiado ? 'Correo copiado' : 'Copiar correo'}
              >
                {copiado ? (
                  <>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="usuarios-btn-copiar-feedback">¡Copiado!</span>
                  </>
                ) : (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
            )}
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
          <dt>Último acceso a la plataforma</dt>
          <dd>{formatearFecha(usuario.ultimoAcceso)}</dd>
        </div>
      </dl>

      <div className="usuarios-info-extra-card mt-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h5 className="mb-0 fw-bold fs-6">Políticas de moderación y privacidad</h5>
        </div>
        <p className="text-muted small mb-0">
          Las comunicaciones enviadas desde este panel quedan registradas como contacto institucional oficial. Se solicita preservar la privacidad del estudiante de acuerdo a las directivas de la UPC.
        </p>
      </div>
    </div>
  );
};

export default TabInfoCuenta;

