import React from 'react';

/**
 * Tabla principal de resoluciones académicas fiel a las imágenes del diseño.
 * Incluye badges de categoría suaves, punto indicador de estado y botón LEER.
 */
export const TablaResoluciones = ({ resoluciones = [], onVerDetalle }) => {
  if (!resoluciones || resoluciones.length === 0) {
    return (
      <div className="tabla-vacia-alerta text-center p-4">
        <p className="mb-0 text-muted">No se encontraron resoluciones con los filtros aplicados.</p>
      </div>
    );
  }

  // Formateador amigable de fecha (ej: 17 Abr 2026)
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '-';
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) return fechaStr;
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return fechaStr;
    }
  };

  // Clase CSS para badge de categoría
  const getCategoriaBadgeClass = (nombreCategoria = '') => {
    const cat = nombreCategoria.toUpperCase();
    if (cat.includes('ACADÉMICA') || cat.includes('ACADEMICA')) return 'badge-cat-academica';
    if (cat.includes('GRADO')) return 'badge-cat-grado';
    return 'badge-cat-default';
  };

  // Estilos del indicador de estado
  const renderEstadoBadge = (estado = '') => {
    const est = estado.toLowerCase();
    let dotColor = '#10B981'; // Verde Vigente
    let estadoTexto = 'Vigente';
    let estadoClass = 'estado-vigente';

    if (est.includes('archiv')) {
      dotColor = '#EF4444'; // Rojo / Gris
      estadoTexto = 'Archivado';
      estadoClass = 'estado-archivado';
    } else if (est.includes('pend')) {
      dotColor = '#3B82F6'; // Azul
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

  return (
    <div className="tabla-resoluciones-wrapper mb-4">
      <div className="table-responsive">
        <table className="tabla-resoluciones">
          <thead>
            <tr>
              <th scope="col" className="col-resolucion">RESOLUCIÓN</th>
              <th scope="col" className="col-fecha">FECHA</th>
              <th scope="col" className="col-categoria">CATEGORÍA</th>
              <th scope="col" className="col-estado">ESTADO</th>
              <th scope="col" className="col-accion text-end">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {resoluciones.map((res) => (
              <tr key={res.idResolucion || res.codigoResolucion} className="fila-resolucion">
                <td className="celda-resolucion">
                  <div className="resolucion-numero-linea">{res.numeroResolucion}</div>
                  <div className="resolucion-titulo-linea">{res.titulo}</div>
                </td>
                <td className="celda-fecha">
                  {formatearFecha(res.fechaCreacion)}
                </td>
                <td className="celda-categoria">
                  <span className={`badge-categoria-pill ${getCategoriaBadgeClass(res.nombreCategoria)}`}>
                    {res.nombreCategoria || 'GENERAL'}
                  </span>
                </td>
                <td className="celda-estado">
                  {renderEstadoBadge(res.estado)}
                </td>
                <td className="celda-accion text-end">
                  <button
                    type="button"
                    className="btn-leer-resolucion"
                    onClick={() => onVerDetalle && onVerDetalle(res)}
                  >
                    LEER <span className="arrow-icon">→</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaResoluciones;
