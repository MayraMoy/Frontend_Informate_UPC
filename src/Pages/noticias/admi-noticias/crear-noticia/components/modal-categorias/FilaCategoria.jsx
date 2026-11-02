import React from 'react';

export const FilaCategoria = ({
  cat,
  idCat,
  estaEnEdicion,
  estaConfirmandoEliminar,
  nombreEnEdicion,
  setNombreEnEdicion,
  guardandoEdicion,
  eliminando,
  inputEdicionRef,
  iniciarEdicion,
  cancelarEdicion,
  guardarEdicion,
  iniciarEliminacion,
  cancelarEliminacion,
  confirmarEliminar,
}) => {
  return (
    <tr className={estaEnEdicion ? 'modal-categorias__fila--editando' : ''}>
      <td className="modal-categorias__celda-id">
        <span className="modal-categorias__id-badge">#{idCat}</span>
      </td>

      <td className="modal-categorias__celda-nombre">
        {estaEnEdicion ? (
          <div className="modal-categorias__edicion-wrap">
            <input
              ref={inputEdicionRef}
              type="text"
              className="modal-categorias__input-edicion"
              value={nombreEnEdicion}
              onChange={(e) => setNombreEnEdicion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  guardarEdicion(idCat);
                } else if (e.key === 'Escape') {
                  cancelarEdicion();
                }
              }}
              disabled={guardandoEdicion}
              maxLength={60}
            />
          </div>
        ) : (
          <div className="modal-categorias__nombre-wrap">
            <span className="modal-categorias__nombre-tag">
              {cat.nombre}
            </span>
          </div>
        )}
      </td>

      <td className="modal-categorias__celda-acciones">
        {estaEnEdicion ? (
          <div className="d-flex justify-content-end align-items-center gap-2">
            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--guardar"
              onClick={() => guardarEdicion(idCat)}
              disabled={guardandoEdicion || !nombreEnEdicion.trim()}
              title="Guardar cambios"
              aria-label="Guardar cambios"
            >
              {guardandoEdicion ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{ width: '13px', height: '13px', borderWidth: '1.8px' }}
                />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--cancelar"
              onClick={cancelarEdicion}
              disabled={guardandoEdicion}
              title="Cancelar edición"
              aria-label="Cancelar edición"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : estaConfirmandoEliminar ? (
          <div className="modal-categorias__confirmar-eliminar-wrap">
            <span className="modal-categorias__aviso-eliminar">¿Eliminar?</span>
            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--confirmar-eliminar"
              onClick={() => confirmarEliminar(idCat)}
              disabled={eliminando}
              title="Confirmar eliminación"
              aria-label="Confirmar eliminación"
            >
              {eliminando ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{ width: '13px', height: '13px', borderWidth: '1.8px' }}
                />
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--cancelar"
              onClick={cancelarEliminacion}
              disabled={eliminando}
              title="Cancelar"
              aria-label="Cancelar eliminación"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-end align-items-center gap-2">
            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--editar"
              onClick={() => iniciarEdicion(cat)}
              title="Editar nombre"
              aria-label={`Editar categoría ${cat.nombre}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              type="button"
              className="modal-categorias__btn-accion modal-categorias__btn-accion--eliminar"
              onClick={() => iniciarEliminacion(idCat)}
              title="Eliminar categoría"
              aria-label={`Eliminar categoría ${cat.nombre}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default FilaCategoria;

