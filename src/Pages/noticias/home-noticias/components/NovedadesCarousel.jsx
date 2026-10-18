import { Link } from 'react-router-dom';
import { useNovedadesCarousel } from '../hooks/useNovedadesCarousel.js';
import NovedadCard from './NovedadCard.jsx';
import NovedadesCarouselControls from './NovedadesCarouselControls.jsx';
import '../styles/NovedadesCarousel.css';

const NovedadesCarousel = ({ noticias, loading, headingLevel = 2 }) => {
  const carousel = useNovedadesCarousel(noticias);
  const SectionHeading = headingLevel === 2 ? 'h2' : 'h1';
  const CardHeading = headingLevel === 2 ? 'h3' : 'h2';

  return (
    <section id="noticias" className="novedades-home container my-5" aria-labelledby="noticias-titulo">
      <header className="novedades-header">
        <SectionHeading id="noticias-titulo">Novedades</SectionHeading>
        <Link className="novedades-all-link" to="/noticias">
          Ver todas las noticias <span aria-hidden="true">→</span>
        </Link>
      </header>

      <div className="novedades-carousel">
        {loading ? (
          <div className="novedades-status" role="status" aria-live="polite">Cargando noticias...</div>
        ) : carousel.noticiasRecientes.length === 0 ? (
          <div className="novedades-status" role="status">No hay noticias para mostrar.</div>
        ) : (
          <>
            <div className="novedades-cards" aria-live="polite" aria-atomic="true">
              {carousel.noticiasVisibles.map((noticia) => (
                <NovedadCard key={noticia.id} noticia={noticia} headingLevel={CardHeading} />
              ))}
            </div>

            <NovedadesCarouselControls {...carousel} />
          </>
        )}
      </div>
    </section>
  );
};

export default NovedadesCarousel;
