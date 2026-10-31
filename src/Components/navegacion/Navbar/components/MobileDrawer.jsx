import React from 'react';
import { useMobileDrawer } from './mobile-drawer/useMobileDrawer.js';
import { DrawerHeader } from './mobile-drawer/DrawerHeader.jsx';
import { DrawerNavLinks } from './mobile-drawer/DrawerNavLinks.jsx';

/**
 * Menú lateral deslizante (Drawer) para dispositivos móviles y tablets (< 1024px).
 * Incluye secciones principales ordenadas y accesos institucionales en la parte inferior.
 */
export const MobileDrawer = ({ abierto, onClose }) => {
  const {
    estaLogueado,
    inicioActivo,
    noticiasActivas,
    resolucionesActivas,
    handleSectionNavigation,
    handleLoggedNavigation,
  } = useMobileDrawer(abierto, onClose);

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
        <DrawerHeader onClose={onClose} />

        <div className="navbar-drawer-body">
          <span className="drawer-section-label">Navegación</span>
          <nav className="drawer-main-nav" aria-label="Navegación principal">
            <DrawerNavLinks
              estaLogueado={estaLogueado}
              inicioActivo={inicioActivo}
              noticiasActivas={noticiasActivas}
              resolucionesActivas={resolucionesActivas}
              handleSectionNavigation={handleSectionNavigation}
              handleLoggedNavigation={handleLoggedNavigation}
              onClose={onClose}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
