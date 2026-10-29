import React from 'react';
import { useTrazabilidadNoticia } from '../hooks/useTrazabilidadNoticia';
import { formatearFechaHora } from '../utils/trazabilidadHelpers';

export const SeccionRegistroFechas = ({ noticia, estadoActual, user }) => {
  const { puedeVerTrazabilidad, huboModificacion, estaPublicada, trazabilidad } =
    useTrazabilidadNoticia(noticia, estadoActual, user);

  return (
    <div className="editar-noticia__fechas-bloque">
      <h3 className="editar-noticia__fechas-titulo">Registro y trazabilidad</h3>

      <div className="editar-noticia__timeline">
        {/* 1. Creación (Siempre presente) */}
        <div className="editar-noticia__timeline-item">
          <div className="editar-noticia__timeline-icono editar-noticia__timeline-icono--creacion" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="editar-noticia__timeline-cuerpo">
            <div className="editar-noticia__timeline-encabezado">
              {trazabilidad.creador ? (
                <>
                  <span className="editar-noticia__timeline-accion">Creada por</span>
                  <span className="editar-noticia__timeline-autor">{trazabilidad.creador}</span>
                </>
              ) : (
                <span className="editar-noticia__timeline-accion">Fecha de creación</span>
              )}
            </div>
            <div className="editar-noticia__timeline-fecha">
              {formatearFechaHora(noticia?.fechaCreacion) || 'Al registrar la noticia'}
            </div>
          </div>
        </div>

        {/* 2. Modificación / Edición (Solo si hubo una modificación real) */}
        {huboModificacion && (
          <div className="editar-noticia__timeline-item">
            <div className="editar-noticia__timeline-icono editar-noticia__timeline-icono--edicion" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div className="editar-noticia__timeline-cuerpo">
              <div className="editar-noticia__timeline-encabezado">
                {trazabilidad.editor ? (
                  <>
                    <span className="editar-noticia__timeline-accion">Editada por</span>
                    <span className="editar-noticia__timeline-autor">{trazabilidad.editor}</span>
                  </>
                ) : (
                  <span className="editar-noticia__timeline-accion">Última actualización</span>
                )}
              </div>
              <div className="editar-noticia__timeline-fecha">
                {formatearFechaHora(noticia?.fechaActualizacion || noticia?.fechaModificacion)}
              </div>
            </div>
          </div>
        )}

        {/* 3. Publicación (Solo si la noticia está realmente publicada) */}
        {estaPublicada && (
          <div className="editar-noticia__timeline-item">
            <div className="editar-noticia__timeline-icono editar-noticia__timeline-icono--publicacion" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="editar-noticia__timeline-cuerpo">
              <div className="editar-noticia__timeline-encabezado">
                {trazabilidad.publicador ? (
                  <>
                    <span className="editar-noticia__timeline-accion">Publicada por</span>
                    <span className="editar-noticia__timeline-autor">{trazabilidad.publicador}</span>
                  </>
                ) : (
                  <span className="editar-noticia__timeline-accion">Fecha de publicación</span>
                )}
              </div>
              <div className="editar-noticia__timeline-fecha">
                {formatearFechaHora(noticia?.fechaPublicacion) || 'Publicada'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionRegistroFechas;
