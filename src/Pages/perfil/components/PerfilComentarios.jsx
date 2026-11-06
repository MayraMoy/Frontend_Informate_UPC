import React from 'react';
import { Link } from 'react-router-dom';
import usePerfilComentarios from '../hooks/usePerfilComentarios.js';
import PerfilComentarioItem from './PerfilComentarioItem.jsx';
import ModalConfirmarEliminarComentario from './ModalConfirmarEliminarComentario.jsx';
import { ToastNotificacion } from '../../../Components/shared/ToastNotificacion.jsx';
import '../styles/PerfilComentarios.css';

export const PerfilComentarios = ({ user }) => {
  const {
    comentarios,
    comentariosFiltrados,
    resolucionesMap,
    cargando,
    error,
    mensajeExito,
    filtroEstado,
    busqueda,
    metricas,
    comentarioAEliminar,
    eliminando,
    setFiltroEstado,
    setBusqueda,
    limpiarFiltros,
    recargar,
    abrirModalEliminar,
    cerrarModalEliminar,
    ejecutarEliminacion,
    limpiarMensajeExito,
    limpiarError,
  } = usePerfilComentarios(user);

  return (
    <section className="perfil-comentarios-seccion" aria-labelledby="seccion-comentarios-titulo">
      {/* Notificación flotante de éxito al eliminar */}
      <ToastNotificacion
        visible={Boolean(mensajeExito)}
        tipo="success"
        mensaje={mensajeExito}
        onCerrar={limpiarMensajeExito}
      />

      {/* Cabecera de la sección */}
      <header className="perfil-comentarios-header">
        <div>
          <span className="perfil-comentarios-eyebrow">Actividad Comunitaria</span>
          <h2 id="seccion-comentarios-titulo" className="perfil-comentarios-titulo">
            Mis Comentarios en Resoluciones
          </h2>
          <p className="perfil-comentarios-descripcion">
            Consultá el historial y estado de moderación de todas las dudas y opiniones que dejaste en las resoluciones institucionales.
          </p>
        </div>

        <button
          type="button"
          className="perfil-comentarios-btn-recargar"
          onClick={recargar}
          disabled={cargando}
          title="Actualizar listado de comentarios"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cargando ? 'spin-animation' : ''}
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          <span>Actualizar</span>
        </button>
      </header>

      {/* Alerta de Error */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between my-3" role="alert">
          <div className="d-flex align-items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={recargar}
            >
              Reintentar
            </button>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar error"
              onClick={limpiarError}
            />
          </div>
        </div>
      )}

      {/* Tarjetas KPI de Resumen */}
      <div className="perfil-comentarios-kpis">
        <div className="comentario-kpi-card">
          <div className="comentario-kpi-icono comentario-kpi-icono--total" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="comentario-kpi-datos">
            <span className="comentario-kpi-valor">{metricas.total}</span>
            <span className="comentario-kpi-etiqueta">Comentarios totales</span>
          </div>
        </div>

        <div className="comentario-kpi-card">
          <div className="comentario-kpi-icono comentario-kpi-icono--aprobados" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="comentario-kpi-datos">
            <span className="comentario-kpi-valor">{metricas.aprobados}</span>
            <span className="comentario-kpi-etiqueta">Publicados en el foro</span>
          </div>
        </div>

        <div className="comentario-kpi-card">
          <div className="comentario-kpi-icono comentario-kpi-icono--pendientes" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="comentario-kpi-datos">
            <span className="comentario-kpi-valor">{metricas.pendientes}</span>
            <span className="comentario-kpi-etiqueta">En moderación</span>
          </div>
        </div>

        {metricas.rechazados > 0 && (
          <div className="comentario-kpi-card">
            <div className="comentario-kpi-icono comentario-kpi-icono--rechazados" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div className="comentario-kpi-datos">
              <span className="comentario-kpi-valor">{metricas.rechazados}</span>
              <span className="comentario-kpi-etiqueta">No aprobados</span>
            </div>
          </div>
        )}
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="perfil-comentarios-barra-control">
        <div className="perfil-comentarios-busqueda-wrapper">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="busqueda-icono" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="perfil-comentarios-input-busqueda"
            placeholder="Buscar en tus comentarios o por resolución..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar en comentarios"
          />
          {busqueda && (
            <button
              type="button"
              className="busqueda-btn-limpiar"
              onClick={() => setBusqueda('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div className="perfil-comentarios-filtros-chips" role="tablist" aria-label="Filtrar por estado">
          <button
            type="button"
            className={`filtro-chip${filtroEstado === 'TODOS' ? ' is-active' : ''}`}
            onClick={() => setFiltroEstado('TODOS')}
            role="tab"
            aria-selected={filtroEstado === 'TODOS'}
          >
            <span>Todos</span>
            <span className="filtro-chip-count">{metricas.total}</span>
          </button>

          <button
            type="button"
            className={`filtro-chip${filtroEstado === 'APROBADO' ? ' is-active' : ''}`}
            onClick={() => setFiltroEstado('APROBADO')}
            role="tab"
            aria-selected={filtroEstado === 'APROBADO'}
          >
            <span>Publicados</span>
            <span className="filtro-chip-count">{metricas.aprobados}</span>
          </button>

          <button
            type="button"
            className={`filtro-chip${filtroEstado === 'PENDIENTE' ? ' is-active' : ''}`}
            onClick={() => setFiltroEstado('PENDIENTE')}
            role="tab"
            aria-selected={filtroEstado === 'PENDIENTE'}
          >
            <span>En moderación</span>
            <span className="filtro-chip-count">{metricas.pendientes}</span>
          </button>

          {metricas.rechazados > 0 && (
            <button
              type="button"
              className={`filtro-chip${filtroEstado === 'RECHAZADO' ? ' is-active' : ''}`}
              onClick={() => setFiltroEstado('RECHAZADO')}
              role="tab"
              aria-selected={filtroEstado === 'RECHAZADO'}
            >
              <span>No aprobados</span>
              <span className="filtro-chip-count">{metricas.rechazados}</span>
            </button>
          )}
        </div>
      </div>

      {/* Contenido principal: Carga / Vacío / Lista */}
      <div className="perfil-comentarios-contenido">
        {cargando ? (
          <div className="perfil-comentarios-loading" role="status">
            <span className="spinner-border text-warning" aria-hidden="true" />
            <p className="mt-3 text-muted">Cargando tus comentarios...</p>
          </div>
        ) : comentarios.length === 0 ? (
          <div className="perfil-comentarios-empty">
            <div className="empty-icon-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" y1="10" x2="15" y2="10" />
                <line x1="12" y1="7" x2="12" y2="13" />
              </svg>
            </div>
            <h3 className="empty-title">Aún no realizaste ningún comentario</h3>
            <p className="empty-text">
              Participá activamente en la comunidad académica dejando tus dudas, sugerencias o consultas en las resoluciones oficiales vigentes.
            </p>
            <Link to="/resoluciones" className="btn-explorar-resoluciones">
              <span>Explorar Resoluciones</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        ) : comentariosFiltrados.length === 0 ? (
          <div className="perfil-comentarios-empty">
            <div className="empty-icon-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h3 className="empty-title">Sin resultados para esta búsqueda</h3>
            <p className="empty-text">
              No encontramos comentarios que coincidan con los filtros o término de búsqueda ingresado.
            </p>
            <button
              type="button"
              className="btn-limpiar-filtros-accion"
              onClick={limpiarFiltros}
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="perfil-comentarios-lista">
            <div className="perfil-comentarios-conteo-resultados">
              <span>
                Mostrando <strong>{comentariosFiltrados.length}</strong> de {comentarios.length} comentario{comentarios.length === 1 ? '' : 's'}
              </span>
            </div>

            {comentariosFiltrados.map((comentario) => {
              const idCom = comentario.idComentario ?? comentario.id;
              const resInfo = resolucionesMap[comentario.idResolucion];

              return (
                <PerfilComentarioItem
                  key={idCom || `${comentario.idResolucion}-${comentario.fechaCreacion}`}
                  comentario={comentario}
                  resolucionInfo={resInfo}
                  onEliminar={abrirModalEliminar}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar comentario */}
      <ModalConfirmarEliminarComentario
        comentario={comentarioAEliminar}
        resolucionInfo={comentarioAEliminar ? resolucionesMap[comentarioAEliminar.idResolucion] : null}
        isOpen={Boolean(comentarioAEliminar)}
        eliminando={eliminando}
        onClose={cerrarModalEliminar}
        onConfirmar={ejecutarEliminacion}
      />
    </section>
  );
};

export default PerfilComentarios;
