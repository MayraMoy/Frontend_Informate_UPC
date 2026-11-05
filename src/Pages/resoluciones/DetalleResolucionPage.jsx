import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { puedeAccederGestion } from '../../hooks/useRoles';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import { ModalEditarResolucion } from '../../Components/resoluciones/ModalEditarResolucion';
import { obtenerEstadoResolucion } from '../../Components/resoluciones/estadoResolucion';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion';
import { SeccionComentariosResolucion } from '../../Components/resoluciones/comentarios/SeccionComentariosResolucion';
import { IconoEditar } from '../noticias/admi-noticias/crear-noticia/components/IconosNoticia';
import { resolucionesMock } from './data/resolucionesMock';
import './styles/DetalleResolucionPage.css';

export const DetalleResolucionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AppContext);
  const esAdmin = puedeAccederGestion(user);

  const [resolucion, setResolucion] = useState(() => location.state?.resolucion || null);
  const [cargando, setCargando] = useState(!location.state?.resolucion);
  const [errorCarga, setErrorCarga] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  // Cargar categorías para edición admin
  useEffect(() => {
    let cancelado = false;
    categoriasResolucionService
      .obtenerTodas()
      .then((data) => {
        if (!cancelado && Array.isArray(data)) setCategorias(data);
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, []);

  // Cargar resolución si no vino por state de navegación
  useEffect(() => {
    if (resolucion) return;
    let cancelado = false;

    const cargarResolucion = async () => {
      try {
        setCargando(true);
        const data = await resolucionesService.obtenerPorId(id);
        if (!cancelado && data) {
          setResolucion(data);
        }
      } catch (err) {
        // Fallback a mock data si backend no responde
        const encontrada = resolucionesMock.find(
          (r) =>
            String(r.idResolucion) === String(id) ||
            String(r.codigoResolucion) === String(id) ||
            String(r.numeroResolucion).includes(id)
        );
        if (!cancelado) {
          if (encontrada) {
            setResolucion(encontrada);
          } else {
            setErrorCarga(err.message || 'No se pudo cargar la resolución oficial.');
          }
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargarResolucion();
    return () => {
      cancelado = true;
    };
  }, [id, resolucion]);

  // Formato de fecha completa
  const formatearFechaLarga = (fechaStr) => {
    if (!fechaStr) return '';
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) return fechaStr;
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return fechaStr;
    }
  };

  const getCategoriaBadgeClass = (nombreCategoria = '') => {
    const cat = String(nombreCategoria).toUpperCase();
    if (cat.includes('ACADÉMICA') || cat.includes('ACADEMICA')) return 'badge-cat-academica';
    if (cat.includes('GRADO')) return 'badge-cat-grado';
    return 'badge-cat-default';
  };

  const renderEstadoBadge = (estado = '') => {
    const estadoInfo = obtenerEstadoResolucion(estado);
    return (
      <span className={`estado-indicador-badge ${estadoInfo.clase}`} aria-label={`Estado: ${estadoInfo.etiqueta}`}>
        <span className="estado-dot" style={{ backgroundColor: estadoInfo.color }} />
        <span className="estado-texto">{estadoInfo.etiqueta}</span>
      </span>
    );
  };

  if (cargando) {
    return (
      <main className="detalle-resolucion-pagina d-flex align-items-center justify-content-center">
        <div className="text-center py-5">
          <div className="spinner-border text-warning mb-3" role="status">
            <span className="visually-hidden">Cargando resolución...</span>
          </div>
          <p className="text-secondary font-monospace">Cargando documento oficial de resolución...</p>
        </div>
      </main>
    );
  }

  if (errorCarga || !resolucion) {
    return (
      <main className="detalle-resolucion-pagina">
        <div className="detalle-resolucion-contenedor">
          <div className="alert alert-danger d-flex align-items-center justify-content-between p-4" role="alert">
            <div>
              <h5 className="alert-heading mb-1">Resolución no encontrada</h5>
              <p className="mb-0 text-muted small">{errorCarga || 'El documento solicitado no existe o fue retirado.'}</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => navigate('/resoluciones')}
            >
              Volver a Resoluciones
            </button>
          </div>
        </div>
      </main>
    );
  }

  const versionTexto = `v${resolucion.versionActual || 1}`;
  const codigoId = resolucion.codigoResolucion || `RES-2026-${String(resolucion.idResolucion || 1).padStart(3, '0')}`;
  const nombreArchivo =
    resolucion.archivoPrincipal?.nombre ||
    `${resolucion.numeroResolucion?.replace(/[\s./]/g, '_') || 'Resolucion_Oficial'}.pdf`;

  const etiquetas =
    resolucion.etiquetas && resolucion.etiquetas.length > 0
      ? resolucion.etiquetas
      : ['CALENDARIO', '2026', 'RECTORADO'];

  const historial = resolucion.historialVersiones || [
    { version: versionTexto, fecha: '17/04/2026', descripcion: `Publicada por ${resolucion.rolAutor || 'Secretaría'}` },
    { version: 'v1', fecha: '15/04/2026', descripcion: 'Aprobada por Autoridad' },
    { version: 'v0', fecha: '13/04/2026', descripcion: 'Creada (borrador)' },
  ];

  const descargarArchivo = () => {
    const url = resolucion.archivoPrincipal?.url;
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const contenido = `UNIVERSIDAD PROVINCIAL DE CÓRDOBA\n\nResolución Oficial: ${resolucion.numeroResolucion}\nTítulo: ${resolucion.titulo}\nCategoría: ${resolucion.nombreCategoria || 'ACADÉMICA'}\nEstado: ${resolucion.estado}\nVersión: ${versionTexto}\n\nTexto Documental:\n${resolucion.descripcion || 'Sin descripción'}\n\nObservaciones:\n${resolucion.observaciones || 'Ninguna'}`;
      const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = nombreArchivo.replace(/\.pdf$/i, '.txt');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }
  };

  const handleGuardadoExitoso = (mensaje) => {
    setNotificacion({ tipo: 'success', mensaje });
    resolucionesService
      .obtenerPorId(id)
      .then((data) => data && setResolucion(data))
      .catch(() => {});
  };

  return (
    <main className="detalle-resolucion-pagina">
      <ToastNotificacion
        visible={Boolean(notificacion?.mensaje)}
        tipo={notificacion?.tipo || 'success'}
        mensaje={notificacion?.mensaje || ''}
        onCerrar={() => setNotificacion(null)}
      />

      <div className="detalle-resolucion-contenedor">
        {/* Barra superior: Migas de Pan con estilo exacto de Detalle Noticia */}
        <div className="detalle-resolucion-header-nav">
          <nav className="detalle-res-breadcrumb" aria-label="Migas de pan">
            <Link to="/resoluciones" className="detalle-res-breadcrumb-tag" title="Volver al listado">
              Módulo Institucional
            </Link>
            <span className="detalle-res-breadcrumb-separador" aria-hidden="true">/</span>
            <Link to="/resoluciones" className="detalle-res-breadcrumb-volver">
              Volver a Resoluciones
            </Link>
          </nav>

          {esAdmin && (
            <button
              type="button"
              className="detalle-res-btn-editar"
              onClick={() => setModalEdicionAbierto(true)}
              title="Editar esta resolución"
              aria-label={`Editar resolución: ${resolucion.titulo || ''}`}
            >
              <IconoEditar />
              <span>Editar resolución</span>
            </button>
          )}
        </div>

        {/* Tarjeta Principal de Lectura Oficial */}
        <article className="detalle-resolucion-card">
          {/* Fila superior con badges */}
          <div className="detalle-res-top-meta">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className={`badge-categoria-pill ${getCategoriaBadgeClass(resolucion.nombreCategoria)}`}>
                {resolucion.nombreCategoria || 'ACADÉMICA'}
              </span>
              {renderEstadoBadge(resolucion.estado)}
              <span className="badge-version-pill">{versionTexto}</span>
            </div>
            <span className="detalle-res-codigo-id">{codigoId}</span>
          </div>

          {/* Título Oficial */}
          <h1 className="detalle-res-titulo">
            {resolucion.numeroResolucion} — {resolucion.titulo}
          </h1>

          {/* Metadatos de Autor, Rol y Fecha con iconos */}
          <div className="detalle-res-meta-fila">
            <div className="detalle-res-meta-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <strong>{resolucion.nombreAutor || 'Esmeralda Nieves Urtizbey'}</strong>
            </div>

            <span className="text-muted" aria-hidden="true">•</span>

            <div className="detalle-res-meta-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Rol: <strong>{resolucion.rolAutor || 'Secretaría'}</strong></span>
            </div>

            <span className="text-muted" aria-hidden="true">•</span>

            <div className="detalle-res-meta-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <time dateTime={resolucion.fechaCreacion}>
                {formatearFechaLarga(resolucion.fechaCreacion)}
              </time>
            </div>
          </div>

          {/* Cuerpo Formal del Documento */}
          <div className="detalle-res-documento-box">
            <p className="detalle-res-texto-formal">
              {resolucion.descripcion || 'Sin descripción disponible para esta resolución institucional.'}
            </p>
          </div>

          {/* Chips de Etiquetas */}
          <div className="detalle-res-etiquetas">
            {etiquetas.map((tag, idx) => (
              <span key={idx} className="detalle-res-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Caja de Descarga PDF */}
          <div className="detalle-res-pdf-card">
            <div className="detalle-res-pdf-info">
              <div className="detalle-res-pdf-icono" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <div>
                <div className="detalle-res-pdf-nombre">{nombreArchivo}</div>
                <div className="detalle-res-pdf-sub">Documento oficial verificado en formato PDF</div>
              </div>
            </div>

            <button
              type="button"
              className="detalle-res-btn-descargar"
              onClick={descargarArchivo}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Descargar documento</span>
            </button>
          </div>

          {/* Historial de cambios */}
          <section className="detalle-res-seccion-secundaria" aria-label="Historial de versiones">
            <h2 className="detalle-res-secundaria-titulo">Historial de cambios</h2>
            <div className="detalle-res-historial-lista">
              {historial.map((h, i) => (
                <div key={i} className="detalle-res-historial-item">
                  <span className="text-secondary">
                    {h.fecha} — {h.descripcion}
                  </span>
                  <span className="detalle-res-version-pill">{h.version}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Observaciones institucionales */}
          {resolucion.observaciones && (
            <div className="detalle-res-observaciones">
              <strong>Observaciones:</strong> {resolucion.observaciones}
            </div>
          )}

          {/* Sección de Consultas y Comentarios sobre la resolución */}
          <SeccionComentariosResolucion resolucion={resolucion} idResolucion={id} />

          {/* Enlace inferior de regreso */}
          <div className="detalle-res-footer-volver">
            <Link to="/resoluciones" className="detalle-res-link-volver">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Volver a la nómina de resoluciones</span>
            </Link>
          </div>
        </article>
      </div>

      {/* Modal de Edición si es Admin */}
      {modalEdicionAbierto && (
        <ModalEditarResolucion
          resolucion={resolucion}
          categorias={categorias}
          isOpen={modalEdicionAbierto}
          onClose={() => setModalEdicionAbierto(false)}
          onGuardadoExitoso={handleGuardadoExitoso}
        />
      )}
    </main>
  );
};

export default DetalleResolucionPage;

