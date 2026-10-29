import React, { useState } from 'react';

export const GaleriaImagenesNoticia = ({
  imagenes = [],
  imagenSeleccionada,
  imagenActivaIndice,
  onSeleccionarImagen,
  tituloNoticia = '',
}) => {
  const [imagenFallida, setImagenFallida] = useState(false);

  if (!imagenes || imagenes.length === 0 || !imagenSeleccionada) {
    return null;
  }

  const urlActual = imagenSeleccionada.url || imagenSeleccionada.preview;
  const epigrafeActual = imagenSeleccionada.epigrafe || '';

  return (
    <figure className="detalle-noticia-galeria">
      <div className="detalle-noticia-imagen-principal-wrapper">
        {!imagenFallida ? (
          <img
            src={urlActual}
            alt={epigrafeActual || tituloNoticia || 'Imagen de la noticia'}
            className="detalle-noticia-imagen-principal"
            onError={() => setImagenFallida(true)}
          />
        ) : (
          <div className="detalle-noticia-imagen-placeholder">
            <span>No se pudo cargar la imagen</span>
          </div>
        )}

        {imagenes.length > 1 && (
          <div className="detalle-noticia-contador-imagenes">
            {imagenActivaIndice + 1} / {imagenes.length}
          </div>
        )}
      </div>

      {epigrafeActual && (
        <figcaption className="detalle-noticia-epigrafe">
          <span>{epigrafeActual}</span>
        </figcaption>
      )}

      {/* Miniaturas si hay más de 1 imagen */}
      {imagenes.length > 1 && (
        <div
          className="detalle-noticia-miniaturas"
          role="tablist"
          aria-label="Galería de imágenes de la noticia"
        >
          {imagenes.map((img, idx) => {
            const esActiva = idx === imagenActivaIndice;
            const urlMin = img.url || img.preview;
            return (
              <button
                key={img.id || idx}
                type="button"
                role="tab"
                aria-selected={esActiva}
                className={`detalle-noticia-miniatura-btn ${esActiva ? 'detalle-noticia-miniatura-btn--activa' : ''}`}
                onClick={() => {
                  setImagenFallida(false);
                  onSeleccionarImagen(idx);
                }}
                title={img.epigrafe || `Ver imagen ${idx + 1}`}
              >
                <img
                  src={urlMin}
                  alt={img.epigrafe || `Miniatura ${idx + 1}`}
                  className="detalle-noticia-miniatura-img"
                />
              </button>
            );
          })}
        </div>
      )}
    </figure>
  );
};

export default GaleriaImagenesNoticia;
