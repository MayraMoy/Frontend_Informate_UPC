import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardAdminResumenLateral = ({
  categorias = [],
  cargando,
  onAbrirCategorias,
}) => {
  return (
    <aside className="dashboard-admin__lateral" aria-label="Información complementaria y accesos del sistema">
      {/* 1. Categorías del portal */}
      <div className="dashboard-admin__bloque-card dashboard-admin__bloque-card--lateral">
        <div className="dashboard-admin__bloque-cabecera">
          <div className="dashboard-admin__bloque-titulo-wrap">
            <h2 className="dashboard-admin__bloque-titulo">Categorías temáticas</h2>
            <span className="dashboard-admin__bloque-contador">
              {cargando ? '...' : categorias.length}
            </span>
          </div>
        </div>

        <div className="dashboard-admin__bloque-cuerpo">
          <p className="dashboard-admin__lateral-descripcion">
            Clasificación oficial utilizada para indexar y filtrar las novedades institucionales.
          </p>

          {cargando ? (
            <div className="dashboard-admin__chips-skeletons">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="dashboard-admin__chip-skeleton" />
              ))}
            </div>
          ) : categorias.length === 0 ? (
            <p className="dashboard-admin__vacio-subtexto">No hay categorías configuradas.</p>
          ) : (
            <div className="dashboard-admin__chips-categorias">
              {categorias.slice(0, 8).map((cat) => (
                <span key={cat.id || cat.nombre} className="dashboard-admin__chip-tag">
                  {cat.nombre}
                </span>
              ))}
              {categorias.length > 8 && (
                <span className="dashboard-admin__chip-mas">
                  +{categorias.length - 8} más
                </span>
              )}
            </div>
          )}

          <button
            type="button"
            className="dashboard-admin__btn-lateral-accion"
            onClick={onAbrirCategorias}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Administrar categorías</span>
          </button>
        </div>
      </div>

      {/* 2. Control de Usuarios y Roles */}
      <div className="dashboard-admin__bloque-card dashboard-admin__bloque-card--lateral">
        <div className="dashboard-admin__bloque-cabecera">
          <div className="dashboard-admin__bloque-titulo-wrap">
            <h2 className="dashboard-admin__bloque-titulo">Usuarios y roles</h2>
          </div>
        </div>

        <div className="dashboard-admin__bloque-cuerpo">
          <p className="dashboard-admin__lateral-descripcion">
            Supervisá las cuentas de estudiantes, docentes y editores institucionales con acceso al portal.
          </p>

          <Link to="/usuarios" className="dashboard-admin__btn-lateral-accion dashboard-admin__btn-lateral-accion--usuarios">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Gestionar usuarios</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardAdminResumenLateral;

