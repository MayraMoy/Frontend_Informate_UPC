import { useNoticiaCard } from '../../../home-noticias/hooks/useNoticiaCard.js';
import ContenidoNoticia from '../../crear-noticia/components/ContenidoNoticia.jsx';
import '../styles/NoticiaCard.css';

export const NoticiaCard = ({ noticia, headingLevel = 'h2' }) => {
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
  const CardHeading = headingLevel;

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
            <time dateTime={fechaPublicacion || undefined}>
              {formatearFecha(fechaPublicacion)}
            </time>
          </small>
        </div>

        <CardHeading className="card-title fw-bold mb-3">
          {titulo}
        </CardHeading>

        <ContenidoNoticia cuerpo={cuerpo} />

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
