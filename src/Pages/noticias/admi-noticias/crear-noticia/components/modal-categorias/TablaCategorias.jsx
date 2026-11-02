import React from 'react';
import { FilaCategoria } from './FilaCategoria';
import { obtenerIdCategoria } from '../../hooks/useGestionCategorias';

export const TablaCategorias = ({
  cargando,
  totalCategorias,
  filtro,
  categoriasAMostrar,
  idEnEdicion,
  nombreEnEdicion,
  setNombreEnEdicion,
  guardandoEdicion,
  idAEliminar,
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
    <div className="modal-categorias__tabla-contenedor">
      {cargando && totalCategorias === 0 ? (
        <div className="modal-categorias__estado-vacio">
          <span
            className="spinner-border text-primary spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
          <span>Cargando categorías...</span>
        </div>
      ) : categoriasAMostrar.length === 0 ? (
        <div className="modal-categorias__estado-vacio">
          <p>
            No se encontraron categorías {filtro ? `con el término "${filtro}"` : 'disponibles'}.
          </p>
        </div>
      ) : (
        <table className="modal-categorias__tabla">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Nombre de la etiqueta</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriasAMostrar.map((cat) => {
              const idCat = obtenerIdCategoria(cat);
              const estaEnEdicion = idEnEdicion === idCat;
              const estaConfirmandoEliminar = idAEliminar === idCat;

              return (
                <FilaCategoria
                  key={idCat || cat.nombre}
                  cat={cat}
                  idCat={idCat}
                  estaEnEdicion={estaEnEdicion}
                  estaConfirmandoEliminar={estaConfirmandoEliminar}
                  nombreEnEdicion={nombreEnEdicion}
                  setNombreEnEdicion={setNombreEnEdicion}
                  guardandoEdicion={guardandoEdicion}
                  eliminando={eliminando}
                  inputEdicionRef={inputEdicionRef}
                  iniciarEdicion={iniciarEdicion}
                  cancelarEdicion={cancelarEdicion}
                  guardarEdicion={guardarEdicion}
                  iniciarEliminacion={iniciarEliminacion}
                  cancelarEliminacion={cancelarEliminacion}
                  confirmarEliminar={confirmarEliminar}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablaCategorias;

