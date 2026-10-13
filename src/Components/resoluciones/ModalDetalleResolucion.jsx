import React, { useEffect } from 'react';

/**
 * Modal interactivo para visualizar el detalle completo de una resolución académica.
 * Fiel al diseño de baja y media fidelidad proporcionado:
 * - ID de resolución y badges de categoría, estado y versión
 * - Metadatos de autor, rol y fecha completa
 * - Caja de descripción formal
 * - Chips de etiquetas
 * - Caja de descarga de documento PDF
 * - Historial de versiones y observaciones
 */
export const ModalDetalleResolucion = ({ resolucion, isOpen, onClose }) => {
  // Manejo de tecla Escape para cerrar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resolucion) return null;

  // Formato de fecha completa (ej: 17 de abril de 2026, 10:35 am)
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
        minute: '2-digit'
      });
    } catch {
      return fechaStr;
    }
  };

  const getCategoriaBadgeClass = (nombreCategoria = '') => {
    const cat = nombreCategoria.toUpperCase();
    if (cat.includes('ACADÉMICA') || cat.includes('ACADEMICA')) return 'badge-cat-academica';
    if (cat.includes('GRADO')) return 'badge-cat-grado';
    return 'badge-cat-default';
  };

  const renderEstadoBadge = (estado = '') => {
    const est = estado.toLowerCase();
    let dotColor = '#10B981';
    let estadoTexto = 'Vigente';
    let estadoClass = 'estado-vigente';

    if (est.includes('archiv')) {
      dotColor = '#EF4444';
      estadoTexto = 'Archivado';
      estadoClass = 'estado-archivado';
    } else if (est.includes('pend')) {
      dotColor = '#3B82F6';
      estadoTexto = 'Pendiente';
      estadoClass = 'estado-pendiente';
    }

    return (
      <span className={`estado-indicador-badge ${estadoClass}`}>
        <span className="estado-dot" style={{ backgroundColor: dotColor }}></span>
        <span className="estado-texto">{estadoTexto}</span>
      </span>
    );
  };

  const versionTexto = `v${resolucion.versionActual || 1}`;
  const codigoId = resolucion.codigoResolucion || `RES-2026-${String(resolucion.idResolucion || 1).padStart(3, '0')}`;
  const nombreArchivo = resolucion.archivoPrincipal?.nombre || `${resolucion.numeroResolucion?.replace(/[\s./]/g, '_') || 'Resolucion'}.pdf`;

  // Historial de versiones fallback
  const historial = resolucion.historialVersiones || [
    { version: versionTexto, fecha: '17/04/2026', descripcion: `Publicada por ${resolucion.rolAutor || 'Secretaría'}` },
    { version: 'v1', fecha: '15/04/2026', descripcion: 'Aprobada por Autoridad' },
    { version: 'v0', fecha: '13/04/2026', descripcion: 'Creada (borrador)' }
  ];

  const etiquetas = resolucion.etiquetas && resolucion.etiquetas.length > 0
    ? resolucion.etiquetas
    : ['CALENDARIO', '2026', 'RECTORADO'];

  const descargarArchivo = () => {
    alert(`Descargando archivo oficial: ${nombreArchivo}`);
  };

  return (
    <div className="modal-detalle-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-detalle-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Botón cerrar X */}
        <button
          type="button"
          className="btn-cerrar-modal"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {/* 1. Header Superior */}
        <div className="modal-detalle-top mb-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className={`badge-categoria-pill ${getCategoriaBadgeClass(resolucion.nombreCategoria)}`}>
                {resolucion.nombreCategoria || 'ACADÉMICA'}
              </span>
              {renderEstadoBadge(resolucion.estado)}
              <span className="badge-version-pill">{versionTexto}</span>
            </div>
            <div className="id-resolucion-tag">
              ID resolución: <strong>{codigoId}</strong>
            </div>
          </div>
        </div>

        {/* 2. Título de la Resolución */}
        <h2 className="modal-resolucion-titulo mb-2">
          {resolucion.numeroResolucion} — {resolucion.titulo}
        </h2>

        {/* 3. Metadatos de autor, rol y fecha */}
        <div className="modal-resolucion-meta text-muted mb-3">
          <span>{resolucion.nombreAutor || 'Esmeralda Nieves Urtizbey'}</span>
          <span className="meta-separator">·</span>
          <span>Rol: {resolucion.rolAutor || 'Secretaría'}</span>
          <span className="meta-separator">|</span>
          <span>{formatearFechaLarga(resolucion.fechaCreacion)}</span>
        </div>

        {/* 4. Cuerpo / Descripción en caja gris */}
        <div className="modal-resolucion-cuerpo mb-3">
          <p className="mb-0">
            {resolucion.descripcion || 'Sin descripción disponible para esta resolución.'}
          </p>
        </div>

        {/* 5. Etiquetas / Tags */}
        <div className="modal-resolucion-etiquetas d-flex flex-wrap gap-2 mb-3">
          {etiquetas.map((tag, idx) => (
            <span key={idx} className="chip-etiqueta">
              {tag}
            </span>
          ))}
        </div>

        {/* 6. Caja de Descarga PDF */}
        <div className="modal-pdf-box d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <span className="pdf-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <span className="pdf-text-tag">PDF</span>
            </span>
            <span className="pdf-nombre-archivo">{nombreArchivo}</span>
          </div>
          <button
            type="button"
            className="btn-descargar-pdf"
            onClick={descargarArchivo}
          >
            Descargar
          </button>
        </div>

        {/* 7. Historial de cambios */}
        <div className="modal-historial-section mb-3">
          <h4 className="historial-titulo mb-2">Historial de cambios</h4>
          <div className="historial-lista">
            {historial.map((h, i) => (
              <div key={i} className="historial-item d-flex justify-content-between align-items-center py-1">
                <span className="historial-descripcion text-muted">
                  {h.fecha} — {h.descripcion}
                </span>
                <span className="historial-version-tag">{h.version}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Observaciones */}
        {resolucion.observaciones && (
          <div className="modal-observaciones text-muted pt-2 border-top">
            <em>Obs: {resolucion.observaciones}</em>
          </div>
        )}

      </div>
    </div>
  );
};

export default ModalDetalleResolucion;
