import { Link, useLocation, useNavigate } from 'react-router-dom';

/**
 * Enlaces de navegación del Main Nav.
 * Limpio de iconos decorativos y con soporte de Active State sutil de 2px en dorado.
 */
export const NavbarLinks = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const inicioActivo = pathname === '/' && (!hash || hash === '#inicio');
  const noticiasActivas = pathname === '/noticias' || (pathname === '/' && hash === '#noticias');
  const resolucionesActivas = pathname === '/resoluciones' || (pathname === '/' && hash === '#resoluciones');

  const handleSectionNavigation = (sectionId) => (event) => {
    event.preventDefault();
    onNavigate?.();

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

  return (
    <nav className="main-nav-links" aria-label="Secciones del sitio">
      <ul className="navbar-links-list">
        <li className="navbar-links-item">
          <Link
            className={`navbar-link-item${inicioActivo ? ' is-active' : ''}`}
            to="/#inicio"
            onClick={handleSectionNavigation('inicio')}
            aria-current={inicioActivo ? 'page' : undefined}
          >
            Inicio
          </Link>
        </li>
        <li className="navbar-links-item">
          <Link
            className={`navbar-link-item${noticiasActivas ? ' is-active' : ''}`}
            to="/#noticias"
            onClick={handleSectionNavigation('noticias')}
            aria-current={noticiasActivas ? 'location' : undefined}
          >
            Novedades
          </Link>
        </li>
        <li className="navbar-links-item">
          <Link
            className={`navbar-link-item${resolucionesActivas ? ' is-active' : ''}`}
            to="/#resoluciones"
            onClick={handleSectionNavigation('resoluciones')}
            aria-current={resolucionesActivas ? 'location' : undefined}
          >
            Resoluciones
          </Link>
        </li>
        <li className="navbar-links-item">
          <a
            className="navbar-link-item"
            href="mailto:contacto@upc.edu.ar"
            onClick={onNavigate}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLinks;
