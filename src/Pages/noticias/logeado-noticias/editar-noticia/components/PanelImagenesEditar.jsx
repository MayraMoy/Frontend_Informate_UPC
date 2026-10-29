import React, { useRef } from 'react';
import {
  IconoSubir,
  IconoTrash,
  IconoAlerta,
} from '../../crear-noticia/components/IconosNoticia';
import { formatearTamano } from '../../crear-noticia/utils/formatearHelpers';
import { LIMITES_EDICION } from '../data/editarNoticiaData';

export const PanelImagenesEditar = ({
  imagenesExistentes = [],
  nuevasImagenes = [],
  totalImagenes = 0,
  limiteAlcanzado = false,
  error = '',
  onAgregarImagenes,
  onCambiarEpigrafeExistente,
  onCambiarEpigrafeNueva,
  onEliminarExistente,
  onEliminarNueva,
}) => {
  const inputRef = useRef(null);

  const manejarDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!limiteAlcanzado && e.dataTransfer?.files?.length > 0) {
      onAgregarImagenes(e.dataTransfer.files);
    }
  };

  return (
    <div className={`crear-noticia__campo ${error ? 'crear-noticia__campo--con-error' : ''}`}>
      <div className="crear-noticia__campo-encabezado">
        <label htmlFor="imagenes-input" className="crear-noticia__label">
          Imágenes
          <span className="crear-noticia__opcional"> (máx. {LIMITES_EDICION.maxImagenes})</span>
        </label>
        <span className="crear-noticia__contador-imagenes">
          {totalImagenes} / {LIMITES_EDICION.maxImagenes}
        </span>
      </div>

      {/* Dropzone para sumar imágenes */}
      <div
        className={`crear-noticia__dropzone ${limiteAlcanzado ? 'crear-noticia__dropzone--bloqueada' : ''}`}
        onClick={() => !limiteAlcanzado && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={manejarDrop}
        role="button"
        tabIndex={limiteAlcanzado ? -1 : 0}
        aria-label="Agregar imágenes"
      >
        <input
          ref={inputRef}
          id="imagenes-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={limiteAlcanzado}
          onChange={(e) => {
            onAgregarImagenes(e.target.files);
            e.target.value = '';
          }}
          className="crear-noticia__file-input-oculto"
        />

        <div className="crear-noticia__dropzone-icono">
          <IconoSubir />
        </div>

        <div className="crear-noticia__dropzone-texto">
          {limiteAlcanzado ? (
            <p className="crear-noticia__dropzone-titulo">Límite de {LIMITES_EDICION.maxImagenes} imágenes alcanzado</p>
          ) : (
            <>
              <p className="crear-noticia__dropzone-titulo">
                <strong>Hacé clic</strong> o arrastrá para sumar más imágenes
              </p>
              <p className="crear-noticia__dropzone-subtitulo">
                JPG, PNG, WEBP · Hasta 5 MB por archivo
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <span className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </span>
      )}

      {/* Lista de imágenes: existentes en backend + nuevas seleccionadas */}
      {totalImagenes > 0 && (
        <div className="crear-noticia__imagenes-lista mt-3">
          {/* 1. Imágenes existentes */}
          {imagenesExistentes.map((img, idx) => {
            const epigrafeFaltante = !(img.epigrafe || '').trim();
            const tieneError = Boolean(error) && epigrafeFaltante;

            return (
              <div key={`existente-${img.id}`} className="crear-noticia__imagen-tarjeta">
                <div className="crear-noticia__imagen-preview-wrapper">
                  <img
                    src={img.url}
                    alt={img.epigrafe || 'Imagen de la noticia'}
                    className="crear-noticia__imagen-preview"
                  />
                  <span className="crear-noticia__imagen-badge">
                    {idx === 0 ? 'Portada' : `Foto ${idx + 1}`}
                  </span>
                </div>

                <div className="crear-noticia__imagen-info">
                  <div className="crear-noticia__imagen-epigrafe-campo">
                    <label htmlFor={`epigrafe-ex-${img.id}`} className="crear-noticia__sublabel">
                      Epígrafe <span className="crear-noticia__requerido" title="Obligatorio">*</span>
                    </label>
                    <input
                      id={`epigrafe-ex-${img.id}`}
                      type="text"
                      className={`crear-noticia__input crear-noticia__input--epigrafe ${
                        tieneError ? 'crear-noticia__input--error' : ''
                      }`}
                      value={img.epigrafe || ''}
                      onChange={(e) => onCambiarEpigrafeExistente(img.id, e.target.value)}
                      placeholder="Epígrafe obligatorio para esta foto"
                      maxLength={200}
                      aria-required="true"
                    />
                    {tieneError && (
                      <span className="crear-noticia__error-epigrafe" role="alert">
                        Ingresá un epígrafe para esta imagen
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="crear-noticia__imagen-boton-eliminar"
                  onClick={() => onEliminarExistente(img.id)}
                  title="Quitar imagen"
                  aria-label="Quitar imagen existente"
                >
                  <IconoTrash />
                  <span>Quitar</span>
                </button>
              </div>
            );
          })}

          {/* 2. Nuevas imágenes añadidas */}
          {nuevasImagenes.map((img, idx) => {
            const indiceTotal = imagenesExistentes.length + idx;
            const epigrafeFaltante = !(img.epigrafe || '').trim();
            const tieneError = Boolean(error) && epigrafeFaltante;

            return (
              <div key={`nueva-${img.tempId}`} className="crear-noticia__imagen-tarjeta">
                <div className="crear-noticia__imagen-preview-wrapper">
                  <img
                    src={img.preview}
                    alt={img.epigrafe || img.archivo.name}
                    className="crear-noticia__imagen-preview"
                  />
                  <span className="crear-noticia__imagen-badge">
                    {indiceTotal === 0 ? 'Portada' : `Foto ${indiceTotal + 1}`} (Nueva)
                  </span>
                </div>

                <div className="crear-noticia__imagen-info">
                  <div className="crear-noticia__imagen-meta">
                    <span className="crear-noticia__imagen-nombre" title={img.archivo.name}>
                      {img.archivo.name}
                    </span>
                    <span className="crear-noticia__imagen-peso">
                      {formatearTamano(img.archivo.size)}
                    </span>
                  </div>

                  <div className="crear-noticia__imagen-epigrafe-campo">
                    <label htmlFor={`epigrafe-nu-${img.tempId}`} className="crear-noticia__sublabel">
                      Epígrafe <span className="crear-noticia__requerido" title="Obligatorio">*</span>
                    </label>
                    <input
                      id={`epigrafe-nu-${img.tempId}`}
                      type="text"
                      className={`crear-noticia__input crear-noticia__input--epigrafe ${
                        tieneError ? 'crear-noticia__input--error' : ''
                      }`}
                      value={img.epigrafe || ''}
                      onChange={(e) => onCambiarEpigrafeNueva(img.tempId, e.target.value)}
                      placeholder="Epígrafe obligatorio para esta foto"
                      maxLength={200}
                      aria-required="true"
                    />
                    {tieneError && (
                      <span className="crear-noticia__error-epigrafe" role="alert">
                        Ingresá un epígrafe para esta imagen
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="crear-noticia__imagen-boton-eliminar"
                  onClick={() => onEliminarNueva(img.tempId)}
                  title="Quitar imagen"
                  aria-label="Quitar nueva imagen seleccionada"
                >
                  <IconoTrash />
                  <span>Quitar</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

