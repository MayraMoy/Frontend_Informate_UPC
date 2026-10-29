import React from 'react';
import { BuscadorNoticias } from '../../logeado-noticias/ver-noticias/components/BuscadorNoticias.jsx';
import NovedadCard from './NovedadCard.jsx';
import { Paginacion } from '../../logeado-noticias/ver-noticias/components/Paginacion.jsx';
import { usePaginacionNoticias } from '../hooks/usePaginacionNoticias.js';
import '../../logeado-noticias/ver-noticias/styles/VerNoticias.css';
import '../styles/NovedadesCarousel.css';

const NoticiasListado = ({
  noticias,
  loading,
  headingLevel,
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  categorias,
  fecha,
  setFecha,
}) => {
  const CardHeading = headingLevel === 2 ? 'h3' : 'h2';
  const { paginaActual, totalPaginas, noticiasPaginadas, cambiarPagina, reiniciarPagina } =
    usePaginacionNoticias(noticias);

  const actualizarFiltro = (setter) => (valor) => {
    setter(valor);
    reiniciarPagina();
  };

  return (
    <div className="ver-noticias-pagina">
      <div className="ver-noticias-contenedor">
        {/* Encabezado visual para estudiantes */}
        <header className="ver-noticias-header">
          <div className="ver-noticias-header-texto">
            <h1 id="noticias-titulo" className="ver-noticias-titulo">
              Noticias Institucionales
            </h1>
            <p className="ver-noticias-subtitulo">
              Consultá las novedades publicadas y filtrá por categoría o fecha.
            </p>
          </div>
        </header>

        {/* Tarjeta de Filtros */}
        <div className="ver-noticias-filtros-card">
          <BuscadorNoticias
            busqueda={busqueda}
            setBusqueda={actualizarFiltro(setBusqueda)}
            categoria={categoria}
            setCategoria={actualizarFiltro(setCategoria)}
            categorias={categorias}
            fecha={fecha}
            setFecha={actualizarFiltro(setFecha)}
          />
        </div>

        {/* Listado / Grilla idéntica a /noticias/ver pero SIN onEditar */}
        {loading ? (
          <div className="ver-noticias-estado-vacio" role="status" aria-live="polite">
            <div className="spinner-border text-warning" aria-hidden="true" />
            <p>Cargando noticias...</p>
          </div>
        ) : noticiasPaginadas.length > 0 ? (
          <div className="ver-noticias-grid" aria-live="polite" aria-atomic="true">
            {noticiasPaginadas.map((noticia) => (
              <NovedadCard
                key={noticia.id}
                noticia={noticia}
                headingLevel={CardHeading}
                categorias={categorias}
                /* Sin onEditar: los estudiantes nunca verán botones de edición */
              />
            ))}
          </div>
        ) : (
          <div className="ver-noticias-estado-vacio" role="status">
            <p>No se encontraron noticias con los filtros seleccionados.</p>
          </div>
        )}

        {!loading && totalPaginas > 1 && (
          <div className="d-flex justify-content-center mt-2">
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={cambiarPagina}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiasListado;
