import React from 'react';

export const ModalDetalleHeader = ({
  nombreCompleto,
  inicial,
  rol,
  estado,
  dni,
  email,
  onClose,
}) => {
  return (
    <div className="usuarios-modal-header usuarios-modal-header--perfil">
      <div className="d-flex align-items-center gap-3">
        <div className="usuarios-avatar-lg" aria-hidden="true">
          {inicial}
        </div>
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h3 id="modal-detalle-title" className="usuarios-modal-titulo mb-0">
              {nombreCompleto}
            </h3>
            <span className={`usuarios-rol-pill usuarios-rol-pill--${rol.toLowerCase()}`}>
              {rol}
            </span>
            <span className={`usuarios-estado-pill usuarios-estado-pill--${estado.toLowerCase()}`}>
              ● {estado}
            </span>
          </div>
          <p className="usuarios-modal-subtitulo-perfil mb-0 text-muted small">
            {dni ? `DNI: ${dni} • ` : ''}Miembro institucional de la UPC
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        {email && (
          <a
            href={`mailto:${email}?subject=Comunicación Institucional - Foro UPC`}
            className="usuarios-boton-contacto-head"
            target="_blank"
            rel="noopener noreferrer"
            title="Redactar correo a este usuario"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Enviar correo</span>
          </a>
        )}
        <button
          type="button"
          className="usuarios-modal-cerrar"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ModalDetalleHeader;

