import { Link } from 'react-router-dom';
import ForoLogo from '../../../Components/shared/ForoLogo.jsx';
import imagenInstitucional from '../../inicio/assets/imagen1.jpg';

const AuthInstitutionPanel = () => (
  <aside className="auth-institution-panel">
    <img
      className="auth-institution-image"
      src={imagenInstitucional}
      alt="Estudiantes en un aula universitaria"
    />
    <div className="auth-institution-overlay" aria-hidden="true" />

    {/* Botón Volver al inicio con chevron */}
    <Link className="auth-home-link" to="/" aria-label="Volver al inicio">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span>Volver al inicio</span>
    </Link>

    {/* Bloque inferior: Tagline de impacto y branding institucional */}
    <div className="auth-institution-bottom-block">
      <div className="auth-institution-tagline">
        <h2 className="tagline-headline">
          CONECTÁ CON TU<br />
          <span className="tagline-highlight">COMUNIDAD!</span>
        </h2>
        <p className="tagline-sub">El portal de la Universidad Provincial de Córdoba</p>
      </div>

      <div className="auth-institution-footer">
        <ForoLogo className="auth-institution-logo" width={76} />
        <div className="auth-institution-divider" aria-hidden="true" />
        <div className="auth-institution-legal">
          <span>Universidad Provincial</span>
          <span>de Córdoba</span>
        </div>
      </div>
    </div>
  </aside>
);

export default AuthInstitutionPanel;
