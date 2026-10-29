import React from 'react';
import { ESTADOS_NOTICIA } from '../data/editarNoticiaData';

export const SeccionEstadoNoticia = ({ estado, onChangeEstado, esAdmin }) => {
  return (
    <div className="editar-noticia__estado-seccion">
      <label htmlFor="selector-estado" className="crear-noticia__sublabel">
        Estado de la noticia
      </label>

      {esAdmin ? (
        <>
          <select
            id="selector-estado"
            className="editar-noticia__select-estado"
            value={estado}
            onChange={(e) => onChangeEstado(e.target.value)}
          >
            {ESTADOS_NOTICIA.map((est) => (
              <option key={est.valor} value={est.valor}>
                {est.etiqueta}
              </option>
            ))}
          </select>
          <span className="editar-noticia__rol-badge-admin">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Rol Administrador: podés modificar el estado.</span>
          </span>
        </>
      ) : (
        <div className="editar-noticia__estado-bloqueado">
          <div className="editar-noticia__estado-valor-fijo">
            <span className="editar-noticia__candado-icono" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <strong>{estado}</strong>
          </div>
          <p className="editar-noticia__aviso-rol">
            Como <strong>Personal Escolar</strong> no tenés permisos para cambiar el estado de la noticia.
          </p>
        </div>
      )}
    </div>
  );
};

