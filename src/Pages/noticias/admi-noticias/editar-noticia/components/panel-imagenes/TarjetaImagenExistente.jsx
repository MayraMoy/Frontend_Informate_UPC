import React from 'react';
import { IconoTrash } from '../../../crear-noticia/components/IconosNoticia';

export const TarjetaImagenExistente = ({
  img,
  idx,
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
            onChange={(e) => onCambiarEpigrafe(img.id, e.target.value)}
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
        onClick={() => onEliminar(img.id)}
        title="Quitar imagen"
        aria-label="Quitar imagen existente"
      >
        <IconoTrash />
        <span>Quitar</span>
      </button>
    </div>
  );
};

export default TarjetaImagenExistente;

