import React from 'react';
import { usePendientesNoticias } from './hooks/usePendientesNoticias';
import {
  PendientesHeader,
  PendientesFiltros,
  PendientesTabla,
  ModalPreviewNoticia,
} from './components';
import '../../home-noticias/styles/NoticiasHome.css';
import '../ver-noticias/styles/VerNoticias.css';
import './styles/PendientesNoticias.css';

export const PendientesNoticias = () => {
  const {
    categorias,
    cargando,
    error,
    mensajeExito,
    accionEnProgreso,
    tabEstado,
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    paginaActual,
    totalPaginas,
    noticiasPaginadas,
    conteos,
    noticiaPrevia,
    setNoticiaPrevia,
    handleCambiarTab,
    cambiarPagina,
    handlePublicar,
    handleCambiarEstado,
    handleEliminar,
  } = usePendientesNoticias();

  return (
    <div className="pendientes-page-container">
      <div className="pendientes-content-wrapper">
        {/* Encabezado */}
        <PendientesHeader />

        {/* Mensajes de retroalimentación accesibles (Sin emojis) */}
        {mensajeExito && (
          <div className="pendientes-banner-alerta banner-exito" role="status">
            <svg
              className="alerta-icono"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{mensajeExito}</span>
          </div>
        )}

        {error && (
          <div className="pendientes-banner-alerta banner-error" role="alert">
            <svg
              className="alerta-icono"
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
            <span>{error}</span>
          </div>
        )}

        {/* Filtros de Pestañas, Búsqueda y Categorías */}
        <PendientesFiltros
          tabEstado={tabEstado}
          onCambiarTab={handleCambiarTab}
          conteos={conteos}
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
          categorias={categorias}
        />

        {/* Listado en Cuadrícula idéntica a Ver Noticias */}
        <PendientesTabla
          noticias={noticiasPaginadas}
          cargando={cargando}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={cambiarPagina}
        />
      </div>

      {/* Modal de Previsualización */}
      {noticiaPrevia && (
        <ModalPreviewNoticia
          noticia={noticiaPrevia}
          categorias={categorias}
          onCerrar={() => setNoticiaPrevia(null)}
          onPublicar={handlePublicar}
          accionEnProgreso={accionEnProgreso}
        />
      )}
    </div>
  );
};

export default PendientesNoticias;
