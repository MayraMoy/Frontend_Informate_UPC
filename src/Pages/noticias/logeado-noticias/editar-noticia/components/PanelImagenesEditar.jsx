import React from 'react';
import { IconoAlerta } from '../../crear-noticia/components/IconosNoticia';
import { LIMITES_EDICION } from '../data/editarNoticiaData';
import {
  DropzoneImagenesEditar,
  TarjetaImagenExistente,
  TarjetaImagenNueva,
} from './panel-imagenes';

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
      <DropzoneImagenesEditar
        limiteAlcanzado={limiteAlcanzado}
        onAgregarImagenes={onAgregarImagenes}
      />

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
          {imagenesExistentes.map((img, idx) => (
            <TarjetaImagenExistente
              key={`existente-${img.id}`}
              img={img}
              idx={idx}
              error={error}
              onCambiarEpigrafe={onCambiarEpigrafeExistente}
              onEliminar={onEliminarExistente}
            />
          ))}

          {/* 2. Nuevas imágenes añadidas */}
          {nuevasImagenes.map((img, idx) => (
            <TarjetaImagenNueva
              key={`nueva-${img.tempId}`}
              img={img}
              indiceTotal={imagenesExistentes.length + idx}
              error={error}
              onCambiarEpigrafe={onCambiarEpigrafeNueva}
              onEliminar={onEliminarNueva}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PanelImagenesEditar;
