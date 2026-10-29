import React from 'react';
import { IconoTrash } from '../../../crear-noticia/components/IconosNoticia';
import { formatearTamano } from '../../../crear-noticia/utils/formatearHelpers';

export const TarjetaImagenNueva = ({
  img,
  indiceTotal,
  error,
  onCambiarEpigrafe,
  onEliminar,
}) => {
  const epigrafeFaltante = !(img.epigrafe || '').trim();
  const tieneError = Boolean(error) && epigrafeFaltante;

  return (
    <div className="crear-noticia__imagen-tarjeta">
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
            onChange={(e) => onCambiarEpigrafe(img.tempId, e.target.value)}
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
        onClick={() => onEliminar(img.tempId)}
        title="Quitar imagen"
        aria-label="Quitar nueva imagen seleccionada"
      >
        <IconoTrash />
        <span>Quitar</span>
      </button>
    </div>
  );
};

export default TarjetaImagenNueva;

