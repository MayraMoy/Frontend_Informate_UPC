import { NavbarIcon } from '../../../Components/navegacion/Navbar/icons/NavbarIcon.jsx';
import { obtenerNombreUsuario, obtenerRolesUsuario } from '../utils/perfilUsuario.js';
import useUserMenu from '../hooks/useUserMenu.js';
import '../styles/UserMenu.css';

export const UserMenu = ({ user, onNavigate }) => {
  const { abierto, setAbierto, menuRef, irAlPerfil, cerrarSesion } = useUserMenu(onNavigate);
  const nombre = obtenerNombreUsuario(user);
  const rol = obtenerRolesUsuario(user);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        aria-expanded={abierto}
        aria-haspopup="menu"
        onClick={() => setAbierto((value) => !value)}
      >
        <span className="user-menu-avatar" aria-hidden="true">{nombre.charAt(0).toUpperCase()}</span>
        <span className="user-menu-identity">
          <span className="user-menu-name">{nombre}</span>
          <span className="user-menu-role">{rol}</span>
        </span>
        <svg
          className={`user-menu-chevron${abierto ? ' is-open' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
        </svg>
      </button>
      {abierto && (
        <div className="user-menu-dropdown" role="menu">
          <button type="button" role="menuitem" onClick={irAlPerfil}>
            <span className="user-menu-item-icon"><NavbarIcon name="perfil" /></span>
            Ver mi perfil
          </button>
          <button type="button" role="menuitem" onClick={cerrarSesion}>
            <span className="user-menu-item-icon"><NavbarIcon name="logout" /></span>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
