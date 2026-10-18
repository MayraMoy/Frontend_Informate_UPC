import React from 'react';
import LoginForm from '../../Components/usuarios/LoginForm';
import AuthInstitutionPanel from './components/AuthInstitutionPanel.jsx';
import AuthModeSwitch from './components/AuthModeSwitch.jsx';
import './styles/LoginPage.css';
import './styles/AuthPages.css';

export const LoginPage = () => {
  return (
    <div className="auth-layout login-viewport">
      <AuthInstitutionPanel />

      <section className="auth-form-panel">
        <AuthModeSwitch />
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">¡Qué bueno verte de nuevo!</h1>
            <p className="login-subtitle">
              Ingresá a tu cuenta para seguir conectando con la comunidad de <span className="brand-highlight">Foro UPC</span>
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
