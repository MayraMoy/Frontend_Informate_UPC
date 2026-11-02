import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm.jsx';
import logoUpc from '../../../assets/logo-upc-corto.png';
import '../../../Pages/usuarios/styles/RegisterPage.css';
import '../../../Pages/usuarios/styles/AuthPages.css';

export const RegisterPage = () => {
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
    <div className="register-page-container">
      <main className={`register-card-wrapper${isExiting ? ' is-exiting' : ''}`}>
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

        <div className="register-card">
          <div className="register-header">
            <div className="register-logo-container">
              <img
                src={logoUpc}
                alt="Universidad Provincial de Córdoba"
                className="register-logo-img"
              />
            </div>
            <h1 className="register-title">Crear cuenta</h1>
            <p className="register-subtitle">
              Sumate a la plataforma oficial de la Universidad Provincial de Córdoba.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
