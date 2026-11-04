import React from 'react';
import usePerfil from './hooks/usePerfil.js';
import PerfilVista from './components/PerfilVista.jsx';
import PerfilFormulario from './components/PerfilFormulario.jsx';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion.jsx';
import './styles/Perfil.css';

const Perfil = () => {
  const {
    user,
    editando,
    guardando,
    formData,
    errores,
    mostrarPassword,
    mostrarConfirmPassword,
    mensajeExito,
    mensajeError,
    setMostrarPassword,
    setMostrarConfirmPassword,
    limpiarMensajeExito,
    limpiarMensajeError,
    iniciarEdicion,
    cancelarEdicion,
    manejarCambio,
    guardarPerfil,
  } = usePerfil();

  return (
    <div className="perfil-page-bg">
      <section className="perfil-page" aria-labelledby="perfil-title">
      <div className="perfil-heading">
        <h1 id="perfil-title">Mi perfil</h1>
        <p>Consultá y gestioná tus datos personales e información institucional.</p>
      </div>

      {/* Alerta flotante de éxito */}
      <ToastNotificacion
        visible={Boolean(mensajeExito)}
        tipo="success"
        mensaje={mensajeExito}
        onCerrar={limpiarMensajeExito}
      />

      {/* Alerta de error en formulario */}
      {mensajeError && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between mb-4" role="alert">
          <div className="d-flex align-items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{mensajeError}</span>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar error"
            onClick={limpiarMensajeError}
          />
        </div>
      )}

      {/* Modo Edición o Modo Visualización */}
      {editando ? (
        <PerfilFormulario
          user={user}
          formData={formData}
          errores={errores}
          guardando={guardando}
          mostrarPassword={mostrarPassword}
          mostrarConfirmPassword={mostrarConfirmPassword}
          onCambio={manejarCambio}
          onToggleMostrarPassword={() => setMostrarPassword((prev) => !prev)}
          onToggleMostrarConfirmPassword={() => setMostrarConfirmPassword((prev) => !prev)}
          onSubmit={guardarPerfil}
          onCancelar={cancelarEdicion}
        />
      ) : (
        <PerfilVista
          user={user}
          onEditar={iniciarEdicion}
        />
      )}
    </section>
  </div>
  );
};

export default Perfil;
