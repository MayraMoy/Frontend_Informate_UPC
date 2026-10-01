import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar institucional oficial de Informate UPC según diseño de Figma / Wireframe.
 * Muestra logo, enlaces de navegación (Inicio, Noticias, Resoluciones, Contacto)
 * y botones de acción (Iniciar Sesión, Registrarse).
 */
export const Navbar = () => {
  return (
    <header className="navbar-institucional-header">
      <div className="navbar-container">
        {/* Logo Institucional */}
        <div className="navbar-logo-area">
          <NavLink to="/" className="navbar-brand-logo">
            <span className="logo-badge-upc">UPC</span>
            <span className="logo-text-foro d-none d-sm-inline">Informate UPC</span>
          </NavLink>
        </div>

        {/* Links de Navegación */}
        <nav className="navbar-links" aria-label="Menú principal">
          <NavLink to="/" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Inicio
          </NavLink>
          <NavLink to="/noticias" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Noticias
          </NavLink>
          <NavLink to="/resoluciones" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Resoluciones
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Contacto
          </NavLink>
        </nav>

        {/* Botones de Autenticación */}
        <div className="navbar-auth-actions">
          <NavLink to="/login" className="btn-nav-login">
            Iniciar Sesion
          </NavLink>
          <NavLink to="/registro" className="btn-nav-register">
            Registrarse
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
