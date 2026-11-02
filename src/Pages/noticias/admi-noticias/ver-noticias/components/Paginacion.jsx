import '../styles/Paginacion.css'

export const Paginacion = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  // Generar array con el rango de páginas
  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  return (
    <nav className="paginacion-noticias-nav d-flex justify-content-center my-4" aria-label="Navegación de páginas">
      <ul className="pagination custom-pagination gap-2 mb-0">
        
        {/* Botón Anterior */}
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link page-btn page-btn-nav"
            onClick={() => onCambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            aria-label="Anterior"
          >
            &#10094;
          </button>
        </li>

        {/* Números de Página */}
        {paginas.map((numero) => {
          const esActiva = numero === paginaActual;
          return (
            <li key={numero} className="page-item">
              <button
                className={`page-link page-btn ${esActiva ? 'page-btn-active' : 'page-btn-inactive'}`}
                onClick={() => onCambiarPagina(numero)}
                aria-label={`Ir a la página ${numero}`}
                aria-current={esActiva ? 'page' : undefined}
              >
                {numero}
              </button>
            </li>
          );
        })}

        {/* Botón Siguiente */}
        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button
            className="page-link page-btn page-btn-nav"
            onClick={() => onCambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            aria-label="Siguiente"
          >
            &#10095;
          </button>
        </li>

      </ul>
    </nav>
  );
};