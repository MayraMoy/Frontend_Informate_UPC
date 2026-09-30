import { info_Noticias } from './data/infoNoticias';
import { BuscadorNoticias } from '../../../Components/noticias/BuscadorNoticias';
import { NoticiaCard } from '../../../Components/noticias/NoticiaCard';
import { Paginacion } from '../../../Components/noticias/Paginacion';
import { useNoticiasHome } from './hooks/useNoticiasHome';
import { usePaginacionNoticias } from './hooks/usePaginacionNoticias';
import './styles/NoticiasHome.css'

export const NoticiasHome = () => {
  const {
    noticias,
    loading,
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    categorias,
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

  const manejarCambioBusqueda = (valor) => {
    setBusqueda(valor);
    reiniciarPagina();
  };

  const manejarCambioCategoria = (valor) => {
    setCategoria(valor);
    reiniciarPagina();
  };

  const manejarCambioFecha = (valor) => {
    setFecha(valor);
    reiniciarPagina();
  };

  return (
    <section className="noticias-home container my-5">
      {info_Noticias.map((noticia, index) => (
        <article key={index} className="mb-4">
          <span className="noticia-tag d-inline-block text-uppercase fw-bold mb-2">
            {noticia.tag}
          </span>
          <h1 className="noticia-title fw-bold display-5 text-dark mb-3">
            {noticia.title}
          </h1>
          <p className="noticia-description text-secondary col-12 col-lg-8 lead fs-6">
            {noticia.description}
          </p>
        </article>
      ))}

      <BuscadorNoticias
        busqueda={busqueda}
        setBusqueda={manejarCambioBusqueda}
        categoria={categoria}
        setCategoria={manejarCambioCategoria}
        categorias={categorias}
        fecha={fecha}
        setFecha={manejarCambioFecha}
      />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
        </div>
      ) : (
        <>
          <div className="row g-4 mt-2">
            {noticiasPaginadas.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <NoticiaCard noticia={item} />
              </div>
            ))}
          </div>

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