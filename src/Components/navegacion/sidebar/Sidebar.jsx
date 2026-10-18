import { NavLink } from 'react-router-dom';
import { puedeAccederGestion } from '../../../hooks/useRoles.js';
import { sidebarGroups, sidebarHomeItem } from './data/sidebarItems.js';
import SidebarGroup from './components/SidebarGroup.jsx';
import SidebarIcon from './components/SidebarIcon.jsx';
import useSidebarMenu from './hooks/useSidebarMenu.js';
import '../styles/Sidebar.css';

export const Sidebar = ({ user }) => {
  const { grupoAbierto, alternarGrupo } = useSidebarMenu();

  if (!puedeAccederGestion(user)) return null;

  return (
    <aside className="gestion-sidebar" aria-label="Menú de gestión">
      <nav aria-label="Secciones de gestión">
        <NavLink
          to={sidebarHomeItem.ruta}
          className={({ isActive }) => `gestion-sidebar-link${isActive ? ' is-active' : ''}`}
        >
          <span className="gestion-sidebar-icon"><SidebarIcon name={sidebarHomeItem.icono} /></span>
          <span>{sidebarHomeItem.etiqueta}</span>
        </NavLink>

        {sidebarGroups.map((group) => (
          <SidebarGroup
            key={group.id}
            group={group}
            isOpen={grupoAbierto === group.id}
            onToggle={() => alternarGrupo(group.id)}
          />
        ))}
      </nav>
    </aside>
  );
};
