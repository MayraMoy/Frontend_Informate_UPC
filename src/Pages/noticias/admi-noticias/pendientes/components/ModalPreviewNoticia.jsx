import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  formatearFecha,
  obtenerAutor,
  obtenerThumbnail,
  obtenerNombreCategoria,
} from '../utils/pendientesHelpers';
import PendientesEstadoBadge from './PendientesEstadoBadge';

export const ModalPreviewNoticia = ({
  noticia,
  categorias,
  onCerrar,
  onPublicar,
  accionEnProgreso,
}) => {
  const navigate = useNavigate();

  // Cerrar modal al presionar escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCerrar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCerrar]);

  if (!noticia) return null;

  const thumbnail = obtenerThumbnail(noticia);
  const autor = obtenerAutor(noticia);
  const fecha = formatearFecha(noticia.fechaPublicacion || noticia.fecha || noticia.createdAt);
  const categoria = obtenerNombreCategoria(noticia, categorias);
  const cuerpoTexto = noticia.cuerpo || noticia.descripcion || noticia.resumen || '';
  const estaProcesando = accionEnProgreso === noticia.id;

  return (
    <div
      className="pendientes-modal-backdrop"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-preview-title"
    >
      <div
        className="pendientes-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <header className="pendientes-modal-header">
          <div className="modal-header-meta">
            <span className="pendientes-categoria-pill">{categoria}</span>
            <PendientesEstadoBadge estado={noticia.estado || noticia.estadoNoticia} />
          </div>

          <button
            type="button"
            className="modal-btn-cerrar"
            onClick={onCerrar}
            title="Cerrar vista previa"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Cerrar</span>
          </button>
        </header>

        {/* Cuerpo del modal scrolleable */}
        <div className="pendientes-modal-scroll">
          <h2 id="modal-preview-title" className="modal-preview-titulo">
            {noticia.titulo || 'Sin título'}
          </h2>

          <div className="modal-preview-author-bar">
            <div className="modal-meta-item">
              <svg
                viewBox="0 0 24 24"
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
            <span className="modal-meta-sep">•</span>
            <div className="modal-meta-item">
              <svg
                viewBox="0 0 24 24"
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

          {thumbnail && (
            <div className="modal-preview-img-wrapper">
              <img
                src={thumbnail}
                alt={noticia.titulo || 'Imagen de la noticia'}
                className="modal-preview-img"
              />
            </div>
          )}

          {noticia.resumen && (
            <div className="modal-preview-resumen">
              <p>{noticia.resumen}</p>
            </div>
          )}

          <div className="modal-preview-cuerpo">
            {cuerpoTexto.includes('<p>') || cuerpoTexto.includes('<br>') ? (
              <div dangerouslySetInnerHTML={{ __html: cuerpoTexto }} />
            ) : (
              cuerpoTexto.split('\n\n').map((parrafo, idx) => (
                <p key={idx}>{parrafo}</p>
              ))
            )}
          </div>
        </div>

        {/* Footer de acciones */}
        <footer className="pendientes-modal-footer">
          <button
            type="button"
            className="modal-btn-secundario"
            onClick={onCerrar}
          >
            Cerrar
          </button>

          <button
            type="button"
            className="modal-btn-editar"
            onClick={() => {
              onCerrar();
              navigate(`/editar-noticia/${noticia.id}`);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Editar Noticia</span>
          </button>

          <button
            type="button"
            className="modal-btn-publicar"
            disabled={estaProcesando}
            onClick={async () => {
              await onPublicar(noticia);
              onCerrar();
            }}
          >
            {estaProcesando ? (
              <svg
                className="spinner-icono"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            <span>{estaProcesando ? 'Publicando...' : 'Publicar Ahora'}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalPreviewNoticia;
