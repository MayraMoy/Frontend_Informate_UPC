import React, { useState, useEffect } from 'react';
import { comentariosService } from '../../Services/resoluciones/comentariosService';
import './ComentariosPendientesPage.css';

export const ComentariosPendientesPage = () => {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
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
      cargarComentarios();
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert(`Error al aprobar comentario: ${err.message}`);
    }
  };

  const handleRechazar = async (comentario) => {
    if (!window.confirm('¿Deseas rechazar y eliminar este comentario?')) {
      return;
    }
    try {
      await comentariosService.eliminar(comentario.idComentario);
      setMensajeExito('Comentario eliminado.');
      cargarComentarios();
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert(`Error al rechazar comentario: ${err.message}`);
    }
  };

  return (
    <div className="comentarios-container">
      <div className="comentarios-header">
        <div>
          <span className="comentarios-badge">MODERACIÓN ESTUDIANTIL</span>
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
            <span className="comentarios-empty-icon">💬</span>
            <h3>No hay comentarios pendientes de moderación</h3>
            <p className="text-muted">
              Todos los comentarios de los estudiantes han sido revisados.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
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
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-success font-weight-bold"
                          onClick={() => handleAprobar(c)}
                        >
                          ✓ Aprobar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRechazar(c)}
                        >
                          ✕ Rechazar
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
  );
};

export default ComentariosPendientesPage;
