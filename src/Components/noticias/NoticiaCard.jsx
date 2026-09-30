import { useNoticiaCard } from '../../Pages/noticias/home-noticias/hooks/useNoticiaCard';
import '../../Pages/noticias/home-noticias/styles/NoticiaCard.css'

export const NoticiaCard = ({ noticia }) => {
  const { formatearFecha, getBadgeClass, obtenerNombreAutor } = useNoticiaCard(noticia);

  if (!noticia) return null;

  const {
    id,
    titulo,
    cuerpo,
    fechaPublicacion,
    categoriaNoticia,
    autor,
  } = noticia;
  const nombreCategoria = categoriaNoticia?.nombre;

  return (
    <div className="card h-100 custom-noticia-card p-3">
      <div className="card-body d-flex flex-column p-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {nombreCategoria && (
            <span className={`badge rounded-pill px-3 py-2 ${getBadgeClass(nombreCategoria)}`}>
              {nombreCategoria.toUpperCase()}
            </span>
          )}
          <small className="text-secondary fw-normal">
            {formatearFecha(fechaPublicacion)}
          </small>
        </div>

        <h5 className="card-title fw-bold text-dark mb-3">
          {titulo}
        </h5>

        <p className="card-text text-secondary small flex-grow-1 noticia-cuerpo-truncado">
          {cuerpo}
        </p>

        <hr className="my-3 text-muted opacity-25" />

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-secondary fw-normal me-2 text-truncate">
            {obtenerNombreAutor(autor)}
          </small>
          <a
            href={`/noticias/${id}`}
            className="btn-leer text-decoration-none fw-bold d-flex align-items-center gap-1 flex-shrink-0"
          >
            LEER <span className="arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};