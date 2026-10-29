import React from 'react';
import { IconoReloj, IconoTexto } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const SidebarDetalleNoticia = ({
  categoriaNombre,
  categoriaBadgeClass,
  nombreAutor,
  fechaPublicacion,
  fechaActualizacion,
  fechaCreacion,
  tiempoLectura,
  palabras,
}) => {
  const inicialAutor = String(nombreAutor || 'A').charAt(0).toUpperCase();

  return (
    <aside className="detalle-noticia__columna-lateral" aria-label="Información complementaria">
      <div className="detalle-noticia__sidebar-card">
        <h2 className="detalle-noticia__sidebar-titulo">Ficha Institucional</h2>

        {/* 1. Categoría */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Categoría</span>
          <div>
            {categoriaNombre ? (
              <span className={`badge rounded-pill px-3 py-1.5 ${categoriaBadgeClass}`}>
                {categoriaNombre.toUpperCase()}
              </span>
            ) : (
              <span className="text-secondary fw-semibold">Sin categoría</span>
            )}
          </div>
        </div>

        {/* 2. Autor de la publicación (sin tarjeta interior) */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Autor de la publicación</span>
          <div className="detalle-noticia__sidebar-autor">
            <div className="detalle-noticia-avatar-sm" aria-hidden="true">
              {inicialAutor}
            </div>
            <span className="detalle-noticia__sidebar-autor-nombre">{nombreAutor}</span>
          </div>
        </div>

        {/* 3. Fechas (texto directo y legible, sin tarjeta interior) */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Fechas</span>
          <div className="detalle-noticia__sidebar-fechas-lista">
            {fechaPublicacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <span className="detalle-noticia__sidebar-fecha-label">Publicada:</span>
                <span className="detalle-noticia__sidebar-fecha-valor">{fechaPublicacion}</span>
              </div>
            )}
            {fechaCreacion && fechaCreacion !== fechaPublicacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <span className="detalle-noticia__sidebar-fecha-label">Creada:</span>
                <span className="detalle-noticia__sidebar-fecha-valor">{fechaCreacion}</span>
              </div>
            )}
            {fechaActualizacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <span className="detalle-noticia__sidebar-fecha-label">Actualizada:</span>
                <span className="detalle-noticia__sidebar-fecha-valor">{fechaActualizacion}</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Métricas de lectura (en línea, sin tarjetas interiores) */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Lectura</span>
          <div className="detalle-noticia__sidebar-lectura-texto">
            <span className="detalle-noticia__sidebar-lectura-dato">
              <IconoReloj />
              <span>{tiempoLectura}</span>
            </span>
            {palabras > 0 && (
              <>
                <span className="detalle-noticia__sidebar-separador-punto" aria-hidden="true">•</span>
                <span className="detalle-noticia__sidebar-lectura-dato">
                  <IconoTexto />
                  <span>{palabras} palabras</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDetalleNoticia;
