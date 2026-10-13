import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmacionRegistroPage.css';

export const ConfirmacionRegistroPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Correo recibido desde el registro o valor por defecto
  const userEmail = location.state?.email || 'alumno@upc.edu.ar';

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cuenta regresiva para volver a permitir el reenvío
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResendEmail = () => {
    if (cooldown > 0 || isResending) return;

    setIsResending(true);
    setResendSuccess(false);

    // Simula envío de correo institucional
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      setCooldown(60); // 60 segundos de cooldown
    }, 900);
  };

  return (
    <div className="confirmacion-viewport">
      <div className="confirmacion-container">
        {/* Cabecera fuera de la tarjeta sobre fondo gris */}
        <div className="confirmacion-header">
          <span className="badge-comunidad">Comunidad Universitaria</span>
          <h1 className="confirmacion-title">¡Registro completado con éxito!</h1>
          <p className="confirmacion-subtitle">
            Tu cuenta en Foro UPC ha sido reservada. Solo falta un último paso para activarla.
          </p>
        </div>

        {/* Tarjeta blanca central */}
        <div className="confirmacion-card">
          {/* Icono circular de sobre */}
          <div className="icon-envelope-wrapper" aria-hidden="true">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ea8207"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          {/* Píldora: Correo de verificación enviado */}
          <div className="pill-verification-status">
            <span className="pill-dot">●</span>
            <span>Correo de verificación enviado</span>
          </div>

          {/* Título de verificación */}
          <h2 className="card-heading">Verificá tu casilla institucional</h2>

          {/* Texto descriptivo */}
          <p className="card-description">
            Hemos enviado un enlace de confirmación seguro a tu correo de la Universidad Provincial de Córdoba. Por favor, hacé clic en el botón dentro del correo para activar tu perfil.
          </p>

          {/* Mensaje de éxito al reenviar */}
          {resendSuccess && (
            <div className="alert-resend-success" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>¡Correo de confirmación reenviado a tu casilla!</span>
            </div>
          )}

          {/* Casilla de correo de solo lectura con candado */}
          <div className="email-display-box" title="Correo institucional registrado">
            <svg
              className="email-box-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="email-box-text">{userEmail}</span>
          </div>

          {/* Botón Reenviar correo */}
          <button
            type="button"
            className="btn-resend-email"
            onClick={handleResendEmail}
            disabled={isResending || cooldown > 0}
          >
            {isResending ? (
              <span>Reenviando...</span>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-2"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <span>
                  {cooldown > 0
                    ? `Reenviar correo (${cooldown}s)`
                    : 'Reenviar correo de confirmación'}
                </span>
              </>
            )}
          </button>

          {/* Helper text de spam */}
          <small className="spam-helper-text">
            ¿No recibiste nada? Revisá tu carpeta de Spam o Correo no deseado.
          </small>

          {/* Separador con letra o */}
          <div className="confirmacion-separator" aria-hidden="true">
            <span className="separator-line"></span>
            <span className="separator-circle">o</span>
            <span className="separator-line"></span>
          </div>

          {/* Botón Volver al inicio de sesión */}
          <button
            type="button"
            className="btn-back-login"
            onClick={() => navigate('/login')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Volver al inicio de sesión</span>
          </button>
        </div>

        {/* Pie fuera de la tarjeta */}
        <div className="confirmacion-footer">
          <span className="footer-support-text">¿Tenés inconvenientes con el acceso? </span>
          <a
            href="mailto:soporte@upc.edu.ar"
            className="link-support-institutional"
          >
            Contactar a soporte institucional
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionRegistroPage;
