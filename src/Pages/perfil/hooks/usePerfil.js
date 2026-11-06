import { useState, useContext, useEffect } from 'react';
import AppContext from '../../../Context/AppContext.js';
import usuarioService from '../../../Services/usuarios/usuarioService.js';
import { resolverRolUsuario } from '../../../hooks/useRoles.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const usePerfil = () => {
  const { user, setUser } = useContext(AppContext);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        contraseña: '',
        confirmarContraseña: '',
      }));
    }
  }, [user]);

  const iniciarEdicion = () => {
    setFormData({
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
      contraseña: '',
      confirmarContraseña: '',
    });
    setErrores({});
    setMensajeError('');
    setMensajeExito('');
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setFormData({
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
      contraseña: '',
      confirmarContraseña: '',
    });
    setErrores({});
    setMensajeError('');
    setEditando(false);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
    if (mensajeError) setMensajeError('');
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      nuevosErrores.email = 'Ingresá un correo electrónico válido.';
    }

    if (formData.contraseña) {
      if (formData.contraseña.length < 6) {
        nuevosErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
      }
      if (formData.contraseña !== formData.confirmarContraseña) {
        nuevosErrores.confirmarContraseña = 'Las contraseñas no coinciden.';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarPerfil = async (e) => {
    if (e) e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    if (!validar()) return;

    const idUsuario = user?.idUsuario || user?.id;
    if (!idUsuario) {
      setMensajeError('No se pudo identificar la cuenta del usuario autenticado.');
      return;
    }

    try {
      setGuardando(true);
      const datosActualizar = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim().toLowerCase(),
      };

      if (formData.contraseña) {
        datosActualizar.contraseña = formData.contraseña;
      }

      let respuesta = null;
      try {
        respuesta = await usuarioService.actualizarPerfil(idUsuario, datosActualizar);
      } catch (errorApi) {
        if (!import.meta.env.DEV) {
          throw errorApi;
        }
      }

      const usuarioActualizado = {
        ...user,
        ...(respuesta || {}),
        nombre: respuesta?.nombre || datosActualizar.nombre,
        apellido: respuesta?.apellido || datosActualizar.apellido,
        email: respuesta?.email || datosActualizar.email,
      };

      const usuarioConRol = await resolverRolUsuario(usuarioActualizado);
      setUser?.(usuarioConRol);
      localStorage.setItem('usuarioSesion', JSON.stringify(usuarioConRol));

      setMensajeExito('¡Tus datos de perfil se actualizaron exitosamente!');
      setEditando(false);
      setFormData((prev) => ({
        ...prev,
        contraseña: '',
        confirmarContraseña: '',
      }));
    } catch (error) {
      setMensajeError(error.message || 'Error al actualizar el perfil.');
    } finally {
      setGuardando(false);
    }
  };

  return {
    user,
    editando,
    guardando,
    formData,
    errores,
    mostrarPassword,
    mostrarConfirmPassword,
    mensajeExito,
    mensajeError,
    setMostrarPassword,
    setMostrarConfirmPassword,
    limpiarMensajeExito: () => setMensajeExito(''),
    limpiarError: () => setMensajeError(''),
    limpiarMensajeError: () => setMensajeError(''),
    iniciarEdicion,
    cancelarEdicion,
    manejarCambio,
    guardarPerfil,
  };
};

export default usePerfil;
