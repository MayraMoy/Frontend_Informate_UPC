import React from 'react';

export const TabInfoCuenta = ({
  usuario,
  copiado,
  onCopiarEmail,
  formatearFecha,
}) => {
  return (
    <div className="usuarios-tab-pane">
      <div className="usuarios-tab-context-bar mb-3">
        <span className="text-muted small">
          Detalles de cuenta, credenciales de acceso y directivas de seguridad
        </span>
      </div>

      <div className="usuarios-info-grid">
        <div className="usuarios-info-item-card">
          <div className="usuarios-info-item-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="usuarios-info-item-content">
            <span className="usuarios-info-item-label">Correo institucional</span>
            <div className="d-flex align-items-center gap-2 mt-1">
              <span className="usuarios-info-item-valor">{usuario.email || 'No registrado'}</span>
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
            </div>
          </div>
        </div>

        <div className="usuarios-info-item-card">
          <div className="usuarios-info-item-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M11 7h6" />
              <path d="M7 11h.01" />
              <path d="M11 11h6" />
              <path d="M7 15h.01" />
              <path d="M11 15h6" />
            </svg>
          </div>
          <div className="usuarios-info-item-content">
            <span className="usuarios-info-item-label">Documento Nacional de Identidad</span>
            <span className="usuarios-info-item-valor">{usuario.dni || 'No registrado'}</span>
          </div>
        </div>

        <div className="usuarios-info-item-card">
          <div className="usuarios-info-item-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="usuarios-info-item-content">
            <span className="usuarios-info-item-label">Fecha de registro</span>
            <span className="usuarios-info-item-valor">{formatearFecha(usuario.fechaRegistro)}</span>
          </div>
        </div>

        <div className="usuarios-info-item-card">
          <div className="usuarios-info-item-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="usuarios-info-item-content">
            <span className="usuarios-info-item-label">Último acceso a la plataforma</span>
            <span className="usuarios-info-item-valor">{formatearFecha(usuario.ultimoAcceso)}</span>
          </div>
        </div>
      </div>

      <div className="usuarios-info-extra-card">
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

