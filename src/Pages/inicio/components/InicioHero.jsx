import { Link } from 'react-router-dom';
import heroBackground from '../assets/imagen123.jpg';
import { inicioContenido } from '../data.js';
import '../styles/inicio.css';

const HeroActionIcon = ({ type }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {type === 'forum' ? (
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.5-.8L4 20l1.8-4.1a7.4 7.4 0 0 1-.8-3.4A7.5 7.5 0 0 1 12.5 5H13a7.5 7.5 0 0 1 7 6.5Z" />
    ) : (
      <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h7" /></>
    )}
  </svg>
);

const InicioHero = () => {
  return (
    <section id="inicio" className="inicio-hero container" aria-labelledby="inicio-titulo">
      <div className="inicio-hero-background" aria-hidden="true">
        <img src={heroBackground} alt="" />
      </div>
      <div className="inicio-hero-layout">
        <div className="inicio-hero-copy">
          <h1 id="inicio-titulo" className="inicio-hero-title">
            {inicioContenido.titulo}<br />
            en <span>{inicioContenido.tituloDestacado}</span>
          </h1>
          <p className="inicio-hero-description">{inicioContenido.descripcion}</p>
          <div className="inicio-hero-actions">
            {inicioContenido.acciones.map((accion) => (
              <Link
                key={accion.destino}
                to={accion.destino}
                className={`inicio-hero-action${accion.estilo === 'primary' ? ' is-primary' : ''}`}
              >
                <HeroActionIcon type={accion.estilo === 'primary' ? 'forum' : 'document'} />
                <span>{accion.texto}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InicioHero;
