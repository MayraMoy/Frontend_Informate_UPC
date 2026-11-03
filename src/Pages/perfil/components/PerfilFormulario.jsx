import React from 'react';
import { obtenerRolesUsuario } from '../utils/perfilUsuario.js';

const IconoOjo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconoOjoCerrado = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const PerfilFormulario = ({
  user,
  formData,
  errores,
  guardando,
  mostrarPassword,
  mostrarConfirmPassword,
  onCambio,
  onToggleMostrarPassword,
  onToggleMostrarConfirmPassword,
  onSubmit,
  onCancelar,
}) => {
  const rol = obtenerRolesUsuario(user);

  return (
    <form className="perfil-form-card" onSubmit={onSubmit} noValidate>
      <div className="perfil-form-cabecera">
        <h2>Editar información del perfil</h2>
        <p>Modificá tus datos personales o actualizá tu contraseña de acceso.</p>
      </div>

      <div className="perfil-form-seccion">
        <h3 className="perfil-form-subtitulo">Datos personales</h3>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="perfil-nombre" className="form-label perfil-label">
              Nombre <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="perfil-nombre"
              name="nombre"
              className={`form-control perfil-input ${errores.nombre ? 'is-invalid' : ''}`}
              value={formData.nombre}
              onChange={onCambio}
              disabled={guardando}
              placeholder="Tu nombre"
              autoComplete="given-name"
            />
            {errores.nombre && (
              <div className="invalid-feedback">{errores.nombre}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="perfil-apellido" className="form-label perfil-label">
              Apellido <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="perfil-apellido"
              name="apellido"
              className={`form-control perfil-input ${errores.apellido ? 'is-invalid' : ''}`}
              value={formData.apellido}
              onChange={onCambio}
              disabled={guardando}
              placeholder="Tu apellido"
              autoComplete="family-name"
            />
            {errores.apellido && (
              <div className="invalid-feedback">{errores.apellido}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="perfil-email" className="form-label perfil-label">
              Correo institucional <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="perfil-email"
              name="email"
              className={`form-control perfil-input ${errores.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={onCambio}
              disabled={guardando}
              placeholder="ejemplo@upc.edu.ar"
              autoComplete="email"
            />
            {errores.email && (
              <div className="invalid-feedback">{errores.email}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="perfil-dni" className="form-label perfil-label">
              Documento (DNI)
            </label>
            <input
              type="text"
              id="perfil-dni"
              className="form-control perfil-input perfil-input--bloqueado"
              value={user?.dni || 'No especificado'}
              disabled
              readOnly
            />
            <small className="form-text text-muted">
              El DNI no puede modificarse por seguridad institucional.
            </small>
          </div>

          <div className="col-md-6">
            <label className="form-label perfil-label">Rol en la plataforma</label>
            <input
              type="text"
              className="form-control perfil-input perfil-input--bloqueado"
              value={rol}
              disabled
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="perfil-separador" />

      <div className="perfil-form-seccion">
        <div className="d-flex flex-column mb-3">
          <h3 className="perfil-form-subtitulo mb-1">Cambiar contraseña (opcional)</h3>
          <p className="perfil-ayuda-subtexto mb-0">
            Completá estos campos únicamente si deseás actualizar tu clave actual. Caso contrario, dejalos en blanco.
          </p>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="perfil-password" className="form-label perfil-label">
              Nueva contraseña
            </label>
            <div className="input-group">
              <input
                type={mostrarPassword ? 'text' : 'password'}
                id="perfil-password"
                name="contraseña"
                className={`form-control perfil-input ${errores.contraseña ? 'is-invalid' : ''}`}
                value={formData.contraseña}
                onChange={onCambio}
                disabled={guardando}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary perfil-toggle-password"
                onClick={onToggleMostrarPassword}
                tabIndex="-1"
                aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {mostrarPassword ? <IconoOjoCerrado /> : <IconoOjo />}
              </button>
              {errores.contraseña && (
                <div className="invalid-feedback d-block">{errores.contraseña}</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="perfil-confirm-password" className="form-label perfil-label">
              Confirmar nueva contraseña
            </label>
            <div className="input-group">
              <input
                type={mostrarConfirmPassword ? 'text' : 'password'}
                id="perfil-confirm-password"
                name="confirmarContraseña"
                className={`form-control perfil-input ${errores.confirmarContraseña ? 'is-invalid' : ''}`}
                value={formData.confirmarContraseña}
                onChange={onCambio}
                disabled={guardando}
                placeholder="Repetí la nueva contraseña"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary perfil-toggle-password"
                onClick={onToggleMostrarConfirmPassword}
                tabIndex="-1"
                aria-label={mostrarConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {mostrarConfirmPassword ? <IconoOjoCerrado /> : <IconoOjo />}
              </button>
              {errores.confirmarContraseña && (
                <div className="invalid-feedback d-block">{errores.confirmarContraseña}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="perfil-form-acciones">
        <button
          type="button"
          className="perfil-boton-cancelar"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="perfil-boton-guardar"
          disabled={guardando}
        >
          {guardando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              <span>Guardando cambios...</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Guardar cambios</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PerfilFormulario;
