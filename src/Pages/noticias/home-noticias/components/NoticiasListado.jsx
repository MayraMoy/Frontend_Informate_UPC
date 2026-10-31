import React from 'react';
import { NoticiasListadoHeader } from './noticias-listado/NoticiasListadoHeader.jsx';
import { NoticiasListadoFiltros } from './noticias-listado/NoticiasListadoFiltros.jsx';
import { NoticiasListadoGrid } from './noticias-listado/NoticiasListadoGrid.jsx';
import { Paginacion } from '../../logeado-noticias/ver-noticias/components/Paginacion.jsx';
import { usePaginacionNoticias } from '../hooks/usePaginacionNoticias.js';
import '../../logeado-noticias/ver-noticias/styles/VerNoticias.css';
import '../styles/NovedadesCarousel.css';

export const NoticiasListado = ({
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
        <NoticiasListadoHeader />

        {/* Tarjeta de Filtros */}
        <NoticiasListadoFiltros
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoria={categoria}
          setCategoria={setCategoria}
          categorias={categorias}
          fecha={fecha}
          setFecha={setFecha}
          onCambioFiltro={actualizarFiltro}
        />

        {/* Listado / Grilla */}
        <NoticiasListadoGrid
          loading={loading}
          noticias={noticiasPaginadas}
          CardHeading={CardHeading}
          categorias={categorias}
        />

        {/* Paginación */}
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
