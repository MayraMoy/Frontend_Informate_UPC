import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../../../Context/AppContext.js';
import { scrollToSection } from '../../../../utils/scrollHelpers';

/**
 * Enlaces de navegación del Main Nav.
 * Limpio de iconos decorativos y con soporte de Active State sutil de 2px en dorado.
 */
export const NavbarLinks = ({ onNavigate }) => {
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

  const handleSectionNavigation = (sectionId) => (event) => {
    event.preventDefault();
    onNavigate?.();

    if (pathname === '/') {
      scrollToSection(sectionId, true);
      navigate(`/#${sectionId}`, { replace: true, preventScrollReset: true });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLoggedNavigation = (to) => () => {
    onNavigate?.();
    if (to === '/' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="main-nav-links" aria-label="Secciones del sitio">
      <ul className="navbar-links-list">
        <li className="navbar-links-item">
          {estaLogueado ? (
            <Link
              className={`navbar-link-item${inicioActivo ? ' is-active' : ''}`}
              to="/"
              onClick={handleLoggedNavigation('/')}
              aria-current={inicioActivo ? 'page' : undefined}
            >
              Inicio
            </Link>
          ) : (
            <Link
              className={`navbar-link-item${inicioActivo ? ' is-active' : ''}`}
              to="/#inicio"
              onClick={handleSectionNavigation('inicio')}
              aria-current={inicioActivo ? 'page' : undefined}
            >
              Inicio
            </Link>
          )}
        </li>
        <li className="navbar-links-item">
          {estaLogueado ? (
            <Link
              className={`navbar-link-item${noticiasActivas ? ' is-active' : ''}`}
              to="/noticias"
              onClick={handleLoggedNavigation('/noticias')}
              aria-current={noticiasActivas ? 'location' : undefined}
            >
              Novedades
            </Link>
          ) : (
            <Link
              className={`navbar-link-item${noticiasActivas ? ' is-active' : ''}`}
              to="/#noticias"
              onClick={handleSectionNavigation('noticias')}
              aria-current={noticiasActivas ? 'location' : undefined}
            >
              Novedades
            </Link>
          )}
        </li>
        <li className="navbar-links-item">
          {estaLogueado ? (
            <Link
              className={`navbar-link-item${resolucionesActivas ? ' is-active' : ''}`}
              to="/resoluciones"
              onClick={handleLoggedNavigation('/resoluciones')}
              aria-current={resolucionesActivas ? 'location' : undefined}
            >
              Resoluciones
            </Link>
          ) : (
            <Link
              className={`navbar-link-item${resolucionesActivas ? ' is-active' : ''}`}
              to="/#resoluciones"
              onClick={handleSectionNavigation('resoluciones')}
              aria-current={resolucionesActivas ? 'location' : undefined}
            >
              Resoluciones
            </Link>
          )}
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