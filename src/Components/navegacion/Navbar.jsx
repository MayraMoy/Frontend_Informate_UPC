import { useState } from 'react';
import { Link } from 'react-router-dom';
import ForoLogo from '../shared/ForoLogo.jsx';
import { NavbarLinks } from './NavbarLinks.jsx';
import { NavbarIcon } from './icons/NavbarIcon.jsx';
import './styles/Navbar.css';

export const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg app-navbar" aria-label="Navegación principal">
      <div className="container">
        <Link className="navbar-brand navbar-brand-mark" to="/" aria-label="Foro UPC, inicio">
          <ForoLogo width={76} className="navbar-logo" />
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
          <NavbarLinks onNavigate={() => setMenuAbierto(false)} />

          {/* Botones de acción */}
          <div className="navbar-actions d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link
              to="/login"
              className="btn btn-warning-custom rounded-pill px-4 py-2 fw-medium"
              onClick={() => setMenuAbierto(false)}
            >
              <NavbarIcon name="login" />
              <span>Iniciar sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
