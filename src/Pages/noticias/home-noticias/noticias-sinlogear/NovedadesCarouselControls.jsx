const NovedadesCarouselControls = ({ paginaActual, totalPaginas, paginasVisibles, cambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  return (
    <div className="novedades-carousel-controls">
      <button
        className="novedades-arrow novedades-arrow-prev"
        type="button"
        aria-label="Ver novedades anteriores"
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 0}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <nav className="novedades-pagination" aria-label="Páginas de novedades">
        {paginasVisibles.map((pagina) => (
          <button
            key={pagina}
            type="button"
            aria-label={`Ir a la página ${pagina + 1} de novedades`}
            aria-current={pagina === paginaActual ? 'page' : undefined}
            onClick={() => cambiarPagina(pagina)}
          />
        ))}
      </nav>

      <button
        className="novedades-arrow novedades-arrow-next"
        type="button"
        aria-label="Ver más novedades"
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas - 1}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default NovedadesCarouselControls;
