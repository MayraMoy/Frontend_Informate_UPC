import React from 'react';

export const VistaPreviaGaleria = ({
  imagenes = [],
  imagenActivaIndice = 0,
  setImagenActivaIndice,
  titulo = '',
}) => {
  if (!imagenes || imagenes.length === 0) return null;

  const imagenSeleccionada = imagenes[imagenActivaIndice] || imagenes[0];
  if (!imagenSeleccionada) return null;

  return (
    <figure className="crear-noticia__preview-figura">
      <div className="crear-noticia__preview-imagen-container">
        <img
          src={imagenSeleccionada.preview}
          alt={imagenSeleccionada.epigrafe || titulo}
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
        <div
          className="crear-noticia__preview-miniaturas"
          role="group"
          aria-label="Imágenes de la noticia"
        >
          {imagenes.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              className={`crear-noticia__preview-miniatura-btn ${
                imagenActivaIndice === idx
                  ? 'crear-noticia__preview-miniatura-btn--activa'
                  : ''
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
  );
};

export default VistaPreviaGaleria;

