import React from 'react';
import { useLocation } from 'react-router-dom';
import usePerfil from './hooks/usePerfil.js';
import usePerfilComentarios from './hooks/usePerfilComentarios.js';
import PerfilVista from './components/PerfilVista.jsx';
import PerfilFormulario from './components/PerfilFormulario.jsx';
import PerfilComentarios from './components/PerfilComentarios.jsx';
import PerfilTabs from './components/PerfilTabs.jsx';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion.jsx';
import './styles/Perfil.css';

const Perfil = () => {
  const location = useLocation();
  const perfil = usePerfil();
  const { user } = perfil;
  const comentariosController = usePerfilComentarios(user);

  // Derivar la pestaña activa directamente del hash de la URL
  const tabActiva = location.hash === '#comentarios' ? 'comentarios' : 'datos';

  const cambiarTab = (nuevaTab) => {
    window.location.hash = nuevaTab;
  };

  return (
    <section className="perfil-page container py-4 py-md-5" aria-labelledby="perfil-title">
      <div className="perfil-heading">
        <span className="perfil-eyebrow">Mi Cuenta</span>
        <h1 id="perfil-title">Mi perfil</h1>
        <p>Consultá y gestioná tus datos personales, tu información institucional y tus aportes en la comunidad.</p>
      </div>

      {/* Pestañas de navegación de perfil */}
      <PerfilTabs
        tabActiva={tabActiva}
        onCambiarTab={cambiarTab}
        conteoComentarios={comentariosController.metricas.total}
      />

      {/* Alerta flotante de éxito para cambios de perfil */}
      <ToastNotificacion
        visible={Boolean(perfil.mensajeExito)}
        tipo="success"
        mensaje={perfil.mensajeExito}
        onCerrar={perfil.limpiarMensajeExito}
      />

      {/* Alerta de error en formulario de perfil */}
      {perfil.mensajeError && tabActiva === 'datos' && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between mb-4" role="alert">
          <div className="d-flex align-items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{perfil.mensajeError}</span>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar error"
            onClick={perfil.limpiarMensajeError}
          />
        </div>
      )}

      {/* Contenido según pestaña activa */}
      {tabActiva === 'datos' ? (
        perfil.editando ? (
          <PerfilFormulario
            user={user}
            formData={perfil.formData}
            errores={perfil.errores}
            guardando={perfil.guardando}
            mostrarPassword={perfil.mostrarPassword}
            mostrarConfirmPassword={perfil.mostrarConfirmPassword}
            onCambio={perfil.manejarCambio}
            onToggleMostrarPassword={() => perfil.setMostrarPassword((prev) => !prev)}
            onToggleMostrarConfirmPassword={() => perfil.setMostrarConfirmPassword((prev) => !prev)}
            onSubmit={perfil.guardarPerfil}
            onCancelar={perfil.cancelarEdicion}
          />
        ) : (
          <PerfilVista
            user={user}
            onEditar={perfil.iniciarEdicion}
            totalComentarios={comentariosController.metricas.total}
            onVerComentarios={() => cambiarTab('comentarios')}
          />
        )
      ) : (
        <PerfilComentarios
          user={user}
          controller={comentariosController}
        />
      )}
    </section>
  );
};

export default Perfil;
