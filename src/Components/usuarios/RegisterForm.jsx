import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import usuarioService from '../../Services/usuarios/usuarioService';
import api from '../../Services/axiosConfig';

/**
 * Evalúa la efectividad/fortaleza de la contraseña de manera progresiva y amigable.
 * - Antes de 8 caracteres: siempre "Contraseña insegura" (rojo, < 50%).
 * - A partir de 8 caracteres: base de 60% (naranja).
 * - Facilidad para llegar al 100%:
 *   1) Con 14 o más caracteres (hasta el máximo de 25) llega directo al 100%.
 *   2) Con solo 8 a 10 caracteres que mezclen letras y números (ej. Juan1234) o mayúsculas llega fácil al 90-100%.
 */
const evaluatePasswordStrength = (pass) => {
  if (!pass || pass.length === 0) {
    return {
      percentage: 0,
      width: '0%',
      label: 'Ingresá tu contraseña (8 a 25 caracteres)',
      color: '#94a3b8',
      barColor: '#e5e7eb',
    };
  }

  // Si tiene menos de 8 caracteres: siempre es "Contraseña insegura"
  if (pass.length < 8) {
    const base = Math.round((pass.length / 8) * 38);
    let bonus = 0;
    if (/[a-z]/.test(pass)) bonus += 2;
    if (/[A-Z]/.test(pass)) bonus += 3;
    if (/[0-9]/.test(pass)) bonus += 4;
    if (/[^A-Za-z0-9]/.test(pass)) bonus += 4;

    const percent = Math.min(48, Math.max(10, base + bonus));
    return {
      percentage: percent,
      width: `${percent}%`,
      label: 'Contraseña insegura',
      color: '#ef4444',
      barColor: '#ef4444',
    };
  }

  // Si tiene 14 o más caracteres (hasta el tope de 25), la longitud garantiza el 100%
  if (pass.length >= 14) {
    return {
      percentage: 100,
      width: '100%',
      label: 'Contraseña muy segura',
      color: '#10b981',
      barColor: '#10b981',
    };
  }

  // Entre 8 y 13 caracteres:
  // Base generosa de 60% por tener 8 caracteres
  let score = 60;

  let typesCount = 0;
  if (/[a-z]/.test(pass)) typesCount++;
  if (/[A-Z]/.test(pass)) typesCount++;
  if (/[0-9]/.test(pass)) typesCount++;
  if (/[^A-Za-z0-9]/.test(pass)) typesCount++;

  // Bonificación por variedad accesible
  if (typesCount >= 2) score += 15;
  if (typesCount >= 3) score += 15;
  if (typesCount >= 4) score += 10;

  // Bonificación por cada caracter adicional a 8 (+6% por caracter)
  const extraChars = pass.length - 8;
  score += extraChars * 6;

  const percent = Math.min(100, score);

  if (percent < 75) {
    return {
      percentage: percent,
      width: `${percent}%`,
      label: 'Contraseña media',
      color: '#ea8207',
      barColor: '#ea8207',
    };
  }

  return {
    percentage: percent,
    width: `${percent}%`,
    label: percent === 100 ? 'Contraseña muy segura' : 'Contraseña fuerte',
    color: '#10b981',
    barColor: '#10b981',
  };
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    carrera: '',
    anoCarrera: '',
    aceptaTerminos: false,
  });

  const [carreras, setCarreras] = useState([
    { idCarrera: 1, nombre: 'Tecnicatura Universitaria en Desarrollo Web' },
    { idCarrera: 2, nombre: 'Licenciatura en Diseño Gráfico' },
    { idCarrera: 3, nombre: 'Licenciatura en Administración' },
    { idCarrera: 4, nombre: 'Licenciatura en Turismo' },
    { idCarrera: 5, nombre: 'Licenciatura en Psicopedagogía' },
    { idCarrera: 6, nombre: 'Licenciatura en Educación Física' },
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar carreras desde la API si están disponibles
  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const res = await api.get('/carreras/todos');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCarreras(res.data);
        }
      } catch {
        // Mantiene la lista por defecto ante fallos de conexión
      }
    };
    fetchCarreras();
  }, []);

  // Medidor de efectividad de contraseña
  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(formData.password);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validaciones
    if (!formData.dni.trim()) {
      setErrorMsg('Por favor, ingresa tu número de DNI.');
      return;
    }
    if (!/^\d+$/.test(formData.dni.trim())) {
      setErrorMsg('El DNI debe contener solo números, sin puntos.');
      return;
    }
    if (!formData.nombre.trim()) {
      setErrorMsg('Por favor, ingresa tu nombre.');
      return;
    }
    if (!formData.apellido.trim()) {
      setErrorMsg('Por favor, ingresa tu apellido.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Por favor, ingresa tu correo institucional.');
      return;
    }
    const emailTrim = formData.email.trim().toLowerCase();
    const upcEmailRegex = /^[a-zA-Z0-9._%+-]+@upc\.edu\.ar$/;
    if (!upcEmailRegex.test(emailTrim)) {
      setErrorMsg('Debes ingresar un correo institucional de la universidad (@upc.edu.ar).');
      return;
    }
    if (!formData.password) {
      setErrorMsg('Por favor, ingresa una contraseña.');
      return;
    }
    if (formData.password.length < 8) {
      setErrorMsg('La contraseña debe tener un mínimo de 8 caracteres.');
      return;
    }
    if (formData.password.length > 25) {
      setErrorMsg('La contraseña no puede superar los 25 caracteres.');
      return;
    }
    if (!formData.carrera) {
      setErrorMsg('Por favor, selecciona tu carrera.');
      return;
    }
    if (!formData.anoCarrera) {
      setErrorMsg('Por favor, selecciona el año de tu carrera.');
      return;
    }
    if (!formData.aceptaTerminos) {
      setErrorMsg('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    try {
      setIsSubmitting(true);

      // Payload preparado para la entidad Usuario del backend
      const nuevoUsuarioPayload = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        dni: formData.dni.trim(),
        email: formData.email.trim().toLowerCase(),
        contraseña: formData.password,
        estado: 'ACTIVO',
        estadoSolicitud: 'APROBADA',
        fechaRegistro: new Date().toISOString(),
        rol: {
          idRol: 2, // Rol ESTUDIANTE / Alumno
        },
      };

      await usuarioService.crear(nuevoUsuarioPayload);

      setSuccessMsg('¡Cuenta creada con éxito! Redirigiendo a la confirmación...');
      const registeredEmail = formData.email.trim().toLowerCase();
      setTimeout(() => {
        navigate('/registro-completado', {
          state: { email: registeredEmail },
        });
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear la cuenta. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>
      {errorMsg && (
        <div className="register-alert-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="register-alert-success" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Fila 1: DNI y Nombre + Apellido */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-5 text-start">
          <label htmlFor="dni" className="form-label-custom mb-1">
            DNI <span className="text-warning">*</span>
          </label>
          <div className="input-group-custom">
            <span className="input-icon">
              {/* Icono DNI / Credencial */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="8" cy="10" r="2" />
                <line x1="14" y1="9" x2="18" y2="9" />
                <line x1="14" y1="13" x2="18" y2="13" />
              </svg>
            </span>
            <input
              id="dni"
              name="dni"
              type="text"
              className="input-field-custom"
              placeholder="Ej. 40123456"
              value={formData.dni}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <small className="form-helper-text">Solo números, sin puntos.</small>
        </div>

        <div className="col-12 col-md-7 text-start">
          <div className="row g-2">
            <div className="col-6">
              <label htmlFor="nombre" className="form-label-custom mb-1">
                Nombre <span className="text-warning">*</span>
              </label>
              <div className="input-group-custom">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="input-field-custom"
                  placeholder="Ej. Juan"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="apellido" className="form-label-custom mb-1">
                Apellido <span className="text-warning">*</span>
              </label>
              <div className="input-group-custom">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  className="input-field-custom"
                  placeholder="Ej. Pérez"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fila 2: Email Institucional */}
      <div className="form-group mb-3 text-start">
        <label htmlFor="email" className="form-label-custom mb-1">
          Email institucional <span className="text-warning">*</span>
        </label>
        <div className="input-group-custom">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field-custom"
            placeholder="usuario@upc.edu.ar"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={isSubmitting}
          />
        </div>
        <small className="form-helper-text">Debe ser tu correo oficial (@upc.edu.ar)</small>
      </div>

      {/* Fila 3: Contraseña */}
      <div className="form-group mb-3 text-start">
        <label htmlFor="password" className="form-label-custom mb-1">
          Contraseña <span className="text-warning">*</span>
        </label>
        <div className="input-group-custom">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="input-field-custom"
            placeholder="Entre 8 y 25 caracteres"
            maxLength={25}
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
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
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {/* Medidor dinámico de efectividad de contraseña */}
        <div className="password-strength-container" aria-hidden="true">
          <div className="password-strength-track">
            <div
              className="password-strength-bar"
              style={{
                width: passwordStrength.width,
                backgroundColor: passwordStrength.barColor,
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <small
            className="form-helper-text m-0"
            style={{
              color: passwordStrength.color,
              transition: 'color 0.2s ease',
            }}
          >
            {passwordStrength.label}
          </small>
          {formData.password && (
            <span
              className="password-percent-badge"
              style={{
                color: passwordStrength.color,
                transition: 'color 0.2s ease',
              }}
            >
              {passwordStrength.percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Fila 4: Carrera */}
      <div className="form-group mb-3 text-start">
        <label htmlFor="carrera" className="form-label-custom mb-1">
          Carrera <span className="text-warning">*</span>
        </label>
        <div className="input-group-custom select-wrapper">
          <span className="input-icon">
            {/* Birrete de graduación */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          <select
            id="carrera"
            name="carrera"
            className="input-field-custom select-field-custom"
            value={formData.carrera}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Seleccioná tu carrera</option>
            {carreras.map((c) => (
              <option key={c.idCarrera} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fila 5: Año de la carrera */}
      <div className="form-group mb-4 text-start">
        <label htmlFor="anoCarrera" className="form-label-custom mb-1">
          Año de la carrera <span className="text-warning">*</span>
        </label>
        <div className="input-group-custom select-wrapper">
          <span className="input-icon">
            {/* Calendario */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <select
            id="anoCarrera"
            name="anoCarrera"
            className="input-field-custom select-field-custom"
            value={formData.anoCarrera}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Seleccioná el año</option>
            <option value="1">1° Año</option>
            <option value="2">2° Año</option>
            <option value="3">3° Año</option>
            <option value="4">4° Año</option>
            <option value="5">5° Año</option>
          </select>
        </div>
      </div>

      {/* Separador */}
      <div className="separator-container my-3">
        <span className="separator-line" />
        <span className="separator-text">o completá todos los campos</span>
        <span className="separator-line" />
      </div>

      {/* Checkbox Términos y Condiciones */}
      <div className="form-check-custom text-start mb-4">
        <input
          id="aceptaTerminos"
          name="aceptaTerminos"
          type="checkbox"
          className="checkbox-custom"
          checked={formData.aceptaTerminos}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <label htmlFor="aceptaTerminos" className="checkbox-label-custom">
          Acepto los{' '}
          <Link to="/terminos" className="link-terms">
            Términos y Condiciones
          </Link>{' '}
          y la{' '}
          <Link to="/privacidad" className="link-terms">
            Política de Privacidad
          </Link>{' '}
          de Foro UPC.
        </label>
      </div>

      {/* Botón Crear mi cuenta */}
      <button
        type="submit"
        className="btn-submit-register"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
        ) : (
          <svg className="btn-icon me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )}
        <span>{isSubmitting ? 'Creando cuenta...' : 'Crear mi cuenta'}</span>
      </button>

      {/* Pie: ¿Ya tenés cuenta? Iniciá sesión acá */}
      <div className="register-footer text-center mt-4">
        <span className="footer-text">¿Ya tenés cuenta? </span>
        <Link to="/login" className="link-login-direct">
          Iniciá sesión acá
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
