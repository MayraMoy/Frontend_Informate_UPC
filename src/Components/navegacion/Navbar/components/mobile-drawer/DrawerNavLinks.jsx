import React from 'react';
import { Link } from 'react-router-dom';

export const DrawerNavLinks = ({
  estaLogueado,
  inicioActivo,
  noticiasActivas,
  resolucionesActivas,
  handleSectionNavigation,
  handleLoggedNavigation,
  onClose,
}) => {
  return (
    <ul className="drawer-nav-list">
      <li>
        {estaLogueado ? (
          <Link
            className={`drawer-nav-link${inicioActivo ? ' is-active' : ''}`}
            to="/"
            onClick={handleLoggedNavigation('/')}
          >
            <span>Inicio</span>
          </Link>
        ) : (
          <Link
            className={`drawer-nav-link${inicioActivo ? ' is-active' : ''}`}
            to="/#inicio"
            onClick={handleSectionNavigation('inicio')}
          >
            <span>Inicio</span>
          </Link>
        )}
      </li>
      <li>
        {estaLogueado ? (
          <Link
            className={`drawer-nav-link${noticiasActivas ? ' is-active' : ''}`}
            to="/noticias"
            onClick={handleLoggedNavigation('/noticias')}
          >
            <span>Novedades</span>
          </Link>
        ) : (
          <Link
            className={`drawer-nav-link${noticiasActivas ? ' is-active' : ''}`}
            to="/#noticias"
            onClick={handleSectionNavigation('noticias')}
          >
            <span>Novedades</span>
          </Link>
        )}
      </li>
      <li>
        {estaLogueado ? (
          <Link
            className={`drawer-nav-link${resolucionesActivas ? ' is-active' : ''}`}
            to="/resoluciones"
            onClick={handleLoggedNavigation('/resoluciones')}
          >
            <span>Resoluciones</span>
          </Link>
        ) : (
          <Link
            className={`drawer-nav-link${resolucionesActivas ? ' is-active' : ''}`}
            to="/#resoluciones"
            onClick={handleSectionNavigation('resoluciones')}
          >
            <span>Resoluciones</span>
          </Link>
        )}
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
  );
};

