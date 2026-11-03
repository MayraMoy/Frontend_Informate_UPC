import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../Context/AppContext.js';
import { puedeAccederGestion } from '../../../../hooks/useRoles.js';
import { useNoticiasHome } from '../../home-noticias/hooks/useNoticiasHome.js';
import { usePaginacionNoticias } from '../../home-noticias/hooks/usePaginacionNoticias.js';
import { eliminarNoticia } from '../../../../Services/noticias/noticiasServices.js';
import {
  ToastNotificacion,
  ModalConfirmacionEliminar,
} from '../../../../Components/shared';
import NovedadCard from '../../home-noticias/components/NovedadCard.jsx';
import { NovedadCardSkeleton } from '../../home-noticias/components/novedad-card/NovedadCardSkeleton.jsx';
import { BuscadorNoticias } from './components/BuscadorNoticias.jsx';
import { Paginacion } from './components/Paginacion.jsx';
import '../../home-noticias/styles/NoticiasHome.css';
import '../../home-noticias/styles/NovedadesCarousel.css';
import './styles/VerNoticias.css';

const VerNoticias = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const esAdmin = puedeAccederGestion(user);

  const [noticiaAEliminar, setNoticiaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    mensaje: '',
    tipo: 'success',
  });

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
    recargar,
  } = useNoticiasHome();

  const {
    paginaActual,
    totalPaginas,
    noticiasPaginadas,
    cambiarPagina,
    reiniciarPagina,
  } = usePaginacionNoticias(noticias);

  const handleEditarNoticia = (noticia) => {
    navigate(`/noticias/editar/${noticia.id}`, { state: { noticia } });
  };

  const handleEliminarNoticia = (noticia) => {
    setNoticiaAEliminar(noticia);
  };

  const confirmarEliminarNoticia = async () => {
    if (!noticiaAEliminar) return;
    setEliminando(true);

    try {
      await eliminarNoticia(noticiaAEliminar.id);
      setToast({
        visible: true,
        mensaje: `Noticia "${noticiaAEliminar.titulo}" eliminada correctamente.`,
        tipo: 'success',
      });
      setNoticiaAEliminar(null);
      recargar();
    } catch (err) {
      setToast({
        visible: true,
        mensaje:
          err?.response?.data?.message ||
          err?.message ||
          'Error al eliminar noticia.',
        tipo: 'error',
      });
    } finally {
      setEliminando(false);
    }
  };

  const actualizarFiltro = (setter) => (valor) => {
    setter(valor);
    reiniciarPagina();
  };

  return (
    <div className="ver-noticias-pagina">
      {/* Toast flotante */}
      <ToastNotificacion
        visible={toast.visible}
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        onCerrar={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      <div className="ver-noticias-contenedor">
        <header className="ver-noticias-header">
          <div className="ver-noticias-header-texto">
            <h1 id="noticias-titulo" className="ver-noticias-titulo">
              Noticias Institucionales
            </h1>
            <p className="ver-noticias-subtitulo">
              Consultá las novedades publicadas, filtrá por categoría o fecha y gestioná el contenido institucional.
            </p>
          </div>
        </header>

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

        {loading ? (
          <div className="ver-noticias-grid" role="status" aria-label="Cargando noticias...">
            {Array.from({ length: 6 }).map((_, index) => (
              <NovedadCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : noticiasPaginadas.length > 0 ? (
          <div className="ver-noticias-grid" aria-live="polite" aria-atomic="true">
            {noticiasPaginadas.map((noticia) => (
              <NovedadCard
                key={noticia.id}
                noticia={noticia}
                headingLevel="h2"
                onEditar={esAdmin ? handleEditarNoticia : undefined}
                onEliminar={esAdmin ? handleEliminarNoticia : undefined}
                categorias={categorias}
                mostrarCategoria={false}
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

      {/* Modal de confirmación destructiva */}
      <ModalConfirmacionEliminar
        isOpen={Boolean(noticiaAEliminar)}
        titulo="¿Eliminar noticia definitivamente?"
        itemNombre={noticiaAEliminar?.titulo}
        mensaje="Esta acción es permanente y no se podrá deshacer. La noticia será retirada del portal."
        textoBotonConfirmar="Eliminar noticia"
        enProgreso={eliminando}
        onConfirmar={confirmarEliminarNoticia}
        onCancelar={() => setNoticiaAEliminar(null)}
      />
    </div>
  );
};

export default VerNoticias;
