import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavbarIcon } from './icons/NavbarIcon.jsx';

export const NavbarLinks = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const inicioActivo = pathname === '/' && (!hash || hash === '#inicio');
  const noticiasActivas = pathname === '/noticias' || (pathname === '/' && hash === '#noticias');
  const resolucionesActivas = pathname === '/resoluciones' || (pathname === '/' && hash === '#resoluciones');

  const handleSectionNavigation = (sectionId) => (event) => {
    event.preventDefault();
    onNavigate();

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
    <ul className="navbar-links navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
      <li className="nav-item">
        <Link className="nav-link px-3 text-dark" to="/#inicio" onClick={handleSectionNavigation('inicio')} aria-current={inicioActivo ? 'page' : undefined}>
          <NavbarIcon name="inicio" /><span>Inicio</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link px-3 text-dark" to="/#noticias" onClick={handleSectionNavigation('noticias')} aria-current={noticiasActivas ? 'location' : undefined}>
          <NavbarIcon name="noticias" /><span>Noticias</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link px-3 text-dark" to="/#resoluciones" onClick={handleSectionNavigation('resoluciones')} aria-current={resolucionesActivas ? 'location' : undefined}>
          <NavbarIcon name="resoluciones" /><span>Resoluciones</span>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link px-3 text-dark" href="mailto:soporte@upc.edu.ar" onClick={onNavigate}>
          <NavbarIcon name="contacto" /><span>Contacto</span>
        </a>
      </li>
    </ul>
  );
};
