import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardAdminKpis = ({ metricas, cargando }) => {
  return (
    <section className="dashboard-admin__kpis-grid" aria-label="Indicadores clave de gestión">
      {/* 1. Novedades en revisión */}
      <Link to="/noticias/pendientes" className="dashboard-admin__kpi-card dashboard-admin__kpi-card--alerta">
        <div className="dashboard-admin__kpi-top">
          <span className="dashboard-admin__kpi-etiqueta">Novedades en revisión</span>
          <div className="dashboard-admin__kpi-icono dashboard-admin__kpi-icono--alerta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
        <div className="dashboard-admin__kpi-cuerpo">
          {cargando ? (
            <div className="dashboard-admin__kpi-skeleton" />
          ) : (
            <span className="dashboard-admin__kpi-valor">{metricas.noticiasPendientes}</span>
          )}
          <span className={`dashboard-admin__kpi-estado ${metricas.noticiasPendientes > 0 ? 'dashboard-admin__kpi-estado--aviso' : 'dashboard-admin__kpi-estado--exito'}`}>
            {metricas.noticiasPendientes > 0 ? 'Requiere moderación' : 'Todo al día'}
          </span>
        </div>
      </Link>

      {/* 2. Noticias publicadas */}
      <Link to="/noticias/ver" className="dashboard-admin__kpi-card">
        <div className="dashboard-admin__kpi-top">
          <span className="dashboard-admin__kpi-etiqueta">Noticias publicadas</span>
          <div className="dashboard-admin__kpi-icono dashboard-admin__kpi-icono--info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
          </div>
        </div>
        <div className="dashboard-admin__kpi-cuerpo">
          {cargando ? (
            <div className="dashboard-admin__kpi-skeleton" />
          ) : (
            <span className="dashboard-admin__kpi-valor">{metricas.noticiasPublicadas}</span>
          )}
          <span className="dashboard-admin__kpi-estado dashboard-admin__kpi-estado--neutro">
            En el portal institucional
          </span>
        </div>
      </Link>

      {/* 3. Resoluciones académicas */}
      <Link to="/resoluciones" className="dashboard-admin__kpi-card">
        <div className="dashboard-admin__kpi-top">
          <span className="dashboard-admin__kpi-etiqueta">Resoluciones</span>
          <div className="dashboard-admin__kpi-icono dashboard-admin__kpi-icono--resolucion">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        </div>
        <div className="dashboard-admin__kpi-cuerpo">
          {cargando ? (
            <div className="dashboard-admin__kpi-skeleton" />
          ) : (
            <span className="dashboard-admin__kpi-valor">{metricas.resolucionesVigentes}</span>
          )}
          <span className="dashboard-admin__kpi-estado dashboard-admin__kpi-estado--neutro">
            {metricas.resolucionesPendientes > 0
              ? `${metricas.resolucionesPendientes} pendientes de aprobación`
              : 'Registradas en sistema'}
          </span>
        </div>
      </Link>

      {/* 4. Comentarios de estudiantes pendientes */}
      <Link to="/resoluciones/comentarios-pendientes" className="dashboard-admin__kpi-card">
        <div className="dashboard-admin__kpi-top">
          <span className="dashboard-admin__kpi-etiqueta">Comentarios pendientes</span>
          <div className="dashboard-admin__kpi-icono dashboard-admin__kpi-icono--comentarios">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>
        <div className="dashboard-admin__kpi-cuerpo">
          {cargando ? (
            <div className="dashboard-admin__kpi-skeleton" />
          ) : (
            <span className="dashboard-admin__kpi-valor">{metricas.comentariosPendientes}</span>
          )}
          <span className={`dashboard-admin__kpi-estado ${metricas.comentariosPendientes > 0 ? 'dashboard-admin__kpi-estado--aviso' : 'dashboard-admin__kpi-estado--exito'}`}>
            {metricas.comentariosPendientes > 0 ? 'Aguardando revisión' : 'Sin comentarios pendientes'}
          </span>
        </div>
      </Link>
    </section>
  );
};

export default DashboardAdminKpis;

