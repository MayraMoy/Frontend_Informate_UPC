import React from 'react';
import { obtenerNombreUsuario, obtenerRolesUsuario } from '../utils/perfilUsuario.js';

export const PerfilVista = ({ user, onEditar }) => {
  const nombre = obtenerNombreUsuario(user);
  const rol = obtenerRolesUsuario(user);
  const inicial = (user?.nombre || nombre || 'U').charAt(0).toUpperCase();

  return (
    <article className="perfil-card">
      <div className="perfil-card-cabecera">
        <div className="perfil-avatar" aria-hidden="true">
          {inicial}
        </div>
        <div className="perfil-identidad">
          <h2>{nombre}</h2>
          <div className="perfil-badges">
            <span className="perfil-rol-badge">{rol}</span>
            {user?.estado && (
              <span className={`perfil-estado-badge perfil-estado-badge--${user.estado.toLowerCase()}`}>
                ● {user.estado}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="perfil-boton-editar"
          onClick={onEditar}
          aria-label="Editar datos del perfil"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Editar perfil</span>
        </button>
      </div>

      <div className="perfil-separador" />

      <div className="perfil-detalles-grid">
        <div className="perfil-campo-info">
          <span className="perfil-campo-label">Nombre</span>
          <span className="perfil-campo-valor">{user?.nombre || '-'}</span>
        </div>

        <div className="perfil-campo-info">
          <span className="perfil-campo-label">Apellido</span>
          <span className="perfil-campo-valor">{user?.apellido || '-'}</span>
        </div>

        <div className="perfil-campo-info">
          <span className="perfil-campo-label">Correo electrónico</span>
          <span className="perfil-campo-valor">{user?.email || '-'}</span>
        </div>

        <div className="perfil-campo-info">
          <span className="perfil-campo-label">Documento (DNI)</span>
          <span className="perfil-campo-valor">{user?.dni || 'No especificado'}</span>
        </div>

        <div className="perfil-campo-info">
          <span className="perfil-campo-label">Rol asignado</span>
          <span className="perfil-campo-valor">{rol}</span>
        </div>

        {user?.ultimoAcceso && (
          <div className="perfil-campo-info">
            <span className="perfil-campo-label">Último acceso</span>
            <span className="perfil-campo-valor">
              {new Date(user.ultimoAcceso).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PerfilVista;
