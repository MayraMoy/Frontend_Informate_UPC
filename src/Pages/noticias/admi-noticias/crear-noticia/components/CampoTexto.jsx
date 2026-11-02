import React from "react";
import { IconoAlerta } from "./IconosNoticia";

const CampoTexto = ({
  id,
  label,
  value = "",
  onChange,
  error,
  multiline = false,
  maxLength,
  placeholder,
  ayuda,
  requerido = false,
}) => {
  const Campo = multiline ? "textarea" : "input";
  const caracteresActuales = (value || "").length;

  return (
    <div className={`crear-noticia__campo ${error ? "crear-noticia__campo--con-error" : ""}`}>
      <div className="crear-noticia__campo-encabezado">
        <label htmlFor={id} className="crear-noticia__label">
          {label}
          {requerido && <span className="crear-noticia__requerido" aria-hidden="true"> *</span>}
        </label>

        {maxLength && (
          <span
            className={`crear-noticia__contador ${
              caracteresActuales > maxLength * 0.9 ? "crear-noticia__contador--limite" : ""
            }`}
            aria-live="polite"
          >
            {caracteresActuales} / {maxLength}
          </span>
        )}
      </div>

      <div className="crear-noticia__input-wrapper">
        <Campo
          id={id}
          name={id}
          type={multiline ? undefined : "text"}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={multiline ? 8 : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined}
          className="crear-noticia__input"
        />
      </div>

      {ayuda && !error && (
        <span id={`${id}-ayuda`} className="crear-noticia__ayuda-texto">
          {ayuda}
        </span>
      )}

      {error && (
        <span id={`${id}-error`} className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};

export default CampoTexto;
