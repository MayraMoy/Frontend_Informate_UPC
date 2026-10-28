import React from "react";
import CampoTexto from "./CampoTexto";
import CampoCategoria from "./CampoCategoria";
import CampoImagenes from "./CampoImagenes";
import EditorNoticia from "./EditorNoticia";
import { NOTICIA_LIMITES } from "../data/crearNoticiaData";

const CamposNoticia = ({
  valores,
  errores,
  categorias,
  cargandoCategorias,
  errorCategorias,
  onChange,
  imagenes = [],
  errorImagenes = "",
  onSeleccionarImagen,
  onCambiarEpigrafe,
  onQuitarImagen,
}) => {
  return (
    <div className="crear-noticia__campos-grupo">
      <CampoTexto
        id="titulo"
        label="Título"
        value={valores.titulo}
        onChange={onChange}
        error={errores.titulo}
        maxLength={NOTICIA_LIMITES.titulo}
        placeholder="Ingresá el título"
        requerido
      />

      <CampoCategoria
        categorias={categorias}
        cargando={cargandoCategorias}
        errorCarga={errorCategorias}
        value={valores.categoriaId}
        onChange={onChange}
        error={errores.categoriaId}
        requerido
      />

      <EditorNoticia
        value={valores.cuerpo}
        onChange={(html) =>
          onChange({
            target: {
              name: "cuerpo",
              value: html,
            },
          })
        }
        error={errores.cuerpo}
        requerido
      />

      <CampoImagenes
        imagenes={imagenes}
        error={errorImagenes}
        onSeleccionarImagen={onSeleccionarImagen}
        onCambiarEpigrafe={onCambiarEpigrafe}
        onQuitarImagen={onQuitarImagen}
      />
    </div>
  );
};

export default CamposNoticia;
