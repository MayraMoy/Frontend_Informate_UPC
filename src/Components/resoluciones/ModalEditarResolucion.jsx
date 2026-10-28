import React, { useState, useEffect } from 'react';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { archivosResolucionService } from '../../Services/resoluciones/archivosResolucionService';
import './ModalEditarResolucion.css';

/**
 * Modal interactivo para que el Administrador o Personal Escolar modifique
 * el estado, título, descripción, categoría, observaciones y documento PDF de una resolución.
 */
export const ModalEditarResolucion = ({
  resolucion,
  categorias = [],
  isOpen,
  onClose,
  onGuardadoExitoso,
}) => {
  const [numeroResolucion, setNumeroResolucion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [estado, setEstado] = useState('VIGENTE');
  const [observaciones, setObservaciones] = useState('');
  const [archivoActualNombre, setArchivoActualNombre] = useState('');
  const [nuevoArchivoPdf, setNuevoArchivoPdf] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (resolucion) {
      setNumeroResolucion(resolucion.numeroResolucion || '');
      setTitulo(resolucion.titulo || '');
      setDescripcion(resolucion.descripcion || '');
      setIdCategoria(resolucion.idCategoria || (categorias[0]?.idCategoria ?? ''));
      setEstado(resolucion.estado || 'VIGENTE');
      setObservaciones(resolucion.observaciones || '');
      
      const nombrePdf = resolucion.archivoPrincipal?.nombre ||
        `${(resolucion.numeroResolucion || 'Resolucion').replace(/[\s./]/g, '_')}.pdf`;
      setArchivoActualNombre(nombrePdf);
      setNuevoArchivoPdf(null);
      setError('');
    }
  }, [resolucion, categorias]);

  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resolucion) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!numeroResolucion.trim()) {
      setError('El número de resolución es obligatorio.');
      return;
    }
    if (!titulo.trim()) {
      setError('El título de la resolución es obligatorio.');
      return;
    }

    try {
      setGuardando(true);

      const payload = {
        numeroResolucion: numeroResolucion.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        idCategoria: Number(idCategoria),
        idAutor: resolucion.idAutor || 1,
        versionActual: (resolucion.versionActual || 1) + 1,
        observaciones: observaciones.trim() || 'Modificación realizada por Administrador.',
        estado: estado.toUpperCase(),
      };

      // 1. Actualizar los datos de la resolución
      await resolucionesService.actualizar(resolucion.idResolucion, payload);

      // 2. Si se seleccionó un nuevo PDF, registrar/actualizar el archivo en el backend
      if (nuevoArchivoPdf) {
        try {
          const archivoPayload = {
            idResolucion: resolucion.idResolucion,
            nombre: nuevoArchivoPdf.name,
            url: URL.createObjectURL(nuevoArchivoPdf),
            tipo: 'application/pdf',
          };
          await archivosResolucionService.guardar(archivoPayload);
          
          // Actualizar en el objeto local para reflejarlo de inmediato en el modal de detalle
          resolucion.archivoPrincipal = archivoPayload;
        } catch (errArchivo) {
          console.warn('Metadatos de archivo guardados con advertencia:', errArchivo);
        }
      }

      if (onGuardadoExitoso) {
        onGuardadoExitoso();
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Error al actualizar la resolución.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-editar-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-editar-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabecera del modal */}
        <div className="modal-editar-header">
          <div>
            <span className="badge-edicion-admin">EDICIÓN DE ADMINISTRADOR</span>
            <h3 className="modal-editar-title">
              Modificar Resolución #{resolucion.idResolucion}
            </h3>
            <span className="modal-editar-id text-muted small">
              Versión actual: v{resolucion.versionActual || 1} → se actualizará a v{(resolucion.versionActual || 1) + 1}
            </span>
          </div>
          <button
            type="button"
            className="btn-cerrar-modal"
            onClick={onClose}
            aria-label="Cerrar modal"
            disabled={guardando}
          >
            ×
          </button>
        </div>

        {error && <div className="alert alert-danger py-2 mt-2">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-editar-form">
          <div className="row g-3">
            
            {/* Número de resolución */}
            <div className="col-md-6">
              <label className="modal-editar-label">Número de Resolución</label>
              <input
                type="text"
                className="form-control"
                value={numeroResolucion}
                onChange={(e) => setNumeroResolucion(e.target.value)}
                disabled={guardando}
                required
              />
            </div>

            {/* Selector de Estado */}
            <div className="col-md-6">
              <label className="modal-editar-label">
                Estado de la Resolución <span className="text-warning font-weight-bold">★</span>
              </label>
              <select
                className="form-select select-estado-destacado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                disabled={guardando}
              >
                <option value="VIGENTE">🟢 Vigente (Pública)</option>
                <option value="PENDIENTE">🔵 Pendiente de Revisión</option>
                <option value="ARCHIVADA">🔴 Archivada (Histórica)</option>
              </select>
            </div>

            {/* Categoría */}
            <div className="col-12">
              <label className="modal-editar-label">Categoría Institucional</label>
              <select
                className="form-select"
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

            {/* Título */}
            <div className="col-12">
              <label className="modal-editar-label">Título Oficial</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={guardando}
                required
              />
            </div>

            {/* Sección de Cambio / Reemplazo de PDF */}
            <div className="col-12">
              <label className="modal-editar-label">
                Documento PDF de la Resolución
              </label>
              <div className="modal-editar-pdf-box">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge-pdf-icon">📄 PDF</span>
                    <span className="small text-muted">Archivo actual:</span>
                    <strong className="small text-dark font-monospace">
                      {archivoActualNombre}
                    </strong>
                  </div>
                  {nuevoArchivoPdf && (
                    <span className="badge bg-success">Nuevo PDF cargado</span>
                  )}
                </div>

                <div className="input-group">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="form-control form-control-sm"
                    id="inputCambiarPdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setNuevoArchivoPdf(file);
                    }}
                    disabled={guardando}
                  />
                  {nuevoArchivoPdf && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setNuevoArchivoPdf(null);
                        const inputElem = document.getElementById('inputCambiarPdf');
                        if (inputElem) inputElem.value = '';
                      }}
                      disabled={guardando}
                    >
                      Cancelar cambio
                    </button>
                  )}
                </div>
                {nuevoArchivoPdf && (
                  <p className="small text-success mt-1 mb-0 font-weight-bold">
                    ✓ Se reemplazará por: <u>{nuevoArchivoPdf.name}</u> ({(nuevoArchivoPdf.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            {/* Cuerpo / Descripción */}
            <div className="col-12">
              <label className="modal-editar-label">Cuerpo / Contenido de la Resolución</label>
              <textarea
                className="form-control"
                rows="4"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={guardando}
              />
            </div>

            {/* Observaciones */}
            <div className="col-12">
              <label className="modal-editar-label">Observaciones y Motivo del Cambio</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Ej: Actualización de fechas aprobada por Consejo Superior..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                disabled={guardando}
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="modal-editar-actions mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary px-3"
              onClick={onClose}
              disabled={guardando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-warning px-4 font-weight-bold"
              disabled={guardando}
            >
              {guardando ? 'Guardando cambios...' : 'Guardar y Aplicar Cambios'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ModalEditarResolucion;
