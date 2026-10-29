import React, { useRef } from 'react';
import { IconoSubir } from '../../../crear-noticia/components/IconosNoticia';
import { LIMITES_EDICION } from '../../data/editarNoticiaData';

export const DropzoneImagenesEditar = ({
  limiteAlcanzado,
  onAgregarImagenes,
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
          <p className="crear-noticia__dropzone-titulo">
            Límite de {LIMITES_EDICION.maxImagenes} imágenes alcanzado
          </p>
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
  );
};

export default DropzoneImagenesEditar;

