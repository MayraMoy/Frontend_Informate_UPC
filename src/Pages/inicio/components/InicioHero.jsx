import { Link } from 'react-router-dom';
import heroImage from '../assets/imagen12.jpeg';
import { inicioContenido } from '../data.js';
import '../styles/inicio.css';

const InicioHero = () => {
  return (
    <section id="inicio" className="inicio-hero-section" aria-labelledby="inicio-titulo">
      <div className="inicio-hero container">
        <div className="inicio-hero-layout">
          <div className="inicio-hero-copy">
            <h1 id="inicio-titulo" className="inicio-hero-title">
              {inicioContenido.titulo}{' '}
              {inicioContenido.tituloDestacado && (
                <span className="inicio-hero-title-highlight">
                  {inicioContenido.tituloDestacado}
                </span>
              )}
            </h1>
            <p className="inicio-hero-description">{inicioContenido.descripcion}</p>
            <div className="inicio-hero-actions">
              {inicioContenido.acciones.map((accion) => (
                <Link
                  key={accion.destino}
                  to={accion.destino}
                  className={`inicio-hero-action${accion.estilo === 'primary' ? ' is-primary' : ' is-secondary'}`}
                >
                  <span>{accion.texto}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="inicio-hero-media">
            <div className="inicio-hero-image-wrapper">
              <img
                src={heroImage}
                alt="Campus de la Universidad Provincial de Córdoba"
                className="inicio-hero-image"
                loading="eager"
              />
              <div className="inicio-hero-floating-badge" aria-hidden="true">
                <div className="inicio-hero-badge-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="inicio-hero-badge-text">
                  <span className="inicio-hero-badge-number">
                    {inicioContenido.badgeComunidad?.numero || '+5,000'}
                  </span>
                  <span className="inicio-hero-badge-label">
                    {inicioContenido.badgeComunidad?.etiqueta || 'Miembros Activos'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InicioHero;
