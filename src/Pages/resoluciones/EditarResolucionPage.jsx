import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import { archivosResolucionService } from '../../Services/resoluciones/archivosResolucionService';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion';
import './EditarResolucionPage.css';

/* ==========================================================================
   Iconos vectoriales limpios (SVG) - Sin emojis
   ========================================================================== */
const IconoVolver = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconoGuardar = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconoDocumento = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconoSubir = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconoOjo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconoAlerta = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/**
 * Página dedicada para la edición completa de una Resolución Académica.
 * Sustituye el modal por una ventana/ruta completa (análogo a EditarNoticia).
 */
export const EditarResolucionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AppContext);

  const resolucionInicial = location.state?.resolucion || null;

  // Estados del formulario
  const [resolucion, setResolucion] = useState(resolucionInicial);
  const [numeroResolucion, setNumeroResolucion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [estado, setEstado] = useState('VIGENTE');
  const [observaciones, setObservaciones] = useState('');
  const [archivoActualNombre, setArchivoActualNombre] = useState('');
  const [nuevoArchivoPdf, setNuevoArchivoPdf] = useState(null);

  // Estados de datos auxiliares y carga
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(!resolucionInicial);
  const [guardando, setGuardando] = useState(false);
  const [errorCarga, setErrorCarga] = useState('');
  const [errorGuardado, setErrorGuardado] = useState('');
  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success', accion: null });

  // 1. Cargar datos de la resolución y categorías
  useEffect(() => {
    let activa = true;

    const cargarDatos = async () => {
      try {
        setErrorCarga('');

        const [categoriasData, resData] = await Promise.all([
          categoriasResolucionService.obtenerTodas(),
          resolucionInicial ? Promise.resolve(resolucionInicial) : resolucionesService.obtenerPorId(id),
        ]);

        if (!activa) return;

        if (Array.isArray(categoriasData)) {
          setCategorias(categoriasData);
        }

        if (resData) {
          setResolucion(resData);
          setNumeroResolucion(resData.numeroResolucion || '');
          setTitulo(resData.titulo || '');
          setDescripcion(resData.descripcion || '');
          setIdCategoria(String(resData.idCategoria || (categoriasData[0]?.idCategoria ?? '')));
          setEstado(resData.estado || 'VIGENTE');
          setObservaciones(resData.observaciones || '');

          const nombrePdf =
            resData.archivoPrincipal?.nombre ||
            `${(resData.numeroResolucion || 'Resolucion').replace(/[\s./]/g, '_')}.pdf`;
          setArchivoActualNombre(nombrePdf);
        } else {
          setErrorCarga('No se encontró la información de la resolución solicitada.');
        }
      } catch (err) {
        if (!activa) return;
        setErrorCarga(err.message || 'Error al cargar los datos de la resolución.');
      } finally {
        if (activa) setCargando(false);
      }
    };

    cargarDatos();

    return () => {
      activa = false;
    };
  }, [id, resolucionInicial]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorGuardado('');

    const numLimpio = numeroResolucion.trim();
    if (!numLimpio) {
      setErrorGuardado('El número de resolución es obligatorio (ej: Res. Rectoral 0542/2026).');
      return;
    }

    const tituloLimpio = titulo.trim();
    if (!tituloLimpio) {
      setErrorGuardado('El título oficial de la resolución es obligatorio.');
      return;
    }

    if (!idCategoria) {
      setErrorGuardado('Debes seleccionar una categoría institucional.');
      return;
    }

    try {
      setGuardando(true);

      const versionActual = resolucion?.versionActual || 1;
      const payload = {
        numeroResolucion: numLimpio,
        titulo: tituloLimpio,
        descripcion: descripcion.trim(),
        idCategoria: Number(idCategoria),
        idAutor: resolucion?.idAutor || user?.idUsuario || 1,
        versionActual: versionActual + 1,
        observaciones: observaciones.trim() || 'Modificación registrada por personal institucional.',
        estado: estado.toUpperCase(),
      };

      // 1. Actualizar la resolución en el backend
      const idAutorFinal = Number(resolucion?.idAutor || user?.idUsuario || user?.id || 1);
      await resolucionesService.actualizar(id, payload, idAutorFinal);

      // 2. Si se adjuntó un nuevo PDF, registrar el archivo
      if (nuevoArchivoPdf) {
        try {
          const archivoPayload = {
            idResolucion: Number(id),
            nombre: nuevoArchivoPdf.name,
            url: URL.createObjectURL(nuevoArchivoPdf),
            tipo: 'application/pdf',
          };
          await archivosResolucionService.guardar(archivoPayload);
          setArchivoActualNombre(nuevoArchivoPdf.name);
          setNuevoArchivoPdf(null);
        } catch (errArchivo) {
          console.warn('Metadatos de archivo guardados con advertencia:', errArchivo);
        }
      }

      const nombresEstado = {
        VIGENTE: 'Vigente',
        PENDIENTE: 'Pendiente de revisión',
        ARCHIVADA: 'Archivada',
      };
      const estadoTexto = nombresEstado[payload.estado] || payload.estado;
      const mensajeConfirmacion = `¡La resolución se actualizó exitosamente! (Estado: ${estadoTexto})`;

      // Actualizar el estado local para reflejar la nueva versión y datos
      setResolucion((prev) => ({
        ...(prev || {}),
        ...payload,
        idResolucion: id,
        versionActual: payload.versionActual,
      }));

      setToast({
        visible: true,
        tipo: 'success',
        mensaje: mensajeConfirmacion,
        accion: {
          texto: 'Ver listado',
          onClick: () => navigate('/resoluciones'),
        },
      });
    } catch (err) {
      setErrorGuardado(err.message || 'Error al guardar los cambios de la resolución.');
    } finally {
      setGuardando(false);
    }
  };

  // Estado de carga inicial
  if (cargando) {
    return (
      <main className="editar-resolucion-pagina">
        <div className="editar-resolucion-cargando" role="status">
          <div className="spinner-border text-warning mb-3" aria-hidden="true" />
          <p className="text-muted m-0">Cargando información de la resolución...</p>
        </div>
      </main>
    );
  }

  // Estado de error al cargar
  if (errorCarga) {
    return (
      <main className="editar-resolucion-pagina">
        <div className="editar-resolucion-error" role="alert">
          <IconoAlerta />
          <h2>Error al cargar la resolución</h2>
          <p>{errorCarga}</p>
          <button
            type="button"
            className="editar-resolucion__boton-secundario"
            onClick={() => navigate('/resoluciones')}
          >
            <IconoVolver />
            <span>Volver al listado de resoluciones</span>
          </button>
        </div>
      </main>
    );
  }

  const versionActual = resolucion?.versionActual || 1;

  return (
    <main className="editar-resolucion-pagina">
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        accion={toast.accion}
        onCerrar={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      <div className="editar-resolucion-contenedor">
        {/* 1. Migas de Pan */}
        <nav className="editar-resolucion-breadcrumb" aria-label="Migas de pan">
          <Link to="/resoluciones" className="editar-resolucion-breadcrumb-link">
            <IconoVolver />
            <span>Resoluciones Académicas</span>
          </Link>
          <span className="editar-resolucion-breadcrumb-separador" aria-hidden="true">/</span>
          <span className="editar-resolucion-breadcrumb-actual">Editar Resolución</span>
        </nav>

        {/* 2. Encabezado Oficial */}
        <header className="editar-resolucion-header">
          <div className="editar-resolucion-header-info">
            <div className="editar-resolucion-header-top">
              <h1 className="editar-resolucion-titulo">Editar Resolución</h1>
              <span className="editar-resolucion-badge-id">
                {numeroResolucion || `ID #${id}`}
              </span>
            </div>
            <p className="editar-resolucion-subtitulo">
              Modificá el contenido oficial, categoría, estado y documento adjunto de la resolución.
            </p>
          </div>

          <div className="editar-resolucion-meta-version" title="Historial de versiones de la resolución">
            <IconoDocumento />
            <span>Versión v{versionActual} → v{versionActual + 1}</span>
          </div>
        </header>

        {/* Alerta de error al guardar */}
        {errorGuardado && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
            <IconoAlerta />
            <span>{errorGuardado}</span>
          </div>
        )}

        {/* 3. Tarjeta del Formulario Principal */}
        <div className="editar-resolucion-card">
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="editar-resolucion-seccion-titulo">
              <IconoDocumento />
              <span>Datos Institucionales</span>
            </h2>

            <div className="row g-3 mb-4">
              {/* Número de resolución */}
              <div className="col-md-6">
                <label htmlFor="numeroResolucion" className="editar-resolucion-label">
                  <span>Número de Resolución</span>
                  <span className="editar-resolucion-label-requerido">*</span>
                </label>
                <input
                  id="numeroResolucion"
                  type="text"
                  className="editar-resolucion-input"
                  placeholder="Ej: Res. Rectoral 0542/2026"
                  value={numeroResolucion}
                  onChange={(e) => setNumeroResolucion(e.target.value)}
                  disabled={guardando}
                  required
                />
              </div>

              {/* Selector de Estado institucional (Sin emojis) */}
              <div className="col-md-6">
                <label htmlFor="estadoResolucion" className="editar-resolucion-label">
                  <span>Estado de la Disposición</span>
                  <span className="editar-resolucion-label-requerido">*</span>
                </label>
                <select
                  id="estadoResolucion"
                  className="editar-resolucion-select editar-resolucion-select--estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  disabled={guardando}
                >
                  <option value="VIGENTE">Vigente (Pública)</option>
                  <option value="PENDIENTE">Pendiente de Revisión</option>
                  <option value="ARCHIVADA">Archivada (Histórica)</option>
                </select>
              </div>

              {/* Categoría Institucional */}
              <div className="col-12">
                <label htmlFor="idCategoria" className="editar-resolucion-label">
                  <span>Categoría Temática</span>
                  <span className="editar-resolucion-label-requerido">*</span>
                </label>
                <select
                  id="idCategoria"
                  className="editar-resolucion-select"
                  value={idCategoria}
                  onChange={(e) => setIdCategoria(e.target.value)}
                  disabled={guardando}
                >
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Título Oficial */}
              <div className="col-12">
                <label htmlFor="tituloResolucion" className="editar-resolucion-label">
                  <span>Título Oficial</span>
                  <span className="editar-resolucion-label-requerido">*</span>
                </label>
                <input
                  id="tituloResolucion"
                  type="text"
                  className="editar-resolucion-input"
                  placeholder="Ej: Calendario Académico Período Lectivo 2026"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  disabled={guardando}
                  required
                />
              </div>

              {/* Cuerpo y Descripción */}
              <div className="col-12">
                <label htmlFor="descripcionResolucion" className="editar-resolucion-label">
                  <span>Cuerpo y Descripción de la Resolución</span>
                </label>
                <textarea
                  id="descripcionResolucion"
                  className="editar-resolucion-textarea"
                  rows="5"
                  placeholder="Ingresá los considerandos, artículos y resuelve de la resolución..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  disabled={guardando}
                />
              </div>

              {/* Observaciones y Notas */}
              <div className="col-12">
                <label htmlFor="observacionesResolucion" className="editar-resolucion-label">
                  <span>Observaciones y Notas de Modificación</span>
                </label>
                <textarea
                  id="observacionesResolucion"
                  className="editar-resolucion-textarea"
                  rows="2"
                  placeholder="Motivo de la actualización o notas para el registro institucional..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  disabled={guardando}
                />
              </div>

              {/* Documento PDF Adjunto */}
              <div className="col-12">
                <label className="editar-resolucion-label">
                  <span>Documento PDF Oficial</span>
                </label>
                <div className="editar-resolucion-archivo-box">
                  <div className="editar-resolucion-archivo-actual">
                    <div className="editar-resolucion-archivo-info">
                      <span className="editar-resolucion-archivo-badge">PDF</span>
                      <span>{nuevoArchivoPdf ? nuevoArchivoPdf.name : archivoActualNombre}</span>
                    </div>
                    {nuevoArchivoPdf && (
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                        onClick={() => setNuevoArchivoPdf(null)}
                      >
                        Quitar nuevo
                      </button>
                    )}
                  </div>

                  <p className="editar-resolucion-upload-subtext">
                    {nuevoArchivoPdf
                      ? 'Se reemplazará el documento oficial al guardar los cambios.'
                      : 'Si deseás reemplazar el documento actual, seleccioná un nuevo archivo PDF (máx. 10MB).'}
                  </p>

                  <div className="d-flex align-items-center gap-2">
                    <label
                      htmlFor="archivoPdfInput"
                      className="editar-resolucion__boton-secundario m-0 py-2"
                      style={{ cursor: 'pointer' }}
                    >
                      <IconoSubir />
                      <span>{nuevoArchivoPdf ? 'Cambiar archivo' : 'Seleccionar nuevo PDF'}</span>
                    </label>
                    <input
                      id="archivoPdfInput"
                      type="file"
                      accept=".pdf"
                      className="d-none"
                      onChange={(e) => setNuevoArchivoPdf(e.target.files?.[0] || null)}
                      disabled={guardando}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Barra de Acciones y Botones con diseño de la página */}
            <div className="editar-resolucion-acciones">
              <div className="editar-resolucion-acciones-grupo">
                <button
                  type="button"
                  className="editar-resolucion__boton-secundario"
                  onClick={() => navigate('/resoluciones')}
                  disabled={guardando}
                >
                  <IconoVolver />
                  <span>Cancelar</span>
                </button>

                <Link
                  to={`/resoluciones/${id}`}
                  className="editar-resolucion__boton-outline"
                  title="Ver detalle público de esta resolución"
                >
                  <IconoOjo />
                  <span>Ver detalle</span>
                </Link>
              </div>

              <div className="editar-resolucion-acciones-grupo">
                <button
                  type="submit"
                  className="editar-resolucion__boton-principal"
                  disabled={guardando}
                >
                  <IconoGuardar />
                  <span>{guardando ? 'Guardando cambios...' : 'Guardar cambios'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditarResolucionPage;

