import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../Context/AppContext.js';

const useUserMenu = (onNavigate) => {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const cerrarAlHacerClickAfuera = (event) => {
      if (!menuRef.current?.contains(event.target)) setAbierto(false);
    };
    const cerrarConEscape = (event) => {
      if (event.key === 'Escape') setAbierto(false);
    };

    document.addEventListener('mousedown', cerrarAlHacerClickAfuera);
    document.addEventListener('keydown', cerrarConEscape);
    return () => {
      document.removeEventListener('mousedown', cerrarAlHacerClickAfuera);
      document.removeEventListener('keydown', cerrarConEscape);
    };
  }, []);

  const irAlPerfil = () => {
    setAbierto(false);
    onNavigate?.();
    navigate('/perfil');
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioSesion');
    setUser(null);
    setAbierto(false);
    onNavigate?.();
    navigate('/', { replace: true });
  };

  return { abierto, setAbierto, menuRef, irAlPerfil, cerrarSesion };
};

export default useUserMenu;
