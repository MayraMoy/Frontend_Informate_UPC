import React, { useState, useEffect } from 'react';
import { comentariosService } from '../../Services/resoluciones/comentariosService';
import './ComentariosPendientesPage.css';

export const ComentariosPendientesPage = () => {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesandoId, setProcesandoId] = useState(null);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const cargarComentarios = async () => {
    setCargando(true);
    setError('');
    try {
      const todos = await comentariosService.obtenerTodos();
      if (Array.isArray(todos)) {
        // Filtrar comentarios en estado PENDIENTE
        const pendientes = todos.filter(
          (c) => String(c.estado).toUpperCase() === 'PENDIENTE',
        );
        setComentarios(pendientes);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar los comentarios.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, []);

  const handleAprobar = async (comentario) => {
    setProcesandoId(comentario.idComentario);
    try {
      await comentariosService.actualizar(comentario.idComentario, {
        idUsuario: comentario.idUsuario,
        idResolucion: comentario.idResolucion,
        idCarrera: comentario.idCarrera,
        anioCarrera: comentario.anioCarrera,
        contenido: comentario.contenido,
        estado: 'APROBADO',
      });
      setMensajeExito('Comentario aprobado y publicado.');
      await cargarComentarios();
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert(`Error al aprobar comentario: ${err.message}`);
    } finally {
      setProcesandoId(null);
    }
  };

  const handleRechazar = async (comentario) => {
    if (!window.confirm('¿Deseas rechazar y eliminar este comentario?')) {
      return;
    }
    setProcesandoId(comentario.idComentario);
    try {
      await comentariosService.eliminar(comentario.idComentario);
      setMensajeExito('Comentario eliminado.');
      await cargarComentarios();
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert(`Error al rechazar comentario: ${err.message}`);
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <div className="comentarios-pendientes-page-bg">
      <div className="comentarios-container">
      <div className="comentarios-header">
        <div>
          <h1 className="comentarios-title">Comentarios de Estudiantes Pendientes</h1>
          <p className="comentarios-subtitle">
            Revisa y modera las consultas y opiniones que los alumnos realizan en las resoluciones publicadas.
          </p>
        </div>
      </div>

      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="comentarios-card">
        {cargando ? (
          <div className="text-center py-5">
            <span className="spinner-border text-warning" role="status"></span>
            <p className="mt-2 text-muted">Cargando comentarios pendientes...</p>
          </div>
        ) : comentarios.length === 0 ? (
          <div className="comentarios-empty">
            <span className="comentarios-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <h3>No hay comentarios pendientes de moderación</h3>
            <p className="text-muted">
              Todos los comentarios de los estudiantes han sido revisados.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 comentarios-tabla">
              <thead className="table-light">
                <tr>
                  <th>Estudiante</th>
                  <th>Carrera / Año</th>
                  <th>Resolución</th>
                  <th>Comentario</th>
                  <th>Fecha</th>
                  <th className="text-end">Moderación</th>
                </tr>
              </thead>
              <tbody>
                {comentarios.map((c) => (
                  <tr key={c.idComentario}>
                    <td>
                      <strong>{c.nombreUsuario || 'Estudiante'}</strong>
                      <div className="small text-muted">{c.emailUsuario || 'alumno@upc.edu.ar'}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {c.nombreCarrera || 'Sistemas'}
                      </span>
                      <div className="small text-muted">{c.anioCarrera}° año</div>
                    </td>
                    <td>
                      <span className="badge-resolucion-ref">
                        RES #{c.idResolucion}
                      </span>
                    </td>
                    <td style={{ maxWidth: '320px' }}>
                      <p className="mb-0 text-dark small fst-italic">
                        "{c.contenido}"
                      </p>
                    </td>
                    <td>
                      <span className="small text-muted">
                        {c.fechaCreacion
                          ? new Date(c.fechaCreacion).toLocaleDateString('es-AR')
                          : 'Reciente'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="comentarios-acciones-group">
                        <button
                          type="button"
                          className="comentario-btn-accion comentario-btn-accion--aprobar"
                          onClick={() => handleAprobar(c)}
                          disabled={procesandoId === c.idComentario}
                          title="Aprobar comentario"
                          aria-label={`Aprobar comentario de ${c.nombreUsuario || 'Estudiante'}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="17"
                            height="17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="comentario-btn-accion comentario-btn-accion--rechazar"
                          onClick={() => handleRechazar(c)}
                          disabled={procesandoId === c.idComentario}
                          title="Rechazar y eliminar comentario"
                          aria-label={`Rechazar comentario de ${c.nombreUsuario || 'Estudiante'}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="17"
                            height="17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
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
    </div>
  </div>
  );
};

export default ComentariosPendientesPage;
