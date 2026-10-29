import React from "react";
import { IconoAlerta } from "./IconosNoticia";

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
  error,
  cargando = false,
  errorCarga = "",
  requerido = true,
}) => {
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

  return (
    <div className={`crear-noticia__campo ${error ? "crear-noticia__campo--con-error" : ""}`}>
      <div className="crear-noticia__campo-encabezado">
        <label htmlFor="categoriaId" className="crear-noticia__label">
          Categoría
          {requerido && <span className="crear-noticia__requerido" aria-hidden="true"> *</span>}
        </label>
      </div>

      <div className="crear-noticia__select-wrapper">
        <select
          id="categoriaId"
          name="categoriaId"
          value={valorSelect}
          onChange={onChange}
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

      {/* Sugerencias rápidas en chips */}
      {categorias.length > 0 && !cargando && (
        <div className="crear-noticia__categorias-chips" role="group" aria-label="Categorías sugeridas">
          <span className="crear-noticia__chips-label">Atajos:</span>
          {categorias.slice(0, 6).map((cat) => {
            const idChip = obtenerIdCategoria(cat);
            const activa =
              valorSelect === idChip || normalizarTexto(cat.nombre) === normalizarTexto(value);
            return (
              <button
                key={idChip || cat.nombre}
                type="button"
                className={`crear-noticia__chip ${activa ? "crear-noticia__chip--activa" : ""}`}
                onClick={() => seleccionarRapido(idChip)}
                aria-pressed={activa}
              >
                {cat.nombre}
              </button>
            );
          })}
        </div>
      )}

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
