import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ForoLogo from '../../shared/ForoLogo.jsx';
import { NavbarLinks } from './components/NavbarLinks.jsx';
import { MobileDrawer } from './components/MobileDrawer.jsx';
import { NavbarIcon } from './icons/NavbarIcon.jsx';
import { UserMenu } from '../../../Pages/perfil/components/UserMenu.jsx';
import AppContext from '../../../Context/AppContext.js';
import './styles/Navbar.css';

/**
 * Navbar institucional para Foro UPC.
 * Menú principal limpio y despejado, sin iconos decorativos, con estado activo
 * en línea inferior dorada (#E89D00), botón CTA cápsula siempre visible
 * y Drawer lateral responsivo en pantallas pequeñas (< 1024px).
 */
export const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user } = useContext(AppContext);

  return (
    <header className="app-header-sticky app-navbar">
      <nav className="app-main-nav" aria-label="Navegación principal">
        <div className="main-nav-container">
          {/* Logotipo Foro UPC */}
          <Link className="main-nav-brand" to="/" aria-label="Foro UPC, inicio">
            <ForoLogo width={76} className="navbar-logo" />
          </Link>

          {/* Enlaces de Navegación de Escritorio (>= 1024px) */}
          <div className="main-nav-desktop-links">
            <NavbarLinks />
          </div>

          {/* Bloque de Acciones: Botón Iniciar sesión (o Perfil) y Hamburguesa en mobile */}
          <div className="main-nav-actions">
            {user ? (
              <UserMenu user={user} onNavigate={() => setMenuAbierto(false)} />
            ) : (
              <Link
                to="/login"
                className="btn-main-cta"
                onClick={() => setMenuAbierto(false)}
                aria-label="Iniciar sesión"
              >
                <NavbarIcon name="login" />
                <span>Iniciar sesión</span>
              </Link>
            )}

            {/* Botón de Menú Hamburguesa (☰) para pantallas < 1024px */}
            <button
              className="navbar-hamburger-btn"
              type="button"
              aria-controls="navbarDrawer"
              aria-expanded={menuAbierto}
              aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              onClick={() => setMenuAbierto((abierto) => !abierto)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menú lateral (Drawer) para dispositivos móviles / tablets (< 1024px) */}
      <MobileDrawer
        abierto={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      />
    </header>
  );
};

export default Navbar;
