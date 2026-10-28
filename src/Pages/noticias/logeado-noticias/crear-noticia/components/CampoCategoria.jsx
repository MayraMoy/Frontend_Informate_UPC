import React from "react";
import { IconoAlerta } from "./IconosNoticia";

const CampoCategoria = ({
  categorias = [],
  value = "",
  onChange,
  error,
  cargando = false,
  errorCarga = "",
  requerido = true,
}) => {
  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id) === String(value)
  );

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
        {categoriaSeleccionada && (
          <span className="crear-noticia__categoria-badge-preview">
            Seleccionada: <strong>{categoriaSeleccionada.nombre}</strong>
          </span>
        )}
      </div>

      <div className="crear-noticia__select-wrapper">
        <select
          id="categoriaId"
          name="categoriaId"
          value={value}
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

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
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
            const activa = String(value) === String(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                className={`crear-noticia__chip ${activa ? "crear-noticia__chip--activa" : ""}`}
                onClick={() => seleccionarRapido(cat.id)}
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
