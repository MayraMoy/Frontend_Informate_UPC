import React from 'react';
import { obtenerEstadoResolucion } from './estadoResolucion';

/**
 * Tabla principal de resoluciones académicas fiel a las imágenes del diseño.
 * Incluye badges de categoría suaves, punto indicador de estado, botón LEER y botón EDITAR para admins.
 */
export const TablaResoluciones = ({
  resoluciones = [],
  onVerDetalle,
  onEditar,
  esAdmin = false,
}) => {
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
    const estadoInfo = obtenerEstadoResolucion(estado);

    return (
      <span className={`estado-indicador-badge ${estadoInfo.clase}`} aria-label={`Estado: ${estadoInfo.etiqueta}`}>
        <span className="estado-dot" style={{ backgroundColor: estadoInfo.color }}></span>
        <span className="estado-texto">{estadoInfo.etiqueta}</span>
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
                  <div className="d-inline-flex align-items-center gap-2">
                    {esAdmin && (
                      <button
                        type="button"
                        className="resolucion-btn-editar"
                        onClick={() => onEditar && onEditar(res)}
                        title="Editar esta resolución"
                        aria-label={`Editar resolución: ${res.titulo || res.numeroResolucion || ''}`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        <span>Editar</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn-leer-resolucion"
                      onClick={() => onVerDetalle && onVerDetalle(res)}
                    >
                      LEER <span className="arrow-icon">→</span>
                    </button>
                  </div>
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
