import React from 'react';

export const TablaUsuarios = ({
  usuarios,
  adminActual,
  onVerDetalle,
  onAbrirCambiarRol,
  onAbrirSuspension,
}) => {
  const idAdmin = adminActual?.idUsuario || adminActual?.id;

  const formatearFechaAcceso = (fechaStr) => {
    if (!fechaStr) return 'Nunca';
    try {
      return new Date(fechaStr).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return fechaStr;
    }
  };

  if (usuarios.length === 0) {
    return (
      <div className="usuarios-vacio-card text-center py-5">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mb-3">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg>
        <h3 className="h5 text-dark fw-bold mb-1">No se encontraron usuarios</h3>
        <p className="text-secondary small mb-0">Probá ajustando los filtros o el texto del buscador.</p>
      </div>
    );
  }

  return (
    <div className="usuarios-tabla-contenedor">
      <div className="table-responsive">
        <table className="table usuarios-tabla align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">DNI</th>
              <th scope="col">Rol</th>
              <th scope="col">Estado</th>
              <th scope="col">Último acceso</th>
              <th scope="col" className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => {
              const id = u.idUsuario || u.id;
              const nombreCompleto = `${u.nombre || ''} ${u.apellido || ''}`.trim() || 'Usuario';
              const inicial = (u.nombre || 'U').charAt(0).toUpperCase();
              const rol = (u.nombreRol || u.rol?.nombre || 'ESTUDIANTE').toUpperCase();
              const estado = (u.estado || 'ACTIVO').toUpperCase();
              const esActivo = estado === 'ACTIVO';
              const esYoMismo = id === idAdmin;

              return (
                <tr key={id} className={!esActivo ? 'usuarios-fila--inactiva' : ''}>
                  {/* Usuario */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="usuarios-avatar-sm" aria-hidden="true">
                        {inicial}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="usuarios-col-nombre fw-semibold">
                          {nombreCompleto} {esYoMismo && <span className="badge bg-warning text-dark ms-1">Tú</span>}
                        </span>
                        <span className="usuarios-col-email text-muted small">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* DNI */}
                  <td>
                    <span className="usuarios-col-dni">{u.dni || '-'}</span>
                  </td>

                  {/* Rol */}
                  <td>
                    <span className={`usuarios-rol-pill usuarios-rol-pill--${rol.toLowerCase()}`}>
                      {rol}
                    </span>
                  </td>

                  {/* Estado */}
                  <td>
                    <span className={`usuarios-estado-pill usuarios-estado-pill--${estado.toLowerCase()}`}>
                      ● {estado}
                    </span>
                  </td>

                  {/* Último acceso */}
                  <td>
                    <span className="usuarios-col-fecha text-muted small">
                      {formatearFechaAcceso(u.ultimoAcceso)}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td>
                    <div className="d-flex justify-content-end align-items-center gap-2">
                      {/* Ver Detalle */}
                      <button
                        type="button"
                        className="usuarios-btn-accion usuarios-btn-accion--ver"
                        title="Ver detalle de usuario"
                        aria-label={`Ver detalle de ${nombreCompleto}`}
                        onClick={() => onVerDetalle(u)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>

                      {/* Cambiar Rol */}
                      <button
                        type="button"
                        className="usuarios-btn-accion usuarios-btn-accion--rol"
                        title="Cambiar rol institucional"
                        aria-label={`Cambiar rol de ${nombreCompleto}`}
                        onClick={() => onAbrirCambiarRol(u)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </button>

                      {/* Suspender / Reactivar */}
                      <button
                        type="button"
                        className={`usuarios-btn-accion ${esActivo ? 'usuarios-btn-accion--suspender' : 'usuarios-btn-accion--reactivar'}`}
                        title={esYoMismo ? 'No podés suspender tu propia cuenta' : esActivo ? 'Suspender usuario' : 'Reactivar usuario'}
                        aria-label={esActivo ? `Suspender a ${nombreCompleto}` : `Reactivar a ${nombreCompleto}`}
                        onClick={() => onAbrirSuspension(u)}
                        disabled={esYoMismo}
                      >
                        {esActivo ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaUsuarios;
