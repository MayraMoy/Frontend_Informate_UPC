import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import usuarioService from '../../Services/usuarios/usuarioService';
import AppContext from '../../Context/AppContext';

export const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const setUser = context?.setUser;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar mensaje de error al escribir
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validaciones básicas de cliente
    // Validación de correo vacío
    const emailLimpio = formData.email.trim();
    if (!emailLimpio) {
      setErrorMsg('Por favor, ingresa tu correo electrónico.');
      return;
    }

    // Validación de formato de correo (@gmail, @hotmail, @yahoo, etc.)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailLimpio)) {
      setErrorMsg('Correo electronico equivocado');
      return;
    }

    // Validación de contraseña vacía
    if (!formData.password) {
      setErrorMsg('Por favor, ingresa tu contraseña.');
      return;
    }

    try {
      setIsSubmitting(true);
      const usuarioLogueado = await usuarioService.iniciarSesion(
        formData.email.trim(),
        formData.password
      );

      // Guardar en contexto global y localStorage
      if (setUser) {
        setUser(usuarioLogueado);
      }
      localStorage.setItem('usuarioSesion', JSON.stringify(usuarioLogueado));

      // Redireccionar al home o dashboard
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCredentialsError = errorMsg && errorMsg.includes('no son correctos');
  const isEmailError = errorMsg && (isCredentialsError || errorMsg.includes('correo') || errorMsg.includes('Correo'));
  const isPasswordError = errorMsg && (isCredentialsError || errorMsg.includes('contraseña') || errorMsg.includes('Contraseña'));

  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      {errorMsg && (
        <div className="login-alert-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Campo Correo Electrónico */}
      <div className="form-group mb-3 text-start">
        <div className="d-flex justify-content-start align-items-center mb-1">
          <label htmlFor="email" className="form-label-custom mb-0">
            Correo electronico
          </label>
        </div>
        <div className={`input-group-custom ${isEmailError ? 'has-error' : ''}`}>
          <span className="input-icon">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field-custom"
            placeholder="foroUPC@gmail.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div className="form-group mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label htmlFor="password" className="form-label-custom mb-0">
            Contraseña
          </label>
          <Link to="/recuperar-password" className="link-forgot-password">
            Olvidaste tu contraseña?
          </Link>
        </div>
        <div className={`input-group-custom ${isPasswordError ? 'has-error' : ''}`}>
          <span className="input-icon">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="input-field-custom"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="btn-toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Botón Iniciar Sesión */}
      <button
        type="submit"
        className="btn-submit-login"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
        ) : null}
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesion'}
      </button>

      {/* Enlace de Registro */}
      <div className="login-footer text-center mt-4">
        <span className="footer-text">¿No tenes cuenta? </span>
        <Link to="/registro" className="link-register">
          Registrate
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
