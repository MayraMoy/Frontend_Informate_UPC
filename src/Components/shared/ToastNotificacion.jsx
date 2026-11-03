import React, { useEffect } from 'react';
import './styles/ToastNotificacion.css';

const IconoCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconoError = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const IconoInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconoWarning = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconoCerrar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ToastNotificacion = ({
  visible,
  mensaje,
  tipo = 'success',
  duracion = 4500,
  accion = null,
  onCerrar,
}) => {
  useEffect(() => {
    if (!visible || !onCerrar || duracion <= 0) return;

    const timer = setTimeout(() => {
      onCerrar();
    }, duracion);

    return () => clearTimeout(timer);
  }, [visible, duracion, onCerrar]);

  if (!visible || !mensaje) return null;

  const renderIcono = () => {
    switch (tipo) {
      case 'error':
        return <IconoError />;
      case 'info':
        return <IconoInfo />;
      case 'warning':
        return <IconoWarning />;
      case 'success':
      default:
        return <IconoCheck />;
    }
  };

  return (
    <div className="toast-notificacion-container" aria-live="polite" aria-atomic="true">
      <div className={`toast-notificacion-item toast-notificacion-item--${tipo}`} role="status">
        <div className="toast-notificacion-icono" aria-hidden="true">
          {renderIcono()}
        </div>

        <div className="toast-notificacion-contenido">
          <p className="toast-notificacion-mensaje">{mensaje}</p>
        </div>

        {accion?.texto && (
          <button
            type="button"
            className="toast-notificacion-accion"
            onClick={accion.onClick}
          >
            {accion.texto}
          </button>
        )}

        {onCerrar && (
          <button
            type="button"
            className="toast-notificacion-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar notificación"
          >
            <IconoCerrar />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToastNotificacion;
