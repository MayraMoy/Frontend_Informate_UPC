import React from 'react';
import { usePendientesNoticias } from './hooks/usePendientesNoticias';
import {
  PendientesHeader,
  PendientesFiltros,
  PendientesTabla,
  ModalPreviewNoticia,
} from './components';
import {
  ToastNotificacion,
  ModalConfirmacionEliminar,
} from '../../../../Components/shared';
import '../../home-noticias/styles/NoticiasHome.css';
import '../ver-noticias/styles/VerNoticias.css';
import './styles/PendientesNoticias.css';

export const PendientesNoticias = () => {
  const {
    categorias,
    cargando,
    error,
    mensajeExito,
    setMensajeExito,
    setErrorAccion,
    accionEnProgreso,
    noticiaAEliminar,
    solicitarEliminar,
    confirmarEliminar,
    cancelarEliminar,
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
        {/* Notificación Toast flotante sin layout shift */}
        <ToastNotificacion
          visible={Boolean(mensajeExito)}
          tipo="success"
          mensaje={mensajeExito}
          onCerrar={() => setMensajeExito('')}
        />

        {error && (
          <ToastNotificacion
            visible={Boolean(error)}
            tipo="error"
            mensaje={error}
            onCerrar={() => setErrorAccion && setErrorAccion('')}
          />
        )}

        {/* Encabezado */}
        <PendientesHeader />

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
          onEliminar={solicitarEliminar}
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

      {/* Modal de Confirmación Destructiva para Eliminar */}
      <ModalConfirmacionEliminar
        isOpen={Boolean(noticiaAEliminar)}
        titulo="¿Eliminar noticia definitivamente?"
        itemNombre={noticiaAEliminar?.titulo}
        mensaje="Esta acción es permanente y no se podrá deshacer. La noticia será retirada del portal."
        textoBotonConfirmar="Eliminar noticia"
        enProgreso={Boolean(accionEnProgreso)}
        onConfirmar={confirmarEliminar}
        onCancelar={cancelarEliminar}
      />
    </div>
  );
};

export default PendientesNoticias;
