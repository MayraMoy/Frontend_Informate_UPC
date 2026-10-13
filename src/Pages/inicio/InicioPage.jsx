import { NoticiasHome } from '../noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from '../resoluciones/ResolucionesPage.jsx';
import InicioHero from './components/InicioHero.jsx';

const InicioPage = () => (
  <div className="inicio-landing">
    <InicioHero />
    <NoticiasHome />
    <ResolucionesPage />
  </div>
);

export default InicioPage;
