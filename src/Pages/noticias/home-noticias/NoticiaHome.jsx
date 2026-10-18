import { useNoticiasHome } from './hooks/useNoticiasHome.js';
import NovedadesCarousel from './components/NovedadesCarousel.jsx';
import NoticiasListado from './components/NoticiasListado.jsx';
import './styles/NoticiasHome.css';

export const NoticiasHome = ({ headingLevel = 1, variant = 'list' }) => {
  const esCarrusel = variant === 'carousel';
  const noticiasHome = useNoticiasHome({
    soloUltimasSeis: esCarrusel,
    cargarCategorias: !esCarrusel,
  });

  if (esCarrusel) {
    return (
      <NovedadesCarousel
        noticias={noticiasHome.noticias}
        loading={noticiasHome.loading}
        headingLevel={headingLevel}
      />
    );
  }

  return <NoticiasListado {...noticiasHome} headingLevel={headingLevel} />;
};
