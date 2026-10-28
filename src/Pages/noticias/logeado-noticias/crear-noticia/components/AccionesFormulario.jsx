import React from "react";
import { IconoEnviar, IconoLimpiar, IconoAlerta } from "./IconosNoticia";

const AccionesFormulario = ({
  guardando = false,
  error = "",
  onLimpiar,
  onVerPreview,
}) => {
  return (
    <footer className="crear-noticia__acciones-contenedor">
      {error && (
        <div className="crear-noticia__alerta-error-envio" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </div>
      )}

      <div className="crear-noticia__acciones-fila">
        <button
          type="button"
          className="crear-noticia__boton-secundario"
          onClick={onLimpiar}
          disabled={guardando}
          title="Borrar todos los campos ingresados"
        >
          <IconoLimpiar />
          <span>Limpiar formulario</span>
        </button>

        <div className="crear-noticia__acciones-derecha">
          {onVerPreview && (
            <button
              type="button"
              className="crear-noticia__boton-previsualizar"
              onClick={onVerPreview}
              disabled={guardando}
            >
              Vista previa
            </button>
          )}

          <button
            type="submit"
            className="crear-noticia__boton-principal"
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
        </div>
      </div>
    </footer>
  );
};

export default AccionesFormulario;
