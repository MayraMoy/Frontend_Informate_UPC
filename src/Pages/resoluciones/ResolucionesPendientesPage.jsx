import React, { useState, useEffect } from 'react';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { ModalDetalleResolucion } from '../../Components/resoluciones/ModalDetalleResolucion';
import './ResolucionesPendientesPage.css';

export const ResolucionesPendientesPage = () => {
  const [pendientes, setPendientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Modal detalle
  const [resolucionSeleccionada, setResolucionSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargarPendientes = async () => {
    setCargando(true);
    setError('');
    try {
      const todas = await resolucionesService.obtenerTodas();
      if (Array.isArray(todas)) {
        // Filtrar exclusivamente resoluciones en estado PENDIENTE
        const filtradas = todas.filter(
          (r) => String(r.estado).toUpperCase() === 'PENDIENTE',
        );
        setPendientes(filtradas);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar resoluciones pendientes.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPendientes();
  }, []);

  const handleAprobar = async (resolucion) => {
    if (!window.confirm(`¿Aprobar y publicar la resolución "${resolucion.numeroResolucion}"?`)) {
      return;
    }
    try {
      await resolucionesService.actualizar(resolucion.idResolucion, {
        numeroResolucion: resolucion.numeroResolucion,
        titulo: resolucion.titulo,
        descripcion: resolucion.descripcion,
        idCategoria: resolucion.idCategoria,
        idAutor: resolucion.idAutor || 1,
        versionActual: (resolucion.versionActual || 0) + 1,
        observaciones: 'Aprobada oficialmente por Autoridad.',
        estado: 'VIGENTE',
      });
      setMensajeExito(`Resolución "${resolucion.numeroResolucion}" aprobada y publicada con éxito.`);
      cargarPendientes();
      setTimeout(() => setMensajeExito(''), 4000);
    } catch (err) {
      alert(`Error al aprobar: ${err.message}`);
    }
  };

  const handleArchivar = async (resolucion) => {
    if (!window.confirm(`¿Rechazar y archivar la resolución "${resolucion.numeroResolucion}"?`)) {
      return;
    }
    try {
      await resolucionesService.actualizar(resolucion.idResolucion, {
        numeroResolucion: resolucion.numeroResolucion,
        titulo: resolucion.titulo,
        descripcion: resolucion.descripcion,
        idCategoria: resolucion.idCategoria,
        idAutor: resolucion.idAutor || 1,
        versionActual: resolucion.versionActual || 1,
        observaciones: 'Rechazada/Archivada durante el proceso de revisión.',
        estado: 'ARCHIVADA',
      });
      setMensajeExito(`Resolución "${resolucion.numeroResolucion}" archivada.`);
      cargarPendientes();
      setTimeout(() => setMensajeExito(''), 4000);
    } catch (err) {
      alert(`Error al archivar: ${err.message}`);
    }
  };

  const abrirModalDetalle = (res) => {
    setResolucionSeleccionada(res);
    setModalAbierto(true);
  };

  return (
    <div className="pendientes-container">
      <div className="pendientes-header">
        <div>
          <span className="pendientes-badge">BANDEJA DE APROBACIÓN</span>
          <h1 className="pendientes-title">Resoluciones Pendientes de Revisión</h1>
          <p className="pendientes-subtitle">
            Evalúa, aprueba o archiva las disposiciones presentadas por secretaría y autoridades.
          </p>
        </div>
      </div>

      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="pendientes-card">
        {cargando ? (
          <div className="text-center py-5">
            <span className="spinner-border text-warning" role="status"></span>
            <p className="mt-2 text-muted">Cargando resoluciones pendientes...</p>
          </div>
        ) : pendientes.length === 0 ? (
          <div className="pendientes-empty">
            <span className="pendientes-empty-icon">✓</span>
            <h3>No hay resoluciones pendientes</h3>
            <p className="text-muted">
              Todas las resoluciones institucionales han sido aprobadas o revisadas.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Resolución</th>
                  <th>Categoría</th>
                  <th>Autor / Fecha</th>
                  <th>Versión</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones de Aprobación</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((res) => (
                  <tr key={res.idResolucion}>
                    <td>
                      <strong className="d-block text-dark">{res.numeroResolucion}</strong>
                      <span className="text-muted small">{res.titulo}</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {res.nombreCategoria || 'ACADÉMICA'}
                      </span>
                    </td>
                    <td>
                      <div className="small">
                        <strong>{res.nombreAutor || 'Secretaría'}</strong>
                        <div className="text-muted">
                          {res.fechaCreacion
                            ? new Date(res.fechaCreacion).toLocaleDateString('es-AR')
                            : 'Reciente'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">v{res.versionActual || 0}</span>
                    </td>
                    <td>
                      <span className="badge-estado-pendiente">
                        <span className="dot-azul"></span> Pendiente
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => abrirModalDetalle(res)}
                        >
                          👁 Ver
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-success font-weight-bold"
                          onClick={() => handleAprobar(res)}
                        >
                          ✓ Aprobar y Publicar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleArchivar(res)}
                        >
                          ✕ Archivar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAbierto && (
        <ModalDetalleResolucion
          resolucion={resolucionSeleccionada}
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
};

export default ResolucionesPendientesPage;
