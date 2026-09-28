import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForoLogo from '../../Components/shared/ForoLogo';
import LoginForm from '../../Components/usuarios/LoginForm';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Si hay historial anterior vuelve atrás, sino navega a home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-viewport">
      <div className="login-card">
        {/* Botón Volver Atrás */}
        <button
          type="button"
          className="btn-back"
          onClick={handleBack}
          aria-label="Volver atrás"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        {/* Encabezado con Logo y Título */}
        <div className="login-header">
          <ForoLogo width={170} />
          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">
            Inicia sesion en <span className="brand-highlight">Foro UPC</span>
          </p>
        </div>

        {/* Formulario de Login */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
