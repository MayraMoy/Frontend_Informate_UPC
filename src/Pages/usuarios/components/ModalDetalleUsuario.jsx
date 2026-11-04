import React from 'react';
import useDetalleUsuarioActividad from '../hooks/useDetalleUsuarioActividad.js';
import {
  ModalDetalleHeader,
  ModalDetalleKpis,
  ModalDetalleTabs,
  TabComentariosResoluciones,
  TabInfoCuenta,
  TabPublicaciones,
} from './modal-detalle/index.js';

/**
 * Modal modular de inspección de usuario (Perfil 360°, métricas y actividad en resoluciones).
 */
export const ModalDetalleUsuario = ({ usuario, onClose, onCopiarEmail }) => {
  if (!usuario) return null;

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
  } = useDetalleUsuarioActividad(usuario, onCopiarEmail);

  const mostrarPestanaPublicaciones = !esEstudiante || noticias.length > 0 || resoluciones.length > 0;
  const publicacionesTotal = noticias.length + resoluciones.length;

  return (
    <div
      className="usuarios-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-detalle-title"
    >
      <div
        className="usuarios-modal-content usuarios-modal-content--perfil"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Encabezado con datos esenciales y botón de correo */}
        <ModalDetalleHeader
          nombreCompleto={nombreCompleto}
          inicial={inicial}
          rol={rol}
          estado={estado}
          dni={usuario.dni}
          email={usuario.email}
          onClose={onClose}
        />

        {/* 2. Barra de KPIs rápidos de actividad */}
        <ModalDetalleKpis
          comentariosCount={comentarios.length}
          noticiasCount={noticias.length}
          resolucionesCount={resoluciones.length}
          cargando={cargandoActividad}
          pestanaActiva={pestanaActiva}
          onSelectPestana={setPestanaActiva}
        />

        {/* 3. Selector de Pestañas */}
        <ModalDetalleTabs
          pestanaActiva={pestanaActiva}
          onSelectPestana={setPestanaActiva}
          comentariosCount={comentarios.length}
          publicacionesCount={publicacionesTotal}
          mostrarPublicaciones={mostrarPestanaPublicaciones}
        />

        {/* 4. Contenido scrollable según la pestaña activa */}
        <div className="usuarios-modal-body usuarios-modal-body--scrollable">
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

        {/* 5. Pie del Modal */}
        <div className="usuarios-modal-footer">
          <button type="button" className="usuarios-boton-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleUsuario;
