import React, { useState } from "react";
import { IconoAlerta } from "./IconosNoticia";
import ModalGestionCategorias from "./ModalGestionCategorias";

const obtenerIdCategoria = (cat) =>
  String(
    cat?.id ??
    cat?.idCategoria ??
    cat?.id_categoria ??
    cat?.idCategoriaNoticia ??
    cat?.id_categoria_noticia ??
    ""
  );

const normalizarTexto = (txt) =>
  String(txt || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const CampoCategoria = ({
  categorias = [],
  value = "",
  onChange,
  onRecargarCategorias,
  error,
  cargando = false,
  errorCarga = "",
  requerido = true,
}) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const categoriaSeleccionada = categorias.find((c) => {
    const idCat = obtenerIdCategoria(c);
    if (idCat && String(idCat) === String(value)) return true;
    if (c.nombre && normalizarTexto(c.nombre) === normalizarTexto(value)) return true;
    return false;
  });

  const valorSelect = categoriaSeleccionada
    ? obtenerIdCategoria(categoriaSeleccionada)
    : String(value || "");

  const seleccionarRapido = (id) => {
    onChange?.({
      target: {
        name: "categoriaId",
        value: String(id),
      },
    });
  };

  const manejarChangeSelect = (e) => {
    onChange?.(e);
  };

  return (
    <div className={`crear-noticia__campo ${error ? "crear-noticia__campo--con-error" : ""}`}>
      {/* Modal / Pestaña de Gestión de Categorías */}
      <ModalGestionCategorias
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        categoriasIniciales={categorias}
        onCategoriasActualizadas={() => {
          onRecargarCategorias?.();
        }}
        onSeleccionarCategoria={(nuevaId) => {
          seleccionarRapido(nuevaId);
        }}
      />

      <div className="crear-noticia__campo-encabezado d-flex align-items-center justify-content-between">
        <label htmlFor="categoriaId" className="crear-noticia__label mb-0">
          Categoría
          {requerido && <span className="crear-noticia__requerido" aria-hidden="true"> *</span>}
        </label>

        <button
          type="button"
          className="crear-noticia__btn-gestionar-categorias"
          onClick={() => setModalAbierto(true)}
          title="Administrar categorías y etiquetas"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Gestionar</span>
        </button>
      </div>

      <div className="crear-noticia__select-wrapper">
        <select
          id="categoriaId"
          name="categoriaId"
          value={valorSelect}
          onChange={manejarChangeSelect}
          disabled={cargando || Boolean(errorCarga)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "categoriaId-error" : errorCarga ? "categoriaId-carga-error" : undefined
          }
          className="crear-noticia__select"
        >
          <option value="">
            {cargando ? "Cargando categorías disponibles..." : "— Seleccioná una categoría —"}
          </option>

          {categorias.map((categoria) => {
            const idOpt = obtenerIdCategoria(categoria);
            return (
              <option key={idOpt || categoria.nombre} value={idOpt}>
                {categoria.nombre}
              </option>
            );
          })}
        </select>
        <span className="crear-noticia__select-flecha" aria-hidden="true">
          ▾
        </span>
      </div>

      {errorCarga && (
        <span id="categoriaId-carga-error" className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{errorCarga}</span>
        </span>
      )}

      {error && (
        <span id="categoriaId-error" className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};

export default CampoCategoria;
