import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorialSkeleton } from './noticias-editorial/EditorialSkeleton.jsx';
import { EditorialHeader } from './noticias-editorial/EditorialHeader.jsx';
import { NovedadHeroCard } from './noticias-editorial/NovedadHeroCard.jsx';
import { NovedadSecundariaCard } from './noticias-editorial/NovedadSecundariaCard.jsx';
import '../styles/NoticiasEditorial.css';

export const NoticiasEditorial = ({
  noticias = [],
  loading = false,
  headingLevel = 2,
}) => {
  const navigate = useNavigate();
  const SectionHeading = headingLevel === 2 ? 'h2' : 'h1';

  const handleCardClick = (noti) => (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    navigate(`/noticias/${noti.id}`, { state: { noticia: noti } });
  };

  if (loading) {
    return <EditorialSkeleton SectionHeading={SectionHeading} />;
  }

  if (!noticias || noticias.length === 0) {
    return (
      <section id="noticias" className="novedades-editorial-section container" aria-labelledby="noticias-titulo">
        <EditorialHeader SectionHeading={SectionHeading} />
        <p className="text-muted">No hay noticias institucionales disponibles en este momento.</p>
      </section>
    );
  }

  const noticiaPrincipal = noticias[0];
  const noticiasSecundarias = noticias.slice(1, 3);

  return (
    <section id="noticias" className="novedades-editorial-section container" aria-labelledby="noticias-titulo">
      <EditorialHeader SectionHeading={SectionHeading} />

      <div className="novedades-editorial-grid">
        {/* 1. Noticia Principal Destacada (Hero) */}
        {noticiaPrincipal && (
          <NovedadHeroCard
            noticia={noticiaPrincipal}
            onClick={handleCardClick(noticiaPrincipal)}
          />
        )}

        {/* 2. Columna de 2 Noticias Secundarias */}
        <div className="novedades-secundarias-stack">
          {noticiasSecundarias.map((noticia) => (
            <NovedadSecundariaCard
              key={noticia.id}
              noticia={noticia}
              onClick={handleCardClick(noticia)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticiasEditorial;
