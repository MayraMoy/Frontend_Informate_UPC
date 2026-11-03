import React from 'react';
import { Link } from 'react-router-dom';
import {
  formatearFechaCorta,
  extraerNombreAutor,
} from '../utils/dashboardHelpers';

export const DashboardAdminPendientes = ({ noticias = [], cargando }) => {
  return (
    <div className="dashboard-admin__bloque-card">
      <div className="dashboard-admin__bloque-cabecera">
        <div className="dashboard-admin__bloque-titulo-wrap">
          <h2 className="dashboard-admin__bloque-titulo">Novedades pendientes de revisión</h2>
          <span className="dashboard-admin__bloque-contador">
            {cargando ? '...' : noticias.length}
          </span>
        </div>
        <Link to="/noticias/pendientes" className="dashboard-admin__enlace-ver-mas">
          Ver todas
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      <div className="dashboard-admin__bloque-cuerpo">
        {cargando ? (
          <div className="dashboard-admin__lista-skeletons">
            {[1, 2, 3].map((n) => (
              <div key={n} className="dashboard-admin__item-skeleton" />
            ))}
          </div>
        ) : noticias.length === 0 ? (
          <div className="dashboard-admin__vacio-inbox">
            <div className="dashboard-admin__vacio-icono">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="dashboard-admin__vacio-texto">
              Bandeja al día. No tenés novedades pendientes de revisión en este momento.
            </p>
            <Link to="/noticias/crear" className="dashboard-admin__vacio-enlace">
              Redactar nueva noticia
            </Link>
          </div>
        ) : (
          <ul className="dashboard-admin__lista-pendientes" role="list">
            {noticias.map((item) => {
              const autor = extraerNombreAutor(item);
              const fecha = formatearFechaCorta(
                item.fechaPublicacion || item.fechaCreacion || item.fechaActualizacion || item.fecha
              );

              return (
                <li key={item.id} className="dashboard-admin__item-pendiente">
                  <div className="dashboard-admin__item-info">
                    <Link
                      to={`/noticias/editar/${item.id}`}
                      state={{ noticia: item }}
                      className="dashboard-admin__item-titulo"
                      title={item.titulo}
                    >
                      {item.titulo || 'Sin título especificado'}
                    </Link>

                    <div className="dashboard-admin__item-meta">
                      <span className="dashboard-admin__item-fecha">{fecha}</span>
                      <span className="dashboard-admin__item-separador">•</span>
                      <span className="dashboard-admin__item-autor">{autor}</span>
                    </div>
                  </div>

                  <div className="dashboard-admin__item-acciones">
                    <Link
                      to={`/noticias/editar/${item.id}`}
                      state={{ noticia: item }}
                      className="dashboard-admin__btn-revisar"
                    >
                      Revisar
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardAdminPendientes;

