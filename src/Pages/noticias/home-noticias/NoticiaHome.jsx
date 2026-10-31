import { useNoticiasHome } from './hooks/useNoticiasHome.js';
import NovedadesCarousel from './components/NovedadesCarousel.jsx';
import NoticiasListado from './components/NoticiasListado.jsx';
import NoticiasEditorial from './components/NoticiasEditorial.jsx';
import './styles/NoticiasHome.css';

export const NoticiasHome = ({ headingLevel = 1, variant = 'list' }) => {
  const esCarrusel = variant === 'carousel';
  const esEditorial = variant === 'editorial';

  const noticiasHome = useNoticiasHome({
    soloUltimasSeis: esCarrusel || esEditorial,
    cargarCategorias: true,
  });

  if (esEditorial) {
    return (
      <NoticiasEditorial
        noticias={noticiasHome.noticias}
        loading={noticiasHome.loading}
        headingLevel={headingLevel}
        categorias={noticiasHome.categorias}
      />
    );
  }

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
