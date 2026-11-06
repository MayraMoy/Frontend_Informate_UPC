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
      if (
        import.meta.env.DEV &&
        (error.message?.includes('servidor') || error.code === 'ERR_NETWORK' || error.message === 'Network Error')
      ) {
        // En entorno de desarrollo, si el backend local no está levantado, se habilita sesión de prueba
        const esAdmin = email.toLowerCase().includes('admin');
        const tokenDemo = `header.${btoa(JSON.stringify({ sub: email, exp: Math.floor(Date.now() / 1000) + 86400 * 30 }))}.signature`;
        const usuarioDemo = {
          idUsuario: esAdmin ? 99 : 1,
          id: esAdmin ? 99 : 1,
          nombre: esAdmin ? 'Administrador' : 'Juan',
          apellido: esAdmin ? 'Institucional' : 'Larcher',
          email: email,
          dni: '42123456',
          rol: esAdmin ? 'ADMINISTRADOR' : 'ESTUDIANTE',
          nombreRol: esAdmin ? 'ADMINISTRADOR' : 'ESTUDIANTE',
          ultimoAcceso: new Date().toISOString(),
        };

        localStorage.setItem('token', tokenDemo);
        localStorage.setItem('usuarioSesion', JSON.stringify(usuarioDemo));
        setUser?.(usuarioDemo);

        const destino = location.state?.from;
        const rutaDestino = tieneRolAdministrador(usuarioDemo)
          ? '/dashboard-admin'
          : destino
            ? `${destino.pathname}${destino.search}${destino.hash}`
            : '/perfil';
        navigate(rutaDestino, { replace: true });
        return;
      }

      setErrorMsg(error.message || LOGIN_MESSAGES.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCredentialsError = errorMsg && errorMsg.includes('no son correctos');
  const isEmailError = errorMsg && (
    isCredentialsError || errorMsg.includes('correo') || errorMsg.includes('Correo')
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
