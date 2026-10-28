import React, { useState, useRef } from "react";
import { IconoSubir, IconoTrash, IconoAlerta } from "./IconosNoticia";
import { formatearTamano } from "../utils/formatearHelpers";

const MAX_IMAGENES = 3;

const CampoImagenes = ({
  imagenes = [],
  error = "",
  onSeleccionarImagen,
  onCambiarEpigrafe,
  onQuitarImagen,
}) => {
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef(null);

  const manejarDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (imagenes.length < MAX_IMAGENES) {
      setArrastrando(true);
    }
  };

  const manejarDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setArrastrando(false);
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setArrastrando(false);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      onSeleccionarImagen?.(e.dataTransfer.files);
    }
  };

  const manejarSeleccion = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onSeleccionarImagen?.(event.target.files);
    }
    event.target.value = "";
  };

  const abrirSelector = () => {
    if (imagenes.length < MAX_IMAGENES) {
      inputRef.current?.click();
    }
  };

  const limiteAlcanzado = imagenes.length >= MAX_IMAGENES;

  return (
    <div className={`crear-noticia__campo ${error ? "crear-noticia__campo--con-error" : ""}`}>
      <div className="crear-noticia__campo-encabezado">
        <label htmlFor="imagenes" className="crear-noticia__label">
          Imágenes
          <span className="crear-noticia__opcional"> (máx. 3)</span>
        </label>
        <span className="crear-noticia__contador-imagenes">
          {imagenes.length} / {MAX_IMAGENES}
        </span>
      </div>

      {/* Zona de Dropzone interactiva */}
      <div
        className={`crear-noticia__dropzone ${
          arrastrando ? "crear-noticia__dropzone--arrastrando" : ""
        } ${limiteAlcanzado ? "crear-noticia__dropzone--bloqueada" : ""}`}
        onDragOver={manejarDragOver}
        onDragLeave={manejarDragLeave}
        onDrop={manejarDrop}
        onClick={abrirSelector}
        role="button"
        tabIndex={limiteAlcanzado ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !limiteAlcanzado) {
            e.preventDefault();
            abrirSelector();
          }
        }}
        aria-label="Subir imágenes"
      >
        <input
          ref={inputRef}
          id="imagenes"
          name="imagenes"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={limiteAlcanzado}
          onChange={manejarSeleccion}
          className="crear-noticia__file-input-oculto"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "imagenes-error" : "imagenes-ayuda"}
        />

        <div className="crear-noticia__dropzone-icono">
          <IconoSubir />
        </div>

        <div className="crear-noticia__dropzone-texto">
          {limiteAlcanzado ? (
            <p className="crear-noticia__dropzone-titulo">
              Límite de 3 imágenes alcanzado
            </p>
          ) : (
            <>
              <p className="crear-noticia__dropzone-titulo">
                <strong>Hacé clic</strong> o arrastrá las imágenes acá
              </p>
              <p id="imagenes-ayuda" className="crear-noticia__dropzone-subtitulo">
                JPG, PNG, WEBP · Hasta 5 MB por archivo
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <span id="imagenes-error" className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </span>
      )}

      {/* Lista de imágenes cargadas */}
      {imagenes.length > 0 && (
        <div className="crear-noticia__imagenes-lista">
          {imagenes.map((imagen, indice) => (
            <div key={imagen.id} className="crear-noticia__imagen-tarjeta">
              <div className="crear-noticia__imagen-preview-wrapper">
                <img
                  src={imagen.preview}
                  alt={imagen.epigrafe || imagen.archivo.name}
                  className="crear-noticia__imagen-preview"
                />
                <span className="crear-noticia__imagen-badge">
                  {indice === 0 ? "Portada" : `Foto ${indice + 1}`}
                </span>
              </div>

              <div className="crear-noticia__imagen-info">
                <div className="crear-noticia__imagen-meta">
                  <span className="crear-noticia__imagen-nombre" title={imagen.archivo.name}>
                    {imagen.archivo.name}
                  </span>
                  <span className="crear-noticia__imagen-peso">
                    {formatearTamano(imagen.archivo.size)}
                  </span>
                </div>

                <div className="crear-noticia__imagen-epigrafe-campo">
                  <label htmlFor={`epigrafe-${imagen.id}`} className="crear-noticia__sublabel">
                    Epígrafe:
                  </label>
                  <input
                    id={`epigrafe-${imagen.id}`}
                    type="text"
                    className="crear-noticia__input crear-noticia__input--epigrafe"
                    value={imagen.epigrafe || ""}
                    onChange={(e) => onCambiarEpigrafe?.(imagen.id, e.target.value)}
                    placeholder="Descripción o epígrafe"
                    maxLength={200}
                  />
                </div>
              </div>

              <button
                type="button"
                className="crear-noticia__imagen-boton-eliminar"
                onClick={() => onQuitarImagen?.(imagen.id)}
                title="Quitar imagen"
                aria-label={`Quitar ${imagen.archivo.name}`}
              >
                <IconoTrash />
                <span>Quitar</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampoImagenes;
