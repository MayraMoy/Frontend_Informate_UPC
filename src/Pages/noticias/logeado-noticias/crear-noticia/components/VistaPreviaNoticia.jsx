import React, { useState } from "react";
import ContenidoNoticia from "./ContenidoNoticia";
import { formatearFechaHoy, tiempoLectura, contarPalabras } from "../utils/formatearHelpers";
import { IconoImagen, IconoOjo, IconoReloj } from "./IconosNoticia";

const VistaPreviaNoticia = ({
  valores = {},
  categorias = [],
  imagenes = [],
  usuario = null,
}) => {
  const [imagenActivaIndice, setImagenActivaIndice] = useState(0);

  const categoria = categorias.find(
    (c) => String(c.id) === String(valores.categoriaId)
  );

  const tieneTitulo = Boolean(valores.titulo?.trim());
  const tieneCuerpo = Boolean(valores.cuerpo?.trim());
  const palabras = contarPalabras(valores.cuerpo);
  const lectura = tiempoLectura(palabras);
  const fechaHoy = formatearFechaHoy();
  const nombreAutor = usuario?.nombre || usuario?.username || "Redacción Informate UPC";

  const imagenSeleccionada = imagenes[imagenActivaIndice] || imagenes[0];

  const getBadgeClass = (nombreCat = "") => {
    const normal = nombreCat.toLowerCase();
    if (normal.includes("acad")) return "badge-academica";
    if (normal.includes("invest")) return "badge-investigacion";
    if (normal.includes("bien")) return "badge-bienestar";
    return "badge-default";
  };

  if (!tieneTitulo && !tieneCuerpo && imagenes.length === 0) {
    return (
      <div className="crear-noticia__preview-vacia">
        <div className="crear-noticia__preview-vacia-icono">
          <IconoImagen />
        </div>
        <h3>La vista previa está lista</h3>
        <p>
          Ingresá el título y contenido para ver la vista previa.
        </p>
      </div>
    );
  }

  return (
    <article className="crear-noticia__preview-articulo">
      {/* Banner de previsualización con icono SVG, sin emojis */}
      <div className="crear-noticia__preview-aviso">
        <span className="crear-noticia__preview-aviso-texto">
          <IconoOjo />
          <span>Vista previa</span>
        </span>
        <small>Visualización de la noticia antes de publicar</small>
      </div>

      <header className="crear-noticia__preview-header">
        <div className="crear-noticia__preview-metadatos-top">
          <span className={`crear-noticia__preview-categoria ${getBadgeClass(categoria?.nombre)}`}>
            {categoria ? categoria.nombre : "Sin categoría"}
          </span>
          <span className="crear-noticia__preview-lectura">
            <IconoReloj />
            <span>{lectura}</span>
          </span>
        </div>

        <h1 className="crear-noticia__preview-titulo">
          {tieneTitulo ? valores.titulo : "Título de la noticia"}
        </h1>

        <div className="crear-noticia__preview-autor-fila">
          <div className="crear-noticia__preview-avatar">
            {nombreAutor.charAt(0).toUpperCase()}
          </div>
          <div className="crear-noticia__preview-autor-info">
            <span className="crear-noticia__preview-autor-nombre">{nombreAutor}</span>
            <span className="crear-noticia__preview-fecha">{fechaHoy}</span>
          </div>
        </div>
      </header>

      {/* Galería / Imagen destacada */}
      {imagenes.length > 0 && imagenSeleccionada && (
        <figure className="crear-noticia__preview-figura">
          <div className="crear-noticia__preview-imagen-container">
            <img
              src={imagenSeleccionada.preview}
              alt={imagenSeleccionada.epigrafe || valores.titulo}
              className="crear-noticia__preview-imagen-principal"
            />
          </div>

          {imagenSeleccionada.epigrafe && (
            <figcaption className="crear-noticia__preview-epigrafe">
              {imagenSeleccionada.epigrafe}
            </figcaption>
          )}

          {/* Miniaturas si hay más de una */}
          {imagenes.length > 1 && (
            <div className="crear-noticia__preview-miniaturas" role="group" aria-label="Imágenes de la noticia">
              {imagenes.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  className={`crear-noticia__preview-miniatura-btn ${
                    imagenActivaIndice === idx ? "crear-noticia__preview-miniatura-btn--activa" : ""
                  }`}
                  onClick={() => setImagenActivaIndice(idx)}
                  title={`Ver imagen ${idx + 1}`}
                >
                  <img src={img.preview} alt={`Miniatura ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </figure>
      )}

      {/* Cuerpo de la noticia renderizado seguro */}
      <div className="crear-noticia__preview-cuerpo">
        {tieneCuerpo ? (
          <ContenidoNoticia cuerpo={valores.cuerpo} />
        ) : (
          <p className="crear-noticia__preview-cuerpo-vacio">
            [Contenido de la noticia]
          </p>
        )}
      </div>
    </article>
  );
};

export default VistaPreviaNoticia;
