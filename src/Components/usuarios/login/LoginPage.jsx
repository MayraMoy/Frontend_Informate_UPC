import React from 'react';
import LoginForm from './LoginForm.jsx';
import AuthInstitutionPanel from '../../../Pages/usuarios/components/AuthInstitutionPanel.jsx';
import AuthModeSwitch from '../../../Pages/usuarios/components/AuthModeSwitch.jsx';
import '../../../Pages/usuarios/styles/LoginPage.css';
import '../../../Pages/usuarios/styles/AuthPages.css';

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
