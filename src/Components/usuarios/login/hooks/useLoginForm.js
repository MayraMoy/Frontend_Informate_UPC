import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import usuarioService from '../../../../Services/usuarios/usuarioService';
import { resolverRolUsuario, tieneRolAdministrador } from '../../../../hooks/useRoles';
import AppContext from '../../../../Context/AppContext';
import { INITIAL_LOGIN_DATA, LOGIN_EMAIL_REGEX, LOGIN_MESSAGES } from '../data/loginData';

const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState(INITIAL_LOGIN_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');

    const email = formData.email.trim();
    if (!email) {
      setErrorMsg(LOGIN_MESSAGES.emailRequired);
      return;
    }
    if (!LOGIN_EMAIL_REGEX.test(email)) {
      setErrorMsg(LOGIN_MESSAGES.emailInvalid);
      return;
    }
    if (!formData.password) {
      setErrorMsg(LOGIN_MESSAGES.passwordRequired);
      return;
    }

    try {
      setIsSubmitting(true);
      const respuestaLogin = await usuarioService.iniciarSesion(
        email,
        formData.password,
      );
      const usuarioRespuesta = respuestaLogin.usuario ?? respuestaLogin;
      const usuarioLogueado = await resolverRolUsuario(usuarioRespuesta);

      // Verificación de cuenta inactiva o suspendida (si el backend responde 200 pero el usuario está inactivo)
      const estadoUsuario = String(
        usuarioLogueado?.estado ||
        usuarioRespuesta?.estado ||
        ''
      ).toUpperCase();

      if (
        estadoUsuario === 'INACTIVO' ||
        usuarioLogueado?.activo === false ||
        usuarioRespuesta?.activo === false
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioSesion');
        setUser?.(null);
        setErrorMsg('Tu cuenta ha sido suspendida. Por favor, comunícate con la administración de la Universidad.');
        return;
      }

      // Guardar el JWT para que Axios lo envíe en las próximas peticiones.
      if (respuestaLogin.token) {
        localStorage.setItem('token', respuestaLogin.token);
      } else {
        throw new Error('El servidor no devolvió el token de autenticación.');
      }

      // Guardar los datos del usuario.
      setUser?.(usuarioLogueado);
      localStorage.setItem(
        'usuarioSesion',
        JSON.stringify(usuarioLogueado),
      );

      const destino = location.state?.from;
      const rutaDestino = tieneRolAdministrador(usuarioLogueado)
        ? '/dashboard-admin'
        : destino
          ? `${destino.pathname}${destino.search}${destino.hash}`
          : '/';
      navigate(rutaDestino, { replace: true });
    } catch (error) {
      const msgMinuscula = String(error.message || '').toLowerCase();
      const dataRaw = error.response?.data;
      const dataString = typeof dataRaw === 'string'
        ? dataRaw.toLowerCase()
        : JSON.stringify(dataRaw || '').toLowerCase();

      // 1. Si la respuesta del backend indica explícitamente cuenta inactiva o suspendida:
      if (
        msgMinuscula.includes('inactiv') ||
        msgMinuscula.includes('suspend') ||
        msgMinuscula.includes('desactiv') ||
        msgMinuscula.includes('bloquead') ||
        dataString.includes('inactiv') ||
        dataString.includes('suspend') ||
        dataString.includes('desactiv') ||
        dataString.includes('bloquead')
      ) {
        setErrorMsg('Tu cuenta ha sido suspendida. Por favor, comunícate con la administración de la Universidad.');
        return;
      }

      // 2. Si el backend responde con error genérico (ej. "credenciales inválidas"),
      // verificamos si la cuenta con este correo se encuentra en estado INACTIVO:
      try {
        const todosLosUsuarios = await usuarioService.obtenerTodos();
        if (Array.isArray(todosLosUsuarios)) {
          const usuarioEncontrado = todosLosUsuarios.find(
            (u) => String(u.email || '').trim().toLowerCase() === email.toLowerCase()
          );
          if (usuarioEncontrado) {
            const estadoEncontrado = String(usuarioEncontrado.estado || '').toUpperCase();
            if (estadoEncontrado === 'INACTIVO' || usuarioEncontrado.activo === false) {
              setErrorMsg('Tu cuenta ha sido suspendida. Por favor, comunícate con la administración de la Universidad.');
              return;
            }
          }
        }
      } catch {
        // Fallback silencioso si obtenerTodos requiere autorización
      }

      setErrorMsg(error.message || LOGIN_MESSAGES.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCredentialsError = errorMsg && (
    errorMsg.includes('no son correctos') ||
    errorMsg.includes('inválidas') ||
    errorMsg.includes('invalidas')
  );
  const isSuspendedError = errorMsg && errorMsg.includes('suspendida');
  const isEmailError = errorMsg && (
    isCredentialsError || isSuspendedError || errorMsg.includes('correo') || errorMsg.includes('Correo')
  );
  const isPasswordError = errorMsg && (
    isCredentialsError || errorMsg.includes('contraseña') || errorMsg.includes('Contraseña')
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    errorMsg,
    isSubmitting,
    isEmailError,
    isPasswordError,
  };
};

export default useLoginForm;
