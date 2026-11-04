import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import usuarioService from '../../Services/usuarios/usuarioService.js';
import useDetalleUsuarioActividad from './hooks/useDetalleUsuarioActividad.js';
import {
  ModalDetalleKpis,
  ModalDetalleTabs,
  TabComentariosResoluciones,
  TabInfoCuenta,
  TabPublicaciones,
} from './components/modal-detalle/index.js';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion.jsx';
import './styles/UsuariosPage.css';

export const DetalleUsuarioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(() => location.state?.usuario || null);
  const [cargandoUsuario, setCargandoUsuario] = useState(!location.state?.usuario);
  const [errorCarga, setErrorCarga] = useState('');
  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success' });

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
  };

  const cerrarToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Cargar usuario si no vino por state de navegación o se refrescó la página
  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    const cargarUsuario = async () => {
      try {
        if (!usuario) setCargandoUsuario(true);
        const data = await usuarioService.obtenerPorId(id);
        if (!cancelado && data) {
          setUsuario(data);
        }
      } catch (err) {
        if (!cancelado) {
          setErrorCarga(err.message || 'No se pudo cargar la información del usuario.');
        }
      } finally {
        if (!cancelado) setCargandoUsuario(false);
      }
    };

    cargarUsuario();
    return () => {
      cancelado = true;
    };
  }, [id]);

  const {
    pestanaActiva,
    setPestanaActiva,
    copiado,
    handleCopiarEmail,
    cargandoActividad,
    comentarios,
    resoluciones,
    noticias,
    nombreCompleto,
    inicial,
    rol,
    estado,
    esEstudiante,
    formatearFecha,
    formatearSoloFecha,
  } = useDetalleUsuarioActividad(usuario, (email) => {
    mostrarToast(`Correo copiado al portapapeles: ${email}`);
  });

  const mostrarPestanaPublicaciones = !esEstudiante || noticias.length > 0 || resoluciones.length > 0;
  const publicacionesTotal = noticias.length + resoluciones.length;

  if (cargandoUsuario) {
    return (
      <main className="container py-5 text-center" id="contenido-principal">
        <div className="spinner-border text-warning mb-3" role="status">
          <span className="visually-hidden">Cargando usuario...</span>
        </div>
        <p className="text-secondary">Cargando expediente del usuario...</p>
      </main>
    );
  }

  if (errorCarga || !usuario) {
    return (
      <main className="container py-5" id="contenido-principal">
        <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
          <span>{errorCarga || 'Usuario no encontrado.'}</span>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => navigate('/usuarios')}>
            Volver a usuarios
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="usuarios-page container py-4 py-md-5" id="contenido-principal">
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        onCerrar={cerrarToast}
      />

      {/* Barra de navegación superior con Breadcrumbs y Botón Volver */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <nav aria-label="Ruta de navegación">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/dashboard-admin" className="text-decoration-none text-muted">
                Inicio
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/usuarios" className="text-decoration-none text-muted">
                Gestión de Usuarios
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {nombreCompleto}
            </li>
          </ol>
        </nav>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
          onClick={() => navigate('/usuarios')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Volver a la nómina</span>
        </button>
      </div>

      {/* Contenedor Principal de la Ficha del Usuario */}
      <div className="usuarios-ficha-container">
        {/* Cabecera del Perfil Completo */}
        <div className="usuarios-ficha-header">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="usuarios-avatar-xl" aria-hidden="true">
              {inicial}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                <h1 className="usuarios-ficha-nombre mb-0">{nombreCompleto}</h1>
                <span className={`usuarios-rol-pill usuarios-rol-pill--${rol.toLowerCase()}`}>
                  {rol}
                </span>
                <span className={`usuarios-estado-pill usuarios-estado-pill--${estado.toLowerCase()}`}>
                  ● {estado}
                </span>
              </div>
              <p className="usuarios-ficha-meta mb-0 text-muted">
                {usuario.dni ? `DNI: ${usuario.dni} • ` : ''}
                {usuario.email ? `${usuario.email} • ` : ''}
                Registrado el {formatearFecha(usuario.fechaRegistro)}
              </p>
            </div>
          </div>

          <div className="usuarios-ficha-acciones-top">
            {usuario.email && (
              <a
                href={`mailto:${usuario.email}?subject=Comunicación Institucional - Foro UPC`}
                className="usuarios-boton-contacto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Enviar correo directo</span>
              </a>
            )}
          </div>
        </div>

        {/* KPIs de Actividad Institucional */}
        <ModalDetalleKpis
          comentariosCount={comentarios.length}
          noticiasCount={noticias.length}
          resolucionesCount={resoluciones.length}
          cargando={cargandoActividad}
          pestanaActiva={pestanaActiva}
          onSelectPestana={setPestanaActiva}
        />

        {/* Tabs de Selección */}
        <ModalDetalleTabs
          pestanaActiva={pestanaActiva}
          onSelectPestana={setPestanaActiva}
          comentariosCount={comentarios.length}
          publicacionesCount={publicacionesTotal}
          mostrarPublicaciones={mostrarPestanaPublicaciones}
        />

        {/* Contenido Principal de la Pestaña Activa */}
        <div className="usuarios-ficha-body">
          {pestanaActiva === 'comentarios' && (
            <TabComentariosResoluciones
              comentarios={comentarios}
              cargando={cargandoActividad}
              usuario={usuario}
              formatearFecha={formatearFecha}
            />
          )}

          {pestanaActiva === 'info' && (
            <TabInfoCuenta
              usuario={usuario}
              copiado={copiado}
              onCopiarEmail={handleCopiarEmail}
              formatearFecha={formatearFecha}
            />
          )}

          {pestanaActiva === 'publicaciones' && (
            <TabPublicaciones
              noticias={noticias}
              resoluciones={resoluciones}
              formatearSoloFecha={formatearSoloFecha}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default DetalleUsuarioPage;

