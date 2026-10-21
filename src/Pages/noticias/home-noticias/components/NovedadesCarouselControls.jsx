const NovedadesCarouselControls = ({ paginaActual, totalPaginas, paginasVisibles, cambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  return (
    <>
      <button
        className="novedades-arrow novedades-arrow-prev"
        type="button"
        aria-label="Ver novedades anteriores"
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 0}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        className="novedades-arrow novedades-arrow-next"
        type="button"
        aria-label="Ver más novedades"
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas - 1}
      >
        <span aria-hidden="true">›</span>
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
    </>
  );
};

export default NovedadesCarouselControls;
