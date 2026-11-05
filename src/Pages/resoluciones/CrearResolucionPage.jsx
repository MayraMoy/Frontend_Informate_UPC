import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import './CrearResolucionPage.css';

/* ==========================================================================
   Iconos vectoriales limpios (SVG) - Sin emojis
   ========================================================================== */
const IconoVolver = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconoReloj = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconoCheck = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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

  // Load categories on mount
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const cats = await categoriasResolucionService.obtenerTodas();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategorias(cats);
          const primerId = cats[0].idCategoria ?? cats[0].id;
          if (primerId !== undefined && primerId !== null) {
            setIdCategoria(String(primerId));
          }
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

      const idCatNum = Number(idCategoria);
      const idAutorFinal = Number(user?.idUsuario ?? user?.id ?? user?.usuarioId ?? 1);

      const payload = {
        numeroResolucion: numeroResolucion.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        idCategoria: idCatNum,
        categoriaId: idCatNum,
        idAutor: idAutorFinal,
        autorId: idAutorFinal,
        usuarioId: idAutorFinal,
        versionActual: 1,
        observaciones: observaciones.trim() || 'Creación inicial de la resolución.',
        estado: estadoDeseado.toUpperCase(),
      };

      // NOTA: La subida del archivo PDF queda pendiente de integración física con el backend
      // según requerimiento del proyecto. Se registra el payload formal de la resolución.
      await resolucionesService.crear(payload, idAutorFinal);

      const notificacion = {
        tipo: 'success',
        mensaje: estadoDeseado.toUpperCase() === 'VIGENTE'
          ? 'La resolución se publicó exitosamente.'
          : 'La resolución quedó pendiente de revisión.',
      };
      const destino = estadoDeseado.toUpperCase() === 'VIGENTE'
        ? '/resoluciones'
        : '/resoluciones/pendientes';

      navigate(destino, { state: { notificacion } });
    } catch (err) {
      setError(err.message || 'Error al guardar la resolución.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="crear-resolucion-page-bg">
      <div className="crear-resolucion-container">
      <div className="crear-resolucion-header">
        <div>
          <h1 className="crear-resolucion-title">Crear Resolución Académica</h1>
          <p className="crear-resolucion-subtitle">
            Redacta y registra una nueva disposición oficial institucional según la normativa vigente.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                {categorias.map((cat) => {
                  const idCat = cat.idCategoria ?? cat.id;
                  const nombreCat = cat.nombre ?? cat.nombreCategoria ?? `Categoría ${idCat}`;
                  return (
                    <option key={idCat} value={idCat}>
                      {nombreCat}
                    </option>
                  );
                })}
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
                  className="crear-btn-agregar-tag"
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
                <div className="crear-upload-icon text-muted">
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
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

          {error && (
            <div className="alert alert-danger mt-4 mb-0" role="alert">
              {error}
            </div>
          )}

          {/* Botones de Acción unificados con sistema de diseño */}
          <div className="crear-actions-bar">
            <button
              type="button"
              className="crear-resolucion__boton-secundario"
              onClick={() => navigate('/resoluciones')}
              disabled={guardando}
            >
              <IconoVolver />
              <span>Cancelar</span>
            </button>
            <div className="crear-actions-grupo">
              <button
                type="button"
                className="crear-resolucion__boton-outline"
                onClick={() => handleSubmit('PENDIENTE')}
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <span className="crear-resolucion__mini-spinner" aria-hidden="true" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <IconoReloj />
                    <span>Solicitar Aprobación (Pendiente)</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="crear-resolucion__boton-principal"
                onClick={() => handleSubmit('VIGENTE')}
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <span className="crear-resolucion__mini-spinner" aria-hidden="true" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <IconoCheck />
                    <span>Aprobar y Publicar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default CrearResolucionPage;
