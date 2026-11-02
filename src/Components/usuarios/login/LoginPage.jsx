import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import logoUpc from '../../../assets/logo-upc-corto.png';
import '../../../Pages/usuarios/styles/LoginPage.css';
import '../../../Pages/usuarios/styles/AuthPages.css';

export const LoginPage = () => {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleBackToHome = (e) => {
    e.preventDefault();
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 280);
  };

  return (
    <div className="login-page-container">
      <main className={`login-card-wrapper${isExiting ? ' is-exiting' : ''}`}>
        <div className="auth-nav-header">
          <Link
            to="/"
            className="auth-home-link"
            onClick={handleBackToHome}
            aria-label="Volver al inicio"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Volver al inicio</span>
          </Link>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-container">
              <img
                src={logoUpc}
                alt="Universidad Provincial de Córdoba"
                className="login-logo-img"
              />
            </div>
            <h1 className="login-title">Bienvenido de nuevo</h1>
            <p className="login-subtitle">
              Accede a la plataforma oficial de la Universidad Provincial de Córdoba.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
