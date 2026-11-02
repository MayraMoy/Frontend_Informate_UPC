import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PendientesAcciones = ({
  noticia,
  accionEnProgreso,
  onPrevisualizar,
  onPublicar,
  onCambiarEstado,
  onEliminar,
}) => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  const estaProcesando = accionEnProgreso === noticia.id;
  const estadoActual = String(noticia.estado || noticia.estadoNoticia || '').trim().toUpperCase();

  // Cerrar menú al hacer clic afuera
  useEffect(() => {
    const handleClickAfuera = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    if (menuAbierto) {
      document.addEventListener('mousedown', handleClickAfuera);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickAfuera);
    };
  }, [menuAbierto]);

  return (
    <div className="pendientes-acciones-group" ref={menuRef}>
      {/* Botón Ver / Previsualizar */}
      <button
        type="button"
        className="btn-accion-icono btn-accion-ver"
        title="Previsualizar noticia"
        onClick={() => onPrevisualizar(noticia)}
        disabled={estaProcesando}
      >
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="sr-only">Previsualizar</span>
      </button>

      {/* Botón Editar */}
      <button
        type="button"
        className="btn-accion-icono btn-accion-editar"
        title="Editar contenido"
        onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
        disabled={estaProcesando}
      >
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
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
        <span className="sr-only">Editar</span>
      </button>

      {/* Botón Publicar */}
      <button
        type="button"
        className="btn-accion-publicar"
        title="Publicar en el portal institucional"
        onClick={() => onPublicar(noticia)}
        disabled={estaProcesando}
      >
        {estaProcesando ? (
          <svg
            className="spinner-icono"
            viewBox="0 0 24 24"
            width="16"
            height="16"
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
            width="16"
            height="16"
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
        <span>{estaProcesando ? 'Publicando...' : 'Publicar'}</span>
      </button>

      {/* Menú de Más Opciones */}
      <div className="pendientes-dropdown-wrapper">
        <button
          type="button"
          className={`btn-accion-icono btn-accion-mas ${menuAbierto ? 'activo' : ''}`}
          title="Más opciones de estado"
          onClick={() => setMenuAbierto((prev) => !prev)}
          disabled={estaProcesando}
          aria-haspopup="true"
          aria-expanded={menuAbierto}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
          <span className="sr-only">Más opciones</span>
        </button>

        {menuAbierto && (
          <div className="pendientes-dropdown-menu" role="menu">
            {estadoActual !== 'BORRADOR' && (
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuAbierto(false);
                  onCambiarEstado(noticia, 'BORRADOR');
                }}
                role="menuitem"
              >
                <svg
                  className="dropdown-item-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Mover a Borrador</span>
              </button>
            )}

            {estadoActual !== 'ARCHIVADA' && (
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuAbierto(false);
                  onCambiarEstado(noticia, 'ARCHIVADA');
                }}
                role="menuitem"
              >
                <svg
                  className="dropdown-item-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="21 8 21 21 3 21 3 8" />
                  <rect x="1" y="3" width="22" height="5" />
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
                <span>Archivar</span>
              </button>
            )}

            {estadoActual !== 'SUSPENDIDA' && (
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuAbierto(false);
                  onCambiarEstado(noticia, 'SUSPENDIDA');
                }}
                role="menuitem"
              >
                <svg
                  className="dropdown-item-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="10" y1="15" x2="10" y2="9" />
                  <line x1="14" y1="15" x2="14" y2="9" />
                </svg>
                <span>Suspender</span>
              </button>
            )}

            <div className="dropdown-divider" />

            <button
              type="button"
              className="dropdown-item dropdown-item-danger"
              onClick={() => {
                setMenuAbierto(false);
                onEliminar(noticia);
              }}
              role="menuitem"
            >
              <svg
                className="dropdown-item-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span>Eliminar publicación</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendientesAcciones;

