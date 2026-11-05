import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../../../Context/AppContext';
import { puedeAccederGestion } from '../../../hooks/useRoles';
import { comentariosService } from '../../../Services/resoluciones/comentariosService';
import { ToastNotificacion } from '../../shared/ToastNotificacion';
import './styles/ComentariosResolucion.css';

const CARRERAS_SUGERIDAS_UPC = [
  // Carreras de Grado
  { id: 1, nombre: 'Profesorado Universitario de Biología' },

  // Carreras de Grado y Pregrado
  { id: 2, nombre: 'Licenciatura en Administración de Empresas c/ título intermedio Tecnicatura Universitaria en Gestión Empresarial' },
  { id: 3, nombre: 'Licenciatura en Diseño con titulación intermedia Tecnicatura Universitaria en Tecnologías del Diseño' },
  { id: 4, nombre: 'Licenciatura en Administración de Empresas' },
  { id: 5, nombre: 'Tecnicatura Universitaria en Gestión Empresarial' },
  { id: 6, nombre: 'Licenciatura en Diseño' },
  { id: 7, nombre: 'Tecnicatura Universitaria en Tecnologías del Diseño' },

  // Carreras de Pregrado
  { id: 8, nombre: 'Tecnicatura Universitaria en Diseño Gráfico' },
  { id: 9, nombre: 'Tecnicatura Universitaria en Guía de Turismo' },
  { id: 10, nombre: 'Tecnicatura Universitaria en Hotelería' },
  { id: 11, nombre: 'Tecnicatura Universitaria en Marketing y Negocios Digitales' },
  { id: 12, nombre: 'Tecnicatura Universitaria en Programación Full Stack' },

  // Carreras Superiores
  { id: 13, nombre: 'Tecnicatura Superior en Prótesis Dental' },
];

const OPCIONES_ANIO_CARRERA = [1, 2, 3, 4, 5];

