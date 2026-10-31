import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../Context/AppContext.js';
import { NoticiasHome } from '../noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from '../resoluciones/ResolucionesPage.jsx';
import InicioHero from './components/InicioHero.jsx';
import { scrollToSection } from '../../utils/scrollHelpers.js';
import './styles/inicio.css';

const InicioPage = () => {
  const { user } = useContext(AppContext);
  const { hash } = useLocation();

  useEffect(() => {
    const sectionId = hash.slice(1);
    if (!sectionId) return;

    // Primer ajuste rápido
    const timeout1 = window.setTimeout(() => {
      scrollToSection(sectionId, false);
    }, 60);

    // Segundo ajuste para absorber layout shifts tras renderizado de imágenes o carrusel
    const timeout2 = window.setTimeout(() => {
      scrollToSection(sectionId, false);
    }, 280);

    return () => {
      window.clearTimeout(timeout1);
      window.clearTimeout(timeout2);
    };
  }, [hash]);

  return (
    <div className={`inicio-landing${user ? ' inicio-landing-autenticado' : ''}`}>
      {user ? (
        <>
          <NoticiasHome headingLevel={2} variant="editorial" />
          <ResolucionesPage headingLevel={2} mostrarFiltros={false} variante="documentos" />
        </>
      ) : (
        <>
          <InicioHero />
          <NoticiasHome headingLevel={2} variant="carousel" />
          <ResolucionesPage headingLevel={2} />
        </>
      )}
    </div>
  );
};

export default InicioPage;
