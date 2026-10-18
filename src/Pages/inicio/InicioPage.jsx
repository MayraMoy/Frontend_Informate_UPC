import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NoticiasHome } from '../noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from '../resoluciones/ResolucionesPage.jsx';
import InicioHero from './components/InicioHero.jsx';

const InicioPage = () => {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    const sectionId = hash.slice(1);
    if (!sectionId) return;

    const timeout = window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const navbarHeight = document.querySelector('.app-navbar')?.getBoundingClientRect().height ?? 0;
      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - navbarHeight,
        behavior: 'instant',
      });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [hash]);

  return (
    <div className="inicio-landing">
      <InicioHero />
      <NoticiasHome headingLevel={2} variant="carousel" />
      <ResolucionesPage headingLevel={2} />
    </div>
  );
};

export default InicioPage;
