import React from 'react';
import {
  formatearFecha,
  obtenerAutor,
  obtenerThumbnail,
  obtenerExtracto,
  obtenerNombreCategoria,
} from '../utils/pendientesHelpers';
import PendientesEstadoBadge from './PendientesEstadoBadge';
import PendientesAcciones from './PendientesAcciones';

export const PendientesFila = ({
  noticia,
  categorias,
  accionEnProgreso,
  onPrevisualizar,
  onPublicar,
  onCambiarEstado,
  onEliminar,
}) => {
  const thumbnail = obtenerThumbnail(noticia);
  const autor = obtenerAutor(noticia);
  const fecha = formatearFecha(noticia.fechaPublicacion || noticia.fecha || noticia.createdAt);
  const categoria = obtenerNombreCategoria(noticia, categorias);
  const extracto = obtenerExtracto(noticia, 90);

  return (
    <article className="pendientes-card-item">
      {/* Miniatura */}
      <div className="pendientes-card-thumb">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={noticia.titulo || 'Noticia UPC'}
            className="pendientes-thumb-img"
            loading="lazy"
          />
        ) : (
          <div className="pendientes-thumb-placeholder">
            <svg
              className="placeholder-icon"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido Central */}
      <div className="pendientes-card-body">
        <div className="pendientes-card-topbar">
          <span className="pendientes-categoria-pill">{categoria}</span>
          <PendientesEstadoBadge estado={noticia.estado || noticia.estadoNoticia} />
        </div>

        <h3 className="pendientes-card-titulo" title={noticia.titulo}>
          {noticia.titulo || 'Sin título'}
        </h3>

        <p className="pendientes-card-extracto">{extracto}</p>

        <div className="pendientes-card-meta">
          <div className="meta-item">
            <svg
              className="meta-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{autor}</span>
          </div>

          <div className="meta-item">
            <svg
              className="meta-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <time>{fecha}</time>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="pendientes-card-actions-wrapper">
        <PendientesAcciones
          noticia={noticia}
          accionEnProgreso={accionEnProgreso}
          onPrevisualizar={onPrevisualizar}
          onPublicar={onPublicar}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      </div>
    </article>
  );
};

export default PendientesFila;
