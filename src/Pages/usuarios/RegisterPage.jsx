import React from 'react';
import RegisterForm from '../../Components/usuarios/RegisterForm';
import './RegisterPage.css';

export const RegisterPage = () => {
  return (
    <div className="register-viewport">
      <div className="register-card">
        {/* Cabecera con Badge y Títulos */}
        <div className="register-header">
          <span className="badge-comunidad">Comunidad Universitaria</span>
          <h1 className="register-title">
            Creá tu cuenta en <span className="brand-highlight">Foro UPC</span>
          </h1>
          <p className="register-subtitle">
            Accedé a noticias institucionales, resoluciones y participá de la comunidad académica.
          </p>
        </div>

        {/* Formulario de Registro */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
