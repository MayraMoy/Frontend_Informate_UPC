import React from 'react';
import RegisterForm from '../../Components/usuarios/RegisterForm';
import AuthInstitutionPanel from './components/AuthInstitutionPanel.jsx';
import AuthModeSwitch from './components/AuthModeSwitch.jsx';
import './styles/RegisterPage.css';
import './styles/AuthPages.css';

export const RegisterPage = () => {
  return (
    <div className="auth-layout register-viewport">
      <AuthInstitutionPanel />

      <section className="auth-form-panel">
        <AuthModeSwitch />
        <div className="register-container">
          <div className="register-header">
            <h1 className="register-title">
              Sumate a <span className="brand-highlight">Foro UPC</span>
            </h1>
            <p className="register-subtitle">
              Creá tu cuenta para acceder a noticias institucionales, resoluciones y participar en la comunidad académica.
            </p>
          </div>

          <div className="register-card">
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
