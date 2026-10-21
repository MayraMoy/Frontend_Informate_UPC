import { NavLink } from 'react-router-dom';
import SidebarIcon from './SidebarIcon.jsx';

const SidebarGroup = ({ group, isOpen, onToggle }) => {
  const submenuId = `gestion-submenu-${group.id}`;

  return (
    <section className="gestion-sidebar-group">
      <button
        type="button"
        className="gestion-sidebar-link gestion-sidebar-group-toggle"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={onToggle}
      >
        <span className="gestion-sidebar-icon"><SidebarIcon name={group.icono} /></span>
        <span>{group.etiqueta}</span>
        <svg className={`gestion-sidebar-chevron${isOpen ? ' is-open' : ''}`} viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      {isOpen && (
        <ul className="gestion-sidebar-submenu" id={submenuId}>
          {group.opciones.map((option) => (
            <li key={option.ruta}>
              <NavLink
                to={option.ruta}
                end
                className={({ isActive }) => `gestion-sidebar-sublink${isActive ? ' is-active' : ''}`}
              >
                {option.etiqueta}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SidebarGroup;
