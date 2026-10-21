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

    <Link className="auth-home-link" to="/" aria-label="Volver al inicio">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />
      </svg>
      <span>Volver al inicio</span>
    </Link>

    <div className="auth-institution-brand">
      <ForoLogo className="auth-institution-logo" width={112} />
      <p>Universidad Provincial de Córdoba</p>
    </div>
  </aside>
);

export default AuthInstitutionPanel;
