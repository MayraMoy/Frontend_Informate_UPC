import React from "react";
import { IconoEnviar, IconoLimpiar, IconoAlerta, IconoOjo } from "./IconosNoticia";

const AccionesFormulario = ({
  guardando = false,
  error = "",
  onLimpiar,
  onVerPreview,
}) => {
  return (
    <div className="crear-noticia__acciones-contenedor">
      {error && (
        <div className="crear-noticia__alerta-error-envio" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </div>
      )}

      <div className="crear-noticia__acciones-panel">
        <button
          type="submit"
          className="crear-noticia__boton-principal crear-noticia__boton-publicar"
          disabled={guardando}
        >
          {guardando ? (
            <>
              <span className="crear-noticia__mini-spinner" aria-hidden="true" />
              <span>Publicando...</span>
            </>
          ) : (
            <>
              <IconoEnviar />
              <span>Publicar noticia</span>
            </>
          )}
        </button>

        <div className="crear-noticia__acciones-secundarias">
          {onVerPreview && (
            <button
              type="button"
              className="crear-noticia__boton-previsualizar"
              onClick={onVerPreview}
              disabled={guardando}
            >
              <IconoOjo />
              <span>Vista previa</span>
            </button>
          )}

          <button
            type="button"
            className="crear-noticia__boton-secundario"
            onClick={onLimpiar}
            disabled={guardando}
            title="Borrar todos los campos ingresados"
          >
            <IconoLimpiar />
            <span>Limpiar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccionesFormulario;
