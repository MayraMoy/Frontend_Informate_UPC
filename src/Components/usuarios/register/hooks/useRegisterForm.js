import { useMemo, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../../../../Services/usuarios/usuarioService';
import { resolverRolUsuario } from '../../../../hooks/useRoles';
import AppContext from '../../../../Context/AppContext';
import {
  INITIAL_REGISTER_DATA,
  REGISTER_EMAIL_REGEX,
} from '../data/registerData';
import { evaluatePasswordStrength } from '../utils/passwordStrength';

const useRegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState(INITIAL_REGISTER_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(
    () => evaluatePasswordStrength(formData.password),
    [formData.password],
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.dni.trim()) return setErrorMsg('Por favor, ingresa tu número de DNI.');
    if (!/^\d+$/.test(formData.dni.trim())) return setErrorMsg('El DNI debe contener solo números, sin puntos.');
    if (!formData.nombre.trim()) return setErrorMsg('Por favor, ingresa tu nombre.');
    if (!formData.apellido.trim()) return setErrorMsg('Por favor, ingresa tu apellido.');
    if (!formData.email.trim()) return setErrorMsg('Por favor, ingresa tu correo electrónico.');

    const email = formData.email.trim().toLowerCase();
    if (!REGISTER_EMAIL_REGEX.test(email)) {
      return setErrorMsg('Por favor, ingresa un correo electrónico válido.');
    }
    if (!formData.password) return setErrorMsg('Por favor, ingresa una contraseña.');
    if (formData.password.length < 8) return setErrorMsg('La contraseña debe tener un mínimo de 8 caracteres.');
    if (formData.password.length > 25) return setErrorMsg('La contraseña no puede superar los 25 caracteres.');
    if (!formData.aceptaTerminos) return setErrorMsg('Debes aceptar los Términos y Condiciones para continuar.');

    try {
      setIsSubmitting(true);
      const nuevoUsuarioPayload = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        dni: formData.dni.trim(),
        email,
        contraseña: formData.password,
        estado: 'ACTIVO',
        idRol: '3',
      };

      await usuarioService.registrar(nuevoUsuarioPayload);
      setSuccessMsg('¡Cuenta creada con éxito! Ingresando al portal...');

      // Auto-login para acceder directamente al inicio de estudiante
      try {
        const respuestaLogin = await usuarioService.iniciarSesion(
          email,
          formData.password,
        );
        const usuarioRespuesta = respuestaLogin.usuario ?? respuestaLogin;
        const usuarioLogueado = await resolverRolUsuario(usuarioRespuesta);

        if (respuestaLogin.token) {
          localStorage.setItem('token', respuestaLogin.token);
        }
        setUser?.(usuarioLogueado);
        localStorage.setItem(
          'usuarioSesion',
          JSON.stringify(usuarioLogueado),
        );

        window.setTimeout(() => {
          navigate('/', { replace: true });
        }, 700);
      } catch {
        window.setTimeout(() => {
          navigate('/login', { state: { email, registrado: true } });
        }, 900);
      }
    } catch (error) {
      setErrorMsg(error.message || 'Error al crear la cuenta. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    errorMsg,
    successMsg,
    isSubmitting,
    passwordStrength,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
