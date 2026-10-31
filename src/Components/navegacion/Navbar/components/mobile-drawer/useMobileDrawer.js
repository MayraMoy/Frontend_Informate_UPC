import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../../../../Context/AppContext.js';
import { scrollToSection } from '../../../../../utils/scrollHelpers.js';

export const useMobileDrawer = (abierto, onClose) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const estaLogueado = Boolean(user);

  const inicioActivo = estaLogueado
    ? pathname === '/'
    : pathname === '/' && (!hash || hash === '#inicio');
  const noticiasActivas = estaLogueado
    ? pathname.startsWith('/noticias')
    : pathname === '/noticias' || (pathname === '/' && hash === '#noticias');
  const resolucionesActivas = estaLogueado
    ? pathname.startsWith('/resoluciones')
    : pathname === '/resoluciones' || (pathname === '/' && hash === '#resoluciones');

  // Bloquear scroll de la página y escuchar Escape al abrir
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [abierto, onClose]);

  const handleSectionNavigation = (sectionId) => (event) => {
    event.preventDefault();
    onClose();

    if (pathname === '/') {
      scrollToSection(sectionId, true);
      navigate(`/#${sectionId}`, { replace: true, preventScrollReset: true });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLoggedNavigation = (to) => () => {
    onClose();
    if (to === '/' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    estaLogueado,
    inicioActivo,
    noticiasActivas,
    resolucionesActivas,
    handleSectionNavigation,
    handleLoggedNavigation,
  };
};

