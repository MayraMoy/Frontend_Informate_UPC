import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../../../../Services/usuarios/usuarioService';
import api from '../../../../Services/axiosConfig';
import {
  DEFAULT_CARRERAS,
  INITIAL_REGISTER_DATA,
  REGISTER_EMAIL_REGEX,
} from '../data/registerData';
import { evaluatePasswordStrength } from '../utils/passwordStrength';

const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_REGISTER_DATA);
  const [carreras, setCarreras] = useState(DEFAULT_CARRERAS);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await api.get('/carreras/todos');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCarreras(response.data);
        }
      } catch {
        // Si la API no está disponible, se conserva la lista local.
      }
    };

    fetchCarreras();
  }, []);

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
    if (!formData.email.trim()) return setErrorMsg('Por favor, ingresa tu correo institucional.');

    const email = formData.email.trim().toLowerCase();
    if (!REGISTER_EMAIL_REGEX.test(email)) {
      return setErrorMsg('Debes ingresar un correo institucional de la universidad (@upc.edu.ar).');
    }
    if (!formData.password) return setErrorMsg('Por favor, ingresa una contraseña.');
    if (formData.password.length < 8) return setErrorMsg('La contraseña debe tener un mínimo de 8 caracteres.');
    if (formData.password.length > 25) return setErrorMsg('La contraseña no puede superar los 25 caracteres.');
    if (!formData.carrera) return setErrorMsg('Por favor, selecciona tu carrera.');
    if (!formData.anoCarrera) return setErrorMsg('Por favor, selecciona el año de tu carrera.');
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
        estadoSolicitud: 'APROBADA',
        fechaRegistro: new Date().toISOString(),
        rol: { idRol: 2 },
      };

      await usuarioService.crear(nuevoUsuarioPayload);
      setSuccessMsg('¡Cuenta creada con éxito! Redirigiendo a la confirmación...');
      window.setTimeout(() => {
        navigate('/registro-completado', { state: { email } });
      }, 1000);
    } catch (error) {
      setErrorMsg(error.message || 'Error al crear la cuenta. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    carreras,
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