const IconoAlerta = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const SeccionComentariosResolucion = ({ resolucion, idResolucion }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const esAdmin = puedeAccederGestion(user);

  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Formulario
  const [carrera, setCarrera] = useState('');
  const [anioCarrera, setAnioCarrera] = useState('');
  const [contenido, setContenido] = useState('');
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notificación flotante de estado (mismo patrón que Crear Noticias)
  const [toast, setToast] = useState({
    visible: false,
    mensaje: '',
    tipo: 'success',
  });

  // ID de resolución normalizado
  const resId = idResolucion || resolucion?.idResolucion || resolucion?.id;

  // Persistencia de comentarios enviados en la sesión actual
  const [comentariosLocales, setComentariosLocales] = useState(() => {
    try {
      const guardados = sessionStorage.getItem(`comentarios_upc_${resId}`);
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  // Cargar comentarios asociados a la resolución (solo para administradores)
  const cargarComentarios = async () => {
    if (!resId) return;
    // Los estudiantes solo ven sus propios comentarios; solo el admin consulta el servidor
    if (!esAdmin) {
      setCargando(false);
      return;
    }
    try {
      setCargando(true);
      const data = await comentariosService.obtenerPorResolucion(resId, true);
      setComentarios(Array.isArray(data) ? data : []);
    } catch {
      setComentarios([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, [resId]);

  // Manejo de cambios con limpieza de error en tiempo real
  const handleCambioCarrera = (e) => {
    setCarrera(e.target.value);
    if (errores.carrera) {
      setErrores((prev) => ({ ...prev, carrera: '' }));
    }
  };

  const handleCambioAnio = (e) => {
    setAnioCarrera(e.target.value);
    if (errores.anioCarrera) {
      setErrores((prev) => ({ ...prev, anioCarrera: '' }));
    }
  };

  const handleCambioContenido = (e) => {
    setContenido(e.target.value);
    if (errores.contenido) {
      setErrores((prev) => ({ ...prev, contenido: '' }));
    }
  };

  // Manejo de validación y envío de nueva consulta
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setToast({
        visible: true,
        tipo: 'error',
        mensaje: 'Debes iniciar sesión con tu cuenta estudiantil para enviar una consulta.',
      });
      return;
    }

    const nuevosErrores = {};
    const carreraLimpia = carrera.trim();
    if (!carreraLimpia) {
      nuevosErrores.carrera = 'Por favor, ingresá el nombre de tu carrera.';
    }

    if (!anioCarrera) {
      nuevosErrores.anioCarrera = 'Por favor, seleccioná el año que estás cursando.';
    }

    const contenidoLimpio = contenido.trim();
    if (!contenidoLimpio) {
      nuevosErrores.contenido = 'Por favor, escribí el detalle de tu consulta.';
    } else if (contenidoLimpio.length < 8) {
      nuevosErrores.contenido = 'La consulta debe contener al menos 8 caracteres.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setToast({
        visible: true,
        tipo: 'warning',
        mensaje: 'Por favor, revisá los campos señalados para continuar.',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Buscar si coincide con alguna carrera de referencia o usar ID 1 como fallback
      const carreraMatch = CARRERAS_SUGERIDAS_UPC.find(
        (c) => c.nombre.toLowerCase() === carreraLimpia.toLowerCase()
      );
      const idCarreraFinal = carreraMatch ? carreraMatch.id : 1;
      const idUsuarioActual = Number(user.idUsuario ?? user.id);

      // DTO estricto según la definición de ComentarioRequestDTO en el backend
      const requestDTO = {
        idUsuario: idUsuarioActual,
        idResolucion: Number(resId),
        idCarrera: idCarreraFinal,
        anioCarrera: Number(anioCarrera),
        contenido: contenidoLimpio,
        estado: 'PENDIENTE',
      };

      const respuestaBackend = await comentariosService.crear(requestDTO);

      // Guardar también en la lista local de la sesión para visualización inmediata garantizada
      const comentarioRegistrado = {
        ...requestDTO,
        nombreCarrera: carreraLimpia,
        idComentario: respuestaBackend?.idComentario || `local-${Date.now()}`,
        nombreUsuario: user.nombre || user.email || 'Estudiante',
        fechaCreacion: new Date().toISOString(),
      };

      const listaActualizada = [comentarioRegistrado, ...comentariosLocales];
      setComentariosLocales(listaActualizada);
      try {
        sessionStorage.setItem(`comentarios_upc_${resId}`, JSON.stringify(listaActualizada));
      } catch {}

      setToast({
        visible: true,
        tipo: 'success',
        mensaje: 'Tu consulta ha sido enviada con éxito y quedó registrada en revisión.',
      });

      // Limpiar formulario y errores
      setContenido('');
      setErrores({});

      // Recargar comentarios para reflejar inmediatamente el comentario propio en revisión
      await cargarComentarios();
    } catch (err) {
      setToast({
        visible: true,
        tipo: 'error',
        mensaje: err.message || 'Error al registrar tu consulta. Intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrado de comentarios según rol de acceso estricto:
  // - Administrador: Ve todos los comentarios de esta resolución.
  // - Estudiante / Usuario autenticado: Solo ve sus propios comentarios.
  // - Público general no autenticado: No ve ningún comentario.
  const comentariosVisibles = useMemo(() => {
    if (!user) return [];
    if (esAdmin) return comentarios;

    const idActual = String(user.idUsuario ?? user.id);
    const delServidor = comentarios.filter((c) => String(c.idUsuario) === idActual);

    const idsExistentes = new Set(delServidor.map((c) => c.idComentario).filter(Boolean));
    const localesFiltrados = comentariosLocales.filter(
      (c) => !c.idComentario || !idsExistentes.has(c.idComentario)
    );

    return [...localesFiltrados, ...delServidor];
  }, [user, esAdmin, comentarios, comentariosLocales]);

  // Formateador amigable de fecha
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'Reciente';
    try {
      const f = new Date(fechaStr);
      if (isNaN(f.getTime())) return fechaStr;
      return f.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return fechaStr;
    }
  };

  // Renderizar badge textual SIN emojis
  const renderBadgeEstado = (estado = '') => {
    const est = String(estado).toUpperCase();
    if (est === 'PENDIENTE') {
      return <span className="comentario-badge comentario-badge--revision">En revisión</span>;
    }
    if (est === 'APROBADO') {
      return <span className="comentario-badge comentario-badge--revisado">Registrado y revisado</span>;
    }
    if (est === 'RECHAZADO') {
      return <span className="comentario-badge comentario-badge--rechazado">No admitido</span>;
    }
    return <span className="comentario-badge comentario-badge--revision">{estado}</span>;
  };

  return (
    <section className="seccion-comentarios-resolucion" aria-label="Consultas y comentarios sobre la resolución">
      {/* Notificación flotante institucional idéntica a Crear Noticias */}
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        onCerrar={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      <div className="seccion-comentarios-header">
        <h2 className="seccion-comentarios-titulo">
          Consultas sobre esta resolución
          {user && comentariosVisibles.length > 0 && (
            <span className="seccion-comentarios-badge-count">{comentariosVisibles.length}</span>
          )}
        </h2>

        {esAdmin && (
          <Link
            to="/resoluciones/comentarios-pendientes"
            className="btn btn-sm btn-outline-secondary"
            title="Abrir panel administrativo de moderación"
          >
            Bandeja de moderación
          </Link>
        )}
      </div>

      {/* CASO 1: Usuario no autenticado */}
      {!user ? (
        <div className="comentarios-auth-prompt">
          <div className="comentarios-auth-prompt-texto">
            <h4>¿Tenés alguna consulta o duda sobre esta resolución?</h4>
            <p>
              Iniciá sesión con tu cuenta estudiantil de la Universidad para realizar una consulta institucional.
            </p>
          </div>
          <Link
            to="/login"
            state={{ from: location }}
            className="comentarios-btn-login"
          >
            Iniciar sesión para consultar
          </Link>
        </div>
      ) : (
        /* CASO 2: Usuario autenticado (Formulario de consulta) */
        <>
          <div className="comentarios-formulario-card">
            <div className="comentarios-formulario-head">
              <h3>Realizar una consulta</h3>
              <span className="comentarios-usuario-tag">
                Consultando como: <strong>{user.nombre || user.email}</strong>
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="comentarios-grid-campos">
                <div className={`comentarios-campo-group ${errores.carrera ? 'comentarios-campo-group--con-error' : ''}`}>
                  <label htmlFor="campo-carrera">
                    Carrera que cursás <span className="comentarios-requerido">*</span>
                  </label>
                  <input
                    id="campo-carrera"
                    type="text"
                    list="lista-carreras-upc"
                    className="comentarios-input"
                    placeholder="Escribí el nombre de tu carrera"
                    value={carrera}
                    onChange={handleCambioCarrera}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errores.carrera)}
                  />
                  <datalist id="lista-carreras-upc">
                    {CARRERAS_SUGERIDAS_UPC.map((c) => (
                      <option key={c.id} value={c.nombre} />
                    ))}
                  </datalist>

                  {errores.carrera && (
                    <span className="comentario-error-texto" role="alert">
                      <IconoAlerta />
                      <span>{errores.carrera}</span>
                    </span>
                  )}
                </div>

                <div className={`comentarios-campo-group ${errores.anioCarrera ? 'comentarios-campo-group--con-error' : ''}`}>
                  <label htmlFor="campo-anio">
                    Año de la carrera <span className="comentarios-requerido">*</span>
                  </label>
                  <select
                    id="campo-anio"
                    className="comentarios-select"
                    value={anioCarrera}
                    onChange={handleCambioAnio}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errores.anioCarrera)}
                  >
                    <option value="">Seleccioná el año</option>
                    {OPCIONES_ANIO_CARRERA.map((num) => (
                      <option key={num} value={num}>
                        {num}° año
                      </option>
                    ))}
                  </select>

                  {errores.anioCarrera && (
                    <span className="comentario-error-texto" role="alert">
                      <IconoAlerta />
                      <span>{errores.anioCarrera}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className={`comentarios-campo-group ${errores.contenido ? 'comentarios-campo-group--con-error' : ''}`}>
                <div className="comentarios-campo-encabezado">
                  <label htmlFor="campo-contenido">
                    Detalle de tu consulta o duda <span className="comentarios-requerido">*</span>
                  </label>
                  <span className={`comentarios-contador ${contenido.length > 900 ? 'comentarios-contador--limite' : ''}`}>
                    {contenido.length} / 1000
                  </span>
                </div>
                <textarea
                  id="campo-contenido"
                  className="comentarios-textarea"
                  placeholder="Escribí de manera clara tu consulta sobre los alcances, fechas o requisitos de esta resolución..."
                  value={contenido}
                  onChange={handleCambioContenido}
                  disabled={isSubmitting}
                  maxLength={1000}
                  aria-invalid={Boolean(errores.contenido)}
                />

                {errores.contenido && (
                  <span className="comentario-error-texto" role="alert">
                    <IconoAlerta />
                    <span>{errores.contenido}</span>
                  </span>
                )}
              </div>

              <div className="comentarios-formulario-footer">
                <div className="comentarios-aviso-moderacion">
                  <span>Tu consulta quedará registrada para revisión de la administración académica.</span>
                </div>
                <button
                  type="submit"
                  className="comentarios-btn-enviar"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando consulta...' : 'Enviar consulta'}
                </button>
              </div>
            </form>
          </div>

          {/* Listado de comentarios */}
          <div className="comentarios-lista-wrapper">
            <h3 className="comentarios-lista-titulo">
              {esAdmin ? 'Consultas registradas en esta resolución' : 'Mis consultas en esta resolución'}
            </h3>

            {cargando ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-warning" role="status">
                  <span className="visually-hidden">Cargando consultas...</span>
                </div>
              </div>
            ) : comentariosVisibles.length === 0 ? (
              <div className="comentarios-vacio-box">
                {esAdmin
                  ? 'No hay consultas registradas para esta resolución.'
                  : 'Aún no has registrado consultas sobre esta resolución institucional.'}
              </div>
            ) : (
              <div className="comentarios-lista">
                {comentariosVisibles.map((c) => {
                  const nombre = c.nombreUsuario || c.nombreEstudiante || user.nombre || 'Estudiante';
                  const inicial = nombre.charAt(0).toUpperCase() || 'E';
                  const nombreCarrera = c.nombreCarrera || c.carrera || 'Carrera universitaria';
                  const anio = c.anioCarrera ? `${c.anioCarrera}° año` : '';

                  return (
                    <article
                      key={c.idComentario || `${c.idResolucion}-${c.fechaCreacion}-${Math.random()}`}
                      className="comentario-item-card"
                    >
                      <div className="comentario-item-head">
                        <div className="comentario-autor-info">
                          <div className="comentario-avatar" aria-hidden="true">
                            {inicial}
                          </div>
                          <div className="comentario-autor-texto">
                            <span className="comentario-autor-nombre">{nombre}</span>
                            <span className="comentario-autor-carrera">
                              {nombreCarrera} {anio ? `— ${anio}` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="comentario-meta-head">
                          {renderBadgeEstado(c.estado)}
                          <time className="comentario-fecha" dateTime={c.fechaCreacion}>
                            {formatearFecha(c.fechaCreacion)}
                          </time>
                        </div>
                      </div>

                      <p className="comentario-cuerpo">{c.contenido}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SeccionComentariosResolucion;
