import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ForoLogo from '../../../shared/ForoLogo.jsx';

/**
 * Menú lateral deslizante (Drawer) para dispositivos móviles y tablets (< 1024px).
 * Incluye secciones principales ordenadas y accesos institucionales en la parte inferior.
 */
export const MobileDrawer = ({ abierto, onClose }) => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const inicioActivo = pathname === '/' && (!hash || hash === '#inicio');
  const noticiasActivas = pathname === '/noticias' || (pathname === '/' && hash === '#noticias');
  const resolucionesActivas = pathname === '/resoluciones' || (pathname === '/' && hash === '#resoluciones');

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
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector('.app-navbar')?.getBoundingClientRect().height ?? 0;
        window.scrollTo({
          top: window.scrollY + section.getBoundingClientRect().top - navbarHeight,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      }
    }

    navigate(`/#${sectionId}`, { preventScrollReset: true });
  };

  if (!abierto) return null;

  return (
    <div
      className="navbar-drawer-wrapper"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación móvil"
    >
      {/* Fondo oscuro con difuminado */}
      <div
        className="navbar-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Drawer lateral */}
      <div className="navbar-drawer-content">
        {/* Cabecera del Drawer */}
        <div className="navbar-drawer-header">
          <Link to="/" onClick={onClose} aria-label="Foro UPC, inicio">
            <ForoLogo width={74} />
          </Link>
          <button
            type="button"
            className="navbar-drawer-close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Secciones de navegación principales */}
        <div className="navbar-drawer-body">
          <span className="drawer-section-label">Navegación</span>
          <nav className="drawer-main-nav" aria-label="Navegación principal">
            <ul className="drawer-nav-list">
              <li>
                <Link
                  className={`drawer-nav-link${inicioActivo ? ' is-active' : ''}`}
                  to="/#inicio"
                  onClick={handleSectionNavigation('inicio')}
                >
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`drawer-nav-link${noticiasActivas ? ' is-active' : ''}`}
                  to="/#noticias"
                  onClick={handleSectionNavigation('noticias')}
                >
                  <span>Novedades</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`drawer-nav-link${resolucionesActivas ? ' is-active' : ''}`}
                  to="/#resoluciones"
                  onClick={handleSectionNavigation('resoluciones')}
                >
                  <span>Resoluciones</span>
                </Link>
              </li>
              <li>
                <a
                  className="drawer-nav-link"
                  href="mailto:contacto@upc.edu.ar"
                  onClick={onClose}
                >
                  <span>Contacto</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;

