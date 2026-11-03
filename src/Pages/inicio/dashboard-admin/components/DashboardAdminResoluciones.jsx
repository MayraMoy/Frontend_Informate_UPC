import React from 'react';
import { Link } from 'react-router-dom';
import { formatearFechaCorta } from '../utils/dashboardHelpers';

export const DashboardAdminResoluciones = ({ resoluciones = [], cargando }) => {
  return (
    <div className="dashboard-admin__bloque-card">
      <div className="dashboard-admin__bloque-cabecera">
        <div className="dashboard-admin__bloque-titulo-wrap">
          <h2 className="dashboard-admin__bloque-titulo">Resoluciones institucionales recientes</h2>
        </div>
        <Link to="/resoluciones" className="dashboard-admin__enlace-ver-mas">
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
        ) : resoluciones.length === 0 ? (
          <div className="dashboard-admin__vacio-inbox">
            <p className="dashboard-admin__vacio-texto">
              No hay resoluciones registradas actualmente en el sistema.
            </p>
            <Link to="/resoluciones/crear" className="dashboard-admin__vacio-enlace">
              Cargar primera resolución
            </Link>
          </div>
        ) : (
          <ul className="dashboard-admin__lista-resoluciones" role="list">
            {resoluciones.map((res) => {
              const id = res.idResolucion || res.id;
              const numero = res.numeroResolucion || `RES-${id}`;
              const fecha = formatearFechaCorta(res.fechaEmision || res.fechaCreacion || res.fecha);
              const estado = String(res.estado || 'PUBLICADA').toUpperCase();

              return (
                <li key={id} className="dashboard-admin__item-resolucion">
                  <div className="dashboard-admin__resolucion-info">
                    <div className="dashboard-admin__resolucion-meta">
                      <span className="dashboard-admin__codigo-resolucion">{numero}</span>
                      <span className="dashboard-admin__item-separador">•</span>
                      <span className="dashboard-admin__item-fecha">{fecha}</span>
                      <span className={`dashboard-admin__badge-estado-res dashboard-admin__badge-estado-res--${estado.toLowerCase()}`}>
                        {estado}
                      </span>
                    </div>

                    <h3 className="dashboard-admin__resolucion-titulo">
                      {res.titulo || 'Resolución sin título'}
                    </h3>
                  </div>

                  <Link
                    to="/resoluciones"
                    className="dashboard-admin__btn-ver-res"
                    title={`Ver resolución ${numero}`}
                  >
                    Consultar
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardAdminResoluciones;

