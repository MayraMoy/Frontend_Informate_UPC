import React from 'react';

export const BloqueCrearCategoria = ({
  nuevoNombre,
  setNuevoNombre,
  manejarCrearCategoria,
  creando,
  inputNuevoRef,
}) => {
  return (
    <div className="modal-categorias__creacion-bloque">
      <h3 className="modal-categorias__seccion-titulo">
        Nueva categoría
      </h3>
      <div className="modal-categorias__crear-formulario">
        <div className="modal-categorias__crear-input-wrap">
          <input
            id="input-nueva-categoria"
            ref={inputNuevoRef}
            type="text"
            className="modal-categorias__input-texto"
            placeholder="Nombre de la categoría (ej. Becas, Académica, Convocatorias...)"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                manejarCrearCategoria();
              }
            }}
            disabled={creando}
            maxLength={60}
          />
        </div>
        <button
          type="button"
          className="modal-categorias__btn-crear"
          onClick={manejarCrearCategoria}
          disabled={creando || !nuevoNombre.trim()}
        >
          {creando ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <span className="modal-categorias__btn-plus" aria-hidden="true">+</span>
              <span>Agregar categoría</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BloqueCrearCategoria;

