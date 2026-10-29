import React from 'react';
import { IconoReloj, IconoTexto } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const SidebarDetalleNoticia = ({
  noticia,
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

  const nombreCatFinal =
    (typeof categoriaNombre === 'string' && categoriaNombre.trim()) ||
    noticia?.categoriaNoticia?.nombre ||
    noticia?.categoria?.nombre ||
    noticia?.nombreCategoria ||
    noticia?.categoriaNombre ||
    (typeof noticia?.categoriaNoticia === 'string' && isNaN(noticia.categoriaNoticia)
      ? noticia.categoriaNoticia
      : '') ||
    '';

  const badgeClassFinal =
    categoriaBadgeClass && categoriaBadgeClass !== 'badge-default'
      ? categoriaBadgeClass
      : (() => {
          const normal = String(nombreCatFinal || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
          if (normal.includes('investig')) return 'badge-investigacion';
          if (normal.includes('academ')) return 'badge-academica';
          if (normal.includes('bienestar')) return 'badge-bienestar';
          if (!normal) return 'badge-default';
          const hash = [...normal].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
          return `badge-categoria badge-categoria-${hash % 8}`;
        })();

  return (
    <aside className="detalle-noticia__columna-lateral" aria-label="Información complementaria">
      <div className="detalle-noticia__sidebar-card">
        {/* Encabezado con título e icono representativo */}
        <div className="detalle-noticia__sidebar-encabezado">
          <div className="d-flex align-items-center gap-2">
            <h2 className="detalle-noticia__sidebar-titulo">Ficha Institucional</h2>
          </div>
        </div>

        {/* 1. Categoría */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Categoría</span>
          <div className="detalle-noticia__sidebar-categoria-wrap">
            {nombreCatFinal ? (
              <span className={`badge rounded-pill px-3 py-1.5 ${badgeClassFinal}`}>
                {nombreCatFinal.toUpperCase()}
              </span>
            ) : (
              <span className="text-secondary fw-semibold">Sin categoría</span>
            )}
          </div>
        </div>

        {/* 2. Autor de la publicación */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Autor de la publicación</span>
          <div className="detalle-noticia__sidebar-autor">
            <div className="detalle-noticia-avatar-sm" aria-hidden="true">
              {inicialAutor}
            </div>
            <div className="detalle-noticia__sidebar-autor-info">
              <span className="detalle-noticia__sidebar-autor-nombre">{nombreAutor}</span>
              <span className="detalle-noticia__sidebar-autor-rol">Autor institucional</span>
            </div>
          </div>
        </div>

        {/* 3. Fechas con estructura visual clara e iconos descriptivos */}
        <div className="detalle-noticia__sidebar-seccion">
          <span className="detalle-noticia__sidebar-etiqueta">Fechas</span>
          <div className="detalle-noticia__sidebar-fechas-lista">
            {fechaPublicacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <div
                  className="detalle-noticia__sidebar-fecha-icono detalle-noticia__sidebar-fecha-icono--publicada"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="detalle-noticia__sidebar-fecha-datos">
                  <span className="detalle-noticia__sidebar-fecha-tipo">Publicada</span>
                  <span className="detalle-noticia__sidebar-fecha-valor">{fechaPublicacion}</span>
                </div>
              </div>
            )}

            {fechaCreacion && fechaCreacion !== fechaPublicacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <div
                  className="detalle-noticia__sidebar-fecha-icono detalle-noticia__sidebar-fecha-icono--creada"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 14 14" />
                  </svg>
                </div>
                <div className="detalle-noticia__sidebar-fecha-datos">
                  <span className="detalle-noticia__sidebar-fecha-tipo">Creada</span>
                  <span className="detalle-noticia__sidebar-fecha-valor">{fechaCreacion}</span>
                </div>
              </div>
            )}

            {fechaActualizacion && (
              <div className="detalle-noticia__sidebar-fecha-item">
                <div
                  className="detalle-noticia__sidebar-fecha-icono detalle-noticia__sidebar-fecha-icono--actualizada"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div className="detalle-noticia__sidebar-fecha-datos">
                  <span className="detalle-noticia__sidebar-fecha-tipo">Última actualización</span>
                  <span className="detalle-noticia__sidebar-fecha-valor">{fechaActualizacion}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Métricas de lectura con chips sutiles en lugar de cajas pesadas */}
        <div className="detalle-noticia__sidebar-seccion detalle-noticia__sidebar-seccion--lectura">
          <span className="detalle-noticia__sidebar-etiqueta">Lectura</span>
          <div className="detalle-noticia__sidebar-lectura-chips">
            <span className="detalle-noticia__sidebar-chip">
              <IconoReloj />
              <span>{tiempoLectura}</span>
            </span>
            {palabras > 0 && (
              <span className="detalle-noticia__sidebar-chip">
                <IconoTexto />
                <span>{palabras} palabras</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDetalleNoticia;
