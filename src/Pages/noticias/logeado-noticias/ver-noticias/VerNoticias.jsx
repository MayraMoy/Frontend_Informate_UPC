import { useNoticiasHome } from '../../home-noticias/hooks/useNoticiasHome.js';
import { usePaginacionNoticias } from '../../home-noticias/hooks/usePaginacionNoticias.js';
import NovedadCard from '../../home-noticias/components/NovedadCard.jsx';
import { BuscadorNoticias } from './components/BuscadorNoticias.jsx';
import { Paginacion } from './components/Paginacion.jsx';
import '../../home-noticias/styles/NoticiasHome.css';
import '../../home-noticias/styles/NovedadesCarousel.css';

const VerNoticias = () => {
  const {
    noticias,
    categorias,
    loading,
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    fecha,
    setFecha,
  } = useNoticiasHome();
  const {
    paginaActual,
    totalPaginas,
    noticiasPaginadas,
    cambiarPagina,
    reiniciarPagina,
  } = usePaginacionNoticias(noticias);
  const actualizarFiltro = (setter) => (valor) => {
    setter(valor);
    reiniciarPagina();
  };

  return (
    <section className="noticias-home container my-5" aria-labelledby="noticias-titulo">
      <header className="mb-4">
        <h1 id="noticias-titulo" className="noticia-title fw-bold display-5 mb-3">
          Noticias Institucionales
        </h1>
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
        <div className="novedades-status" role="status" aria-live="polite">
          Cargando noticias...
        </div>
      ) : noticiasPaginadas.length > 0 ? (
        <div className="novedades-cards mt-4" aria-live="polite" aria-atomic="true">
          {noticiasPaginadas.map((noticia) => (
            <NovedadCard key={noticia.id} noticia={noticia} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p className="text-secondary py-4" role="status">
          No se encontraron noticias con los filtros seleccionados.
        </p>
      )}

      {!loading && totalPaginas > 1 && (
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={cambiarPagina}
        />
      )}
    </section>
  );
};

export default VerNoticias;
