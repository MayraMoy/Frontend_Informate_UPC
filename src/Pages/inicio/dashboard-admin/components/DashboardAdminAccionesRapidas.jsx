import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardAdminAccionesRapidas = ({ onAbrirCategorias }) => {
  return (
    <section className="dashboard-admin__seccion-acciones" aria-label="Acciones rápidas del administrador">
      <div className="dashboard-admin__acciones-contenedor">
        <span className="dashboard-admin__acciones-titulo">Acciones rápidas:</span>

        <div className="dashboard-admin__acciones-lista">
          {/* 1. Redactar noticia */}
          <Link to="/noticias/crear" className="dashboard-admin__btn-accion dashboard-admin__btn-accion--primario">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Redactar noticia</span>
          </Link>

          {/* 2. Cargar resolución */}
          <Link to="/resoluciones/crear" className="dashboard-admin__btn-accion dashboard-admin__btn-accion--secundario">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <span>Cargar resolución</span>
          </Link>

          {/* 3. Gestionar categorías */}
          <button
            type="button"
            className="dashboard-admin__btn-accion dashboard-admin__btn-accion--secundario"
            onClick={onAbrirCategorias}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <span>Gestionar categorías</span>
          </button>

          {/* 4. Ver pendientes */}
          <Link to="/noticias/pendientes" className="dashboard-admin__btn-accion dashboard-admin__btn-accion--secundario">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Ver pendientes</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardAdminAccionesRapidas;

