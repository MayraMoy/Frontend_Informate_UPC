import React, { useMemo } from 'react';
import useGestionUsuarios from './hooks/useGestionUsuarios.js';
import { FiltrosUsuarios } from './components/FiltrosUsuarios.jsx';
import { TablaUsuarios } from './components/TablaUsuarios.jsx';
import { ModalDetalleUsuario } from './components/ModalDetalleUsuario.jsx';
import { ModalConfirmarEstado } from './components/ModalConfirmarEstado.jsx';
import { ModalCambiarRol } from './components/ModalCambiarRol.jsx';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion.jsx';
import './styles/UsuariosPage.css';

export const UsuariosPage = () => {
  const {
    adminActual,
    usuarios,
    usuariosFiltrados,
    roles,
    cargando,
    procesando,
    error,
    busqueda,
    filtroRol,
    filtroEstado,
    usuarioDetalle,
    usuarioParaSuspender,
    usuarioParaCambiarRol,
    nuevoRolId,
    toast,
    setBusqueda,
    setFiltroRol,
    setFiltroEstado,
    setUsuarioDetalle,
    setUsuarioParaSuspender,
    setUsuarioParaCambiarRol,
    setNuevoRolId,
    cargarDatos,
    alternarEstadoUsuario,
    guardarCambioRol,
    copiarEmail,
    cerrarToast,
  } = useGestionUsuarios();

  // Estadísticas rápidas
  const estadisticas = useMemo(() => {
    const total = usuarios.length;
    let activos = 0;
    let inactivos = 0;
    let administradores = 0;

    usuarios.forEach((u) => {
      const estado = (u.estado || 'ACTIVO').toUpperCase();
      if (estado === 'ACTIVO') activos++;
      else inactivos++;

      const rol = (u.nombreRol || u.rol?.nombre || '').toUpperCase();
      if (rol === 'ADMINISTRADOR' || rol === 'ADMIN') administradores++;
    });

    return { total, activos, inactivos, administradores };
  }, [usuarios]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroRol('TODOS');
    setFiltroEstado('TODOS');
  };

  return (
    <section className="usuarios-page container py-4 py-md-5" aria-labelledby="usuarios-titulo-principal">
      {/* Toast Feedback */}
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        onCerrar={cerrarToast}
      />

      {/* Encabezado */}
      <header className="usuarios-header">
        <span className="usuarios-eyebrow">Panel de Administración</span>
        <h1 id="usuarios-titulo-principal">Gestión de Usuarios</h1>
        <p>Administrá las cuentas institucionales, asigná roles y controlá el acceso a la plataforma.</p>
      </header>

      {/* Tarjetas de estadísticas */}
      <div className="usuarios-stats-grid">
        <div className="usuarios-stat-card">
          <div className="usuarios-stat-info">
            <span className="usuarios-stat-label">Total Registrados</span>
            <span className="usuarios-stat-valor">{cargando ? '-' : estadisticas.total}</span>
          </div>
          <div className="usuarios-stat-icono usuarios-stat-icono--total" aria-hidden="true">
            👥
          </div>
        </div>

        <div className="usuarios-stat-card">
          <div className="usuarios-stat-info">
            <span className="usuarios-stat-label">Usuarios Activos</span>
            <span className="usuarios-stat-valor text-success">{cargando ? '-' : estadisticas.activos}</span>
          </div>
          <div className="usuarios-stat-icono usuarios-stat-icono--activos" aria-hidden="true">
            ✅
          </div>
        </div>

        <div className="usuarios-stat-card">
          <div className="usuarios-stat-info">
            <span className="usuarios-stat-label">Suspendidos / Inactivos</span>
            <span className="usuarios-stat-valor text-danger">{cargando ? '-' : estadisticas.inactivos}</span>
          </div>
          <div className="usuarios-stat-icono usuarios-stat-icono--inactivos" aria-hidden="true">
            ⚠️
          </div>
        </div>

        <div className="usuarios-stat-card">
          <div className="usuarios-stat-info">
            <span className="usuarios-stat-label">Administradores</span>
            <span className="usuarios-stat-valor text-purple">{cargando ? '-' : estadisticas.administradores}</span>
          </div>
          <div className="usuarios-stat-icono usuarios-stat-icono--admin" aria-hidden="true">
            🛡️
          </div>
        </div>
      </div>

      {/* Mensaje de error general si falló la carga */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between mb-4" role="alert">
          <div className="d-flex align-items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={cargarDatos}
            disabled={cargando}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Filtros y Buscador */}
      <FiltrosUsuarios
        busqueda={busqueda}
        filtroRol={filtroRol}
        filtroEstado={filtroEstado}
        roles={roles}
        totalResultados={usuariosFiltrados.length}
        totalGeneral={usuarios.length}
        onBusquedaChange={setBusqueda}
        onFiltroRolChange={setFiltroRol}
        onFiltroEstadoChange={setFiltroEstado}
        onLimpiarFiltros={limpiarFiltros}
      />

      {/* Estado de carga */}
      {cargando ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="spinner-border text-warning mb-3" role="status">
            <span className="visually-hidden">Cargando usuarios...</span>
          </div>
          <p className="text-secondary small mb-0">Cargando nómina de usuarios...</p>
        </div>
      ) : (
        /* Tabla de usuarios */
        <TablaUsuarios
          usuarios={usuariosFiltrados}
          adminActual={adminActual}
          onVerDetalle={(u) => setUsuarioDetalle(u)}
          onAbrirCambiarRol={(u) => {
            setUsuarioParaCambiarRol(u);
            const rolActual = u.idRol || u.rol?.idRol || '';
            setNuevoRolId(String(rolActual));
          }}
          onAbrirSuspension={(u) => setUsuarioParaSuspender(u)}
        />
      )}

      {/* Modales */}
      <ModalDetalleUsuario
        usuario={usuarioDetalle}
        onClose={() => setUsuarioDetalle(null)}
        onCopiarEmail={copiarEmail}
      />

      <ModalConfirmarEstado
        usuario={usuarioParaSuspender}
        procesando={procesando}
        onConfirmar={() => alternarEstadoUsuario(usuarioParaSuspender)}
        onCancelar={() => setUsuarioParaSuspender(null)}
      />

      <ModalCambiarRol
        usuario={usuarioParaCambiarRol}
        roles={roles}
        rolSeleccionado={nuevoRolId}
        procesando={procesando}
        onChangeRol={setNuevoRolId}
        onGuardar={guardarCambioRol}
        onCancelar={() => setUsuarioParaCambiarRol(null)}
      />
    </section>
  );
};

export default UsuariosPage;
