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
  onRecargarCategorias,
  onChange,
  imagenes = [],
  errorImagenes = "",
  onSeleccionarImagen,
  onCambiarEpigrafe,
  onQuitarImagen,
  accionesSlot,
}) => {
  return (
    <div className="crear-noticia__layout-grid">
      {/* Columna Principal (Izquierda): Título y Editor enriquecido */}
      <div className="crear-noticia__columna-principal">
        <div className="crear-noticia__card-panel">
          <CampoTexto
            id="titulo"
            label="Título de la noticia"
            value={valores.titulo}
            onChange={onChange}
            error={errores.titulo}
            maxLength={NOTICIA_LIMITES.titulo}
            placeholder="Ingresá un título descriptivo y claro"
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
        </div>
      </div>

      {/* Columna Lateral (Derecha): Publicación, Categoría y Medios */}
      <aside className="crear-noticia__columna-lateral">
        {accionesSlot && (
          <div className="crear-noticia__card-sidebar crear-noticia__card-sidebar--publicacion">
            <div className="crear-noticia__card-sidebar-encabezado">
              <h2 className="crear-noticia__card-sidebar-titulo">Publicación</h2>
              <span className="crear-noticia__estado-badge">Borrador</span>
            </div>
            {accionesSlot}
          </div>
        )}

        <div className="crear-noticia__card-sidebar">
          <CampoCategoria
            categorias={categorias}
            cargando={cargandoCategorias}
            errorCarga={errorCategorias}
            onRecargarCategorias={onRecargarCategorias}
            value={valores.categoriaId}
            onChange={onChange}
            error={errores.categoriaId}
            requerido
          />
        </div>

        <div className="crear-noticia__card-sidebar">
          <CampoImagenes
            imagenes={imagenes}
            error={errorImagenes}
            onSeleccionarImagen={onSeleccionarImagen}
            onCambiarEpigrafe={onCambiarEpigrafe}
            onQuitarImagen={onQuitarImagen}
          />
        </div>
      </aside>
    </div>
  );
};

export default CamposNoticia;
