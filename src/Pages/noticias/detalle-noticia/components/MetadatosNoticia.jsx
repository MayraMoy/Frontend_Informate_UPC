import React from 'react';
import { IconoReloj } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const MetadatosNoticia = ({
  categoriaNombre,
  categoriaBadgeClass,
  tiempoLectura,
  nombreAutor,
  fechaPublicacion,
  fechaActualizacion,
  fechaCreacion,
}) => {
  const inicialAutor = String(nombreAutor || 'A').charAt(0).toUpperCase();

  return (
    <header className="detalle-noticia-metadatos">
      {/* Fila superior: Categoría + Tiempo de lectura (sin estado de noticia) */}
      <div className="detalle-noticia-metadatos-top">
        {categoriaNombre && (
          <span className={`badge rounded-pill px-3 py-1.5 ${categoriaBadgeClass}`}>
            {categoriaNombre.toUpperCase()}
          </span>
        )}

        {tiempoLectura && (
          <span className="detalle-noticia-tiempo-lectura">
            <IconoReloj />
            <span>{tiempoLectura}</span>
          </span>
        )}
      </div>

      {/* Fila inferior: Autor y Fechas */}
      <div className="detalle-noticia-autor-fila">
        <div className="detalle-noticia-avatar" aria-hidden="true">
          {inicialAutor}
        </div>
        <div className="detalle-noticia-autor-info">
          <span className="detalle-noticia-autor-nombre">{nombreAutor}</span>
          <div className="detalle-noticia-fechas">
            {fechaPublicacion ? (
              <span className="detalle-noticia-fecha-publicada">
                Publicado el {fechaPublicacion}
              </span>
            ) : fechaCreacion ? (
              <span className="detalle-noticia-fecha-creada">
                Creado el {fechaCreacion}
              </span>
            ) : null}

            {fechaActualizacion && (
              <span className="detalle-noticia-fecha-editada">
                • Actualizado el {fechaActualizacion}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MetadatosNoticia;
