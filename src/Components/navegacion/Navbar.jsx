import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ForoLogo from '../shared/ForoLogo.jsx';

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const inicioActivo = pathname === '/' && (!hash || hash === '#inicio');
  const noticiasActivas = pathname === '/noticias' || (pathname === '/' && hash === '#noticias');
  const resolucionesActivas = pathname === '/resoluciones' || (pathname === '/' && hash === '#resoluciones');

  const handleSectionNavigation = (sectionId) => (event) => {
    event.preventDefault();
    setMenuAbierto(false);

    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector('.app-navbar')?.getBoundingClientRect().height ?? 0;
        window.scrollTo({
          top: window.scrollY + section.getBoundingClientRect().top - navbarHeight,
          behavior: 'instant',
        });
      }
    }

    navigate(`/#${sectionId}`, { preventScrollReset: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top app-navbar" aria-label="Navegación principal">
      <div className="container">
        <Link className="navbar-brand me-auto me-lg-5" to="/" aria-label="Foro UPC, inicio">
          <ForoLogo width={130} />
        </Link>

        {/* Botón Toggler para Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span className="navbar-toggler-icon" aria-hidden="true"></span>
        </button>

        {/* Links de Navegación */}
        <div className={`collapse navbar-collapse${menuAbierto ? ' show' : ''}`} id="navbarContent">
          <ul className="navbar-links navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/#inicio" onClick={handleSectionNavigation('inicio')} aria-current={inicioActivo ? 'page' : undefined}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/#noticias" onClick={handleSectionNavigation('noticias')} aria-current={noticiasActivas ? 'location' : undefined}>Noticias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/#resoluciones" onClick={handleSectionNavigation('resoluciones')} aria-current={resolucionesActivas ? 'location' : undefined}>Resoluciones</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 text-dark" href="mailto:soporte@upc.edu.ar">Contacto</a>
            </li>
          </ul>

          {/* Botones de acción */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn btn-outline-custom rounded-pill px-4 py-2 fw-medium">
              Iniciar Sesion
            </Link>
            <Link to="/registro" className="btn btn-warning-custom rounded-pill px-4 py-2 fw-medium">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};