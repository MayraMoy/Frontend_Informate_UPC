import { BuscadorNoticias } from '../../logeado-noticias/ver-noticias/components/BuscadorNoticias.jsx';
import { NoticiaCard } from '../../logeado-noticias/ver-noticias/components/NoticiaCard.jsx';
import { Paginacion } from '../../logeado-noticias/ver-noticias/components/Paginacion.jsx';
import { usePaginacionNoticias } from '../hooks/usePaginacionNoticias.js';

const NoticiasListado = ({ noticias, loading, headingLevel, busqueda, setBusqueda, categoria, setCategoria, categorias, fecha, setFecha }) => {
  const SectionHeading = headingLevel === 2 ? 'h2' : 'h1';
  const CardHeading = headingLevel === 2 ? 'h3' : 'h2';
  const { paginaActual, totalPaginas, noticiasPaginadas, cambiarPagina, reiniciarPagina } = usePaginacionNoticias(noticias);

  const actualizarFiltro = (setter) => (valor) => {
    setter(valor);
    reiniciarPagina();
  };

  return (
    <section id="noticias" className="noticias-home container my-5" aria-labelledby="noticias-titulo">
      <header className="mb-4">
        <SectionHeading id="noticias-titulo" className="noticia-title fw-bold display-5 mb-3">
          Noticias Institucionales
        </SectionHeading>
        <p className="noticia-description text-secondary col-12 col-lg-8 lead fs-6">
          Consultá las novedades y filtrá por categoría o fecha.
        </p>
      </header>

      <BuscadorNoticias
        busqueda={busqueda}
        setBusqueda={actualizarFiltro(setBusqueda)}
        categoria={categoria}
        setCategoria={actualizarFiltro(setCategoria)}
        categorias={categorias}
        fecha={fecha}
        setFecha={actualizarFiltro(setFecha)}
      />

      {loading ? (
        <div className="text-center py-5" role="status" aria-live="polite">
          <div className="spinner-border text-warning" aria-hidden="true" />
          <span className="visually-hidden">Cargando noticias...</span>
        </div>
      ) : (
        <>
          {noticiasPaginadas.length > 0 ? (
            <div className="row g-4 mt-2">
              {noticiasPaginadas.map((noticia) => (
                <div className="col-12 col-md-6 col-lg-4" key={noticia.id}>
                  <NoticiaCard noticia={noticia} headingLevel={CardHeading} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary py-4" role="status">
              No se encontraron noticias con los filtros seleccionados.
            </p>
          )}

          {totalPaginas > 1 && (
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={cambiarPagina}
            />
          )}
        </>
      )}
    </section>
  );
};

export default NoticiasListado;
