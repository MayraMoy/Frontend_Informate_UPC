import { Link } from 'react-router-dom';
import { inicioContenido } from '../data.js';
import '../styles/inicio.css';

const InicioHero = () => (
  <section id="inicio" className="inicio-hero container" aria-labelledby="inicio-titulo">
    <div className="row align-items-center gy-5 gx-lg-5">
      <div className="col-12 col-lg-7">
        <div className="inicio-hero-content">
          <h1 id="inicio-titulo" className="inicio-hero-title mb-3">
            {inicioContenido.titulo}
            <br />
            en <span>{inicioContenido.tituloDestacado}</span>
          </h1>
          <p className="inicio-hero-description mb-4">
            {inicioContenido.descripcion}
          </p>
          <div className="d-flex flex-wrap gap-3">
            {inicioContenido.acciones.map((accion) => (
              <Link
                key={accion.destino}
                to={accion.destino}
                className={`btn inicio-hero-button ${
                  accion.estilo === 'primary'
                    ? 'btn-warning-custom'
                    : 'btn-outline-custom'
                }`}
              >
                {accion.texto}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <figure className="inicio-hero-figure mb-0">
          <img
            className="inicio-hero-image img-fluid"
            src={inicioContenido.imagen}
            srcSet={inicioContenido.imagenResponsive
              .map(({ src, width }) => `${src} ${width}w`)
              .join(', ')}
            sizes="(max-width: 575px) calc(100vw - 24px), (max-width: 991px) 50vw, 420px"
            alt={inicioContenido.imagenAlt}
            width="1024"
            height="768"
            fetchPriority="high"
            loading="eager"
          />
          <figcaption className="inicio-hero-caption mt-3">
            {inicioContenido.imagenPie}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
);

export default InicioHero;
