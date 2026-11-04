import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import usuarioService from '../../Services/usuarios/usuarioService.js';
import useDetalleUsuarioActividad from './hooks/useDetalleUsuarioActividad.js';
import {
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
    formatearFecha,
    formatearSoloFecha,
  } = useDetalleUsuarioActividad(usuario, (email) => {
    mostrarToast(`Correo copiado al portapapeles: ${email}`);
  });

  if (cargandoUsuario) {
    return (
      <div className="usuarios-page-bg">
        <main className="container py-5 text-center" id="contenido-principal">
          <div className="spinner-border text-warning mb-3" role="status">
            <span className="visually-hidden">Cargando usuario...</span>
          </div>
          <p className="text-secondary">Cargando ficha del usuario...</p>
        </main>
      </div>
    );
  }

  if (errorCarga || !usuario) {
    return (
      <div className="usuarios-page-bg">
        <main className="container py-5" id="contenido-principal">
          <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
            <span>{errorCarga || 'Usuario no encontrado.'}</span>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => navigate('/usuarios')}>
              Volver a usuarios
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="usuarios-page-bg">
      <main className="usuarios-page container-xl py-4 py-md-5" id="contenido-principal">
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        onCerrar={cerrarToast}
      />

      {/* Barra superior: Navegación idéntica al encabezado institucional de lectura */}
      <div className="mb-4">
        <nav className="usuarios-breadcrumb-nav" aria-label="Migas de pan">
          <Link to="/usuarios" className="usuarios-breadcrumb-modulo" title="Volver a Gestión de Usuarios">
            Gestión de Usuarios
          </Link>
          <span className="usuarios-breadcrumb-separador" aria-hidden="true">/</span>
          <span className="usuarios-breadcrumb-actual" aria-current="page">
            {nombreCompleto}
          </span>
        </nav>
      </div>

      {/* Contenedor Principal de la Ficha del Usuario */}
      <div className="usuarios-ficha-container">
        {/* Cabecera del Usuario: Sin tags de Estudiante/Activo, datos jerarquizados */}
        <div className="usuarios-ficha-header">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="usuarios-avatar-xl" aria-hidden="true">
              {inicial}
            </div>
            <div>
              <h1 className="usuarios-ficha-nombre mb-2">{nombreCompleto}</h1>

              {/* Fila estructurada de metadatos con iconos vectoriales */}
              <div className="usuarios-ficha-meta-chips">
                <div className="usuarios-meta-item">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="usuarios-meta-valor">{usuario.email || 'Sin correo'}</span>
                </div>

                <span className="usuarios-meta-separador" aria-hidden="true">•</span>

                <div className="usuarios-meta-item">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h.01" />
                    <path d="M11 7h6" />
                    <path d="M7 11h.01" />
                    <path d="M11 11h6" />
                    <path d="M7 15h.01" />
                    <path d="M11 15h6" />
                  </svg>
                  <span className="usuarios-meta-label">DNI:</span>
                  <span className="usuarios-meta-valor">{usuario.dni || 'No registrado'}</span>
                </div>

                <span className="usuarios-meta-separador" aria-hidden="true">•</span>

                <div className="usuarios-meta-item">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="usuarios-meta-label">Registrado:</span>
                  <span className="usuarios-meta-valor">{formatearFecha(usuario.fechaRegistro)}</span>
                </div>
              </div>
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

        {/* Pestañas de Navegación con métricas integradas y jerarquía clara */}
        <ModalDetalleTabs
          pestanaActiva={pestanaActiva}
          onSelectPestana={setPestanaActiva}
          comentariosCount={comentarios.length}
          noticiasCount={noticias.length}
          resolucionesCount={resoluciones.length}
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

          {pestanaActiva === 'noticias' && (
            <TabPublicaciones
              noticias={noticias}
              mostrarTipo="noticias"
              formatearSoloFecha={formatearSoloFecha}
            />
          )}

          {pestanaActiva === 'resoluciones' && (
            <TabPublicaciones
              resoluciones={resoluciones}
              mostrarTipo="resoluciones"
              formatearSoloFecha={formatearSoloFecha}
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
        </div>
      </div>
    </main>
  </div>
  );
};

export default DetalleUsuarioPage;
