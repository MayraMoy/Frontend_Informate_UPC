import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import './CrearResolucionPage.css';

export const CrearResolucionPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  // Form states
  const [numeroResolucion, setNumeroResolucion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(['CALENDARIO', '2026']);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
  const [archivoPdf, setArchivoPdf] = useState(null);

  // Data & loading states
  const [categorias, setCategorias] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Load categories on mount
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const cats = await categoriasResolucionService.obtenerTodas();
        if (Array.isArray(cats)) {
          setCategorias(cats);
          if (cats.length > 0) setIdCategoria(cats[0].idCategoria);
        }
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    cargarCategorias();
  }, []);

  const agregarEtiqueta = (e) => {
    e.preventDefault();
    const tag = nuevaEtiqueta.trim().toUpperCase();
    if (tag && !etiquetasSeleccionadas.includes(tag)) {
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, tag]);
      setNuevaEtiqueta('');
    }
  };

  const eliminarEtiqueta = (tagEliminar) => {
    setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter((t) => t !== tagEliminar));
  };

  const handleSubmit = async (estadoDeseado) => {
    setError('');
    setExito('');

    if (!numeroResolucion.trim()) {
      setError('El número de resolución es obligatorio (ej: Res. Rectoral 0542/2026).');
      return;
    }
    if (!titulo.trim()) {
      setError('El título de la resolución es obligatorio.');
      return;
    }
    if (!idCategoria) {
      setError('Debes seleccionar una categoría.');
      return;
    }

    try {
      setGuardando(true);

      const payload = {
        numeroResolucion: numeroResolucion.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        idCategoria: Number(idCategoria),
        idAutor: user?.idUsuario || 1,
        versionActual: 1,
        observaciones: observaciones.trim() || 'Creación inicial de la resolución.',
        estado: estadoDeseado, // 'VIGENTE' o 'PENDIENTE'
      };

      // NOTA: La subida del archivo PDF queda pendiente de integración física con el backend
      // según requerimiento del proyecto. Se registra el payload formal de la resolución.
      await resolucionesService.crear(payload);

      setExito(
        estadoDeseado === 'VIGENTE'
          ? 'Resolución publicada exitosamente.'
          : 'Resolución guardada en estado Pendiente para revisión.',
      );

      setTimeout(() => {
        navigate(estadoDeseado === 'VIGENTE' ? '/resoluciones' : '/resoluciones/pendientes');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Error al guardar la resolución.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="crear-resolucion-container">
      <div className="crear-resolucion-header">
        <div>
          <span className="crear-badge-modulo">MÓDULO DE GESTIÓN</span>
          <h1 className="crear-resolucion-title">Crear Resolución Académica</h1>
          <p className="crear-resolucion-subtitle">
            Redacta y registra una nueva disposición oficial institucional según la normativa vigente.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {exito && <div className="alert alert-success" role="alert">{exito}</div>}

      <div className="crear-resolucion-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row g-4">
            
            {/* Número e Identificador */}
            <div className="col-md-6">
              <label className="crear-label">
                Número de Resolución <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control crear-input"
                placeholder="Ej: Res. Rectoral 0542/2026 o Res. Grado 0211/2026"
                value={numeroResolucion}
                onChange={(e) => setNumeroResolucion(e.target.value)}
                disabled={guardando}
              />
            </div>

            {/* Categoría */}
            <div className="col-md-6">
              <label className="crear-label">
                Categoría Institucional <span className="text-danger">*</span>
              </label>
              <select
                className="form-select crear-input"
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
              <label className="crear-label">
                Título Oficial <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control crear-input"
                placeholder="Ej: Calendario Académico Período Lectivo 2026"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={guardando}
              />
            </div>

            {/* Cuerpo / Descripción */}
            <div className="col-12">
              <label className="crear-label">
                Cuerpo y Descripción de la Resolución
              </label>
              <textarea
                className="form-control crear-input crear-textarea"
                rows="5"
                placeholder="Ingresa el texto formal, considerando y resuelve de la disposición..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={guardando}
              />
            </div>

            {/* Etiquetas */}
            <div className="col-md-6">
              <label className="crear-label">Etiquetas y Palabras Clave</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control crear-input"
                  placeholder="Agregar etiqueta (ej: RECTORADO)"
                  value={nuevaEtiqueta}
                  onChange={(e) => setNuevaEtiqueta(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && agregarEtiqueta(e)}
                  disabled={guardando}
                />
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={agregarEtiqueta}
                  disabled={guardando}
                >
                  + Agregar
                </button>
              </div>
              <div className="crear-tags-wrapper">
                {etiquetasSeleccionadas.map((tag) => (
                  <span key={tag} className="crear-tag-chip">
                    #{tag}
                    <button
                      type="button"
                      className="crear-tag-remove"
                      onClick={() => eliminarEtiqueta(tag)}
                      title="Eliminar etiqueta"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Documento PDF Adjunto (Visual / Mock por requerimiento) */}
            <div className="col-md-6">
              <label className="crear-label">Documento PDF Oficial</label>
              <div className="crear-upload-zone">
                <div className="crear-upload-icon">📄</div>
                <div className="crear-upload-text">
                  <strong>Adjuntar archivo PDF</strong>
                  <p className="crear-upload-hint">
                    Formatos admitidos: .pdf (máx. 10MB)
                    <br />
                    <em>(Subida de archivos en servidor pendiente de integración)</em>
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  className="form-control mt-2"
                  onChange={(e) => setArchivoPdf(e.target.files?.[0] || null)}
                  disabled={guardando}
                />
                {archivoPdf && (
                  <div className="mt-2 text-success small font-weight-bold">
                    ✓ Archivo seleccionado: {archivoPdf.name}
                  </div>
                )}
              </div>
            </div>

            {/* Observaciones */}
            <div className="col-12">
              <label className="crear-label">Observaciones y Notas de Aprobación</label>
              <textarea
                className="form-control crear-input"
                rows="2"
                placeholder="Observaciones internas para el Consejo Académico o Autoridades..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                disabled={guardando}
              />
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="crear-actions-bar">
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate('/resoluciones')}
              disabled={guardando}
            >
              Cancelar
            </button>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-warning px-4 font-weight-bold"
                onClick={() => handleSubmit('PENDIENTE')}
                disabled={guardando}
              >
                {guardando ? 'Guardando...' : 'Solicitar Aprobación (Pendiente)'}
              </button>
              <button
                type="button"
                className="btn btn-dark px-4 font-weight-bold"
                onClick={() => handleSubmit('VIGENTE')}
                disabled={guardando}
              >
                {guardando ? 'Publicando...' : 'Aprobar y Publicar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearResolucionPage;
