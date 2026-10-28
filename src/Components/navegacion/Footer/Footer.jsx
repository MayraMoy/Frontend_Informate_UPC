import React from 'react';
import { Link } from 'react-router-dom';
import ForoLogo from '../../shared/ForoLogo';
import './styles/Footer.css';

/**
 * Componente Footer institucional para Foro UPC.
 * Incluye cuadrícula en 4 columnas equilibradas: marca, accesos rápidos, institucional y contacto,
 * con enlaces institucionales, dominio oficial @upc.edu.ar y barra de copyright accesible.
 */
export const Footer = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-container">
        {/* Distribución en 4 columnas equilibradas */}
        <div className="footer-grid">
          {/* Columna 1: Marca & Propósito */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand" aria-label="Foro UPC, ir al inicio">
              <ForoLogo width={140} />
            </Link>
            <p className="footer-brand-desc">
              Espacio oficial para conectar a la comunidad universitaria, compartir novedades institucionales y consultar resoluciones académicas de la UPC.
            </p>
            <div className="footer-social-links" aria-label="Redes sociales oficiales">
              <a
                href="https://www.instagram.com/upc.bernardo.houssay/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram de Foro UPC"
              >
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://x.com/UPC_cordoba"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Twitter / X de Foro UPC"
              >
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/upc.bernardo.houssay"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook de Foro UPC"
              >
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Accesos rápidos / Sitemap */}
          <div className="footer-col">
            <h3 className="footer-col-title">Accesos Rápidos</h3>
            <ul className="footer-nav-list">
              <li>
                <Link to="/#inicio" className="footer-nav-link">Inicio</Link>
              </li>
              <li>
                <Link to="/#noticias" className="footer-nav-link">Noticias institucionales</Link>
              </li>
              <li>
                <Link to="/#resoluciones" className="footer-nav-link">Resoluciones oficiales</Link>
              </li>
              <li>
                <Link to="/registro" className="footer-nav-link">Participar del Foro</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información institucional & Ayuda */}
          <div className="footer-col">
            <h3 className="footer-col-title">Institucional</h3>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://upc.edu.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  Portal oficial UPC
                </a>
              </li>
              <li>
                <a href="https://moodle.upc.edu.ar/login/index.php" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Campus Virtual</a>
              </li>
              <li>
                <a href="https://red.infd.edu.ar/biblioteca-nuestra-escuela/" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Biblioteca</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto institucional de la sede */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-col-title">Contacto</h3>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Calle Hipólito Yrigoyen 5184, Capilla del Monte, Córdoba</span>
              </div>

              <div className="footer-contact-item">
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:3548579590" className="footer-contact-link">
                  3548 57-9590
                </a>
              </div>

              <div className="footer-contact-item">
                <svg
                  className="footer-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:sedecmonte.bhoussay@upc.edu.ar" className="footer-contact-link">
                  sedecmonte.bhoussay@upc.edu.ar
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Barra inferior de copyright accesible */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Foro UPC — Universidad Provincial de Córdoba. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
