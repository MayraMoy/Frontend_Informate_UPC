import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import AuthInstitutionPanel from '../../../Pages/usuarios/components/AuthInstitutionPanel.jsx';
import '../../../Pages/usuarios/styles/RegisterPage.css';
import '../../../Pages/usuarios/styles/AuthPages.css';

export const RegisterPage = () => {
  return (
    <div className="auth-layout register-viewport">
      <AuthInstitutionPanel />

      <section className="auth-form-panel">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">
              Sumate a <span className="brand-highlight">Foro UPC</span>
            </h1>
            <p className="register-subtitle">
              Creá tu cuenta para acceder a noticias institucionales, resoluciones y participar en la comunidad académica.
            </p>
          </div>

          <RegisterForm />
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
