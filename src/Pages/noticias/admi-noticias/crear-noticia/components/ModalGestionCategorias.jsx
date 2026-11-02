import React from 'react';
import { createPortal } from 'react-dom';
import { useGestionCategorias } from '../hooks/useGestionCategorias';
import {
  EncabezadoModalCategorias,
  AlertaModalCategorias,
  BloqueCrearCategoria,
  ToolbarCategorias,
  TablaCategorias,
  PieModalCategorias,
} from './modal-categorias';
import '../styles/ModalGestionCategorias.css';

export const ModalGestionCategorias = ({
  isOpen,
  onClose,
  categoriasIniciales = [],
  onCategoriasActualizadas,
  onSeleccionarCategoria,
}) => {
  const {
    categorias,
    cargando,
    filtro,
    setFiltro,
    hayFiltro,
    nuevoNombre,
    setNuevoNombre,
    creando,
    manejarCrearCategoria,
    inputNuevoRef,
    idEnEdicion,
    nombreEnEdicion,
    setNombreEnEdicion,
    guardandoEdicion,
    inputEdicionRef,
    iniciarEdicion,
    cancelarEdicion,
    guardarEdicion,
    idAEliminar,
    eliminando,
    iniciarEliminacion,
    cancelarEliminacion,
    confirmarEliminar,
    alerta,
    categoriasFiltradas,
    categoriasAMostrar,
  } = useGestionCategorias({
    isOpen,
    onClose,
    categoriasIniciales,
    onCategoriasActualizadas,
    onSeleccionarCategoria,
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-categorias__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-categorias-titulo"
    >
      <div
        className="modal-categorias__dialogo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <EncabezadoModalCategorias onClose={onClose} />

        {/* Alerta de Feedback */}
        <AlertaModalCategorias alerta={alerta} />

        {/* 1. Bloque de Creación de Categorías */}
        <BloqueCrearCategoria
          nuevoNombre={nuevoNombre}
          setNuevoNombre={setNuevoNombre}
          manejarCrearCategoria={manejarCrearCategoria}
          creando={creando}
          inputNuevoRef={inputNuevoRef}
        />

        {/* 2. Barra de herramientas: Total registrado y buscador integrado */}
        <ToolbarCategorias
          totalCategorias={categorias.length}
          totalFiltradas={categoriasFiltradas.length}
          hayFiltro={hayFiltro}
          filtro={filtro}
          setFiltro={setFiltro}
        />

        {/* 3. Tabla con registros (3 por defecto, todas al filtrar) */}
        <TablaCategorias
          cargando={cargando}
          totalCategorias={categorias.length}
          filtro={filtro}
          categoriasAMostrar={categoriasAMostrar}
          idEnEdicion={idEnEdicion}
          nombreEnEdicion={nombreEnEdicion}
          setNombreEnEdicion={setNombreEnEdicion}
          guardandoEdicion={guardandoEdicion}
          idAEliminar={idAEliminar}
          eliminando={eliminando}
          inputEdicionRef={inputEdicionRef}
          iniciarEdicion={iniciarEdicion}
          cancelarEdicion={cancelarEdicion}
          guardarEdicion={guardarEdicion}
          iniciarEliminacion={iniciarEliminacion}
          cancelarEliminacion={cancelarEliminacion}
          confirmarEliminar={confirmarEliminar}
        />

        {/* Pie del modal */}
        <PieModalCategorias onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default ModalGestionCategorias;
