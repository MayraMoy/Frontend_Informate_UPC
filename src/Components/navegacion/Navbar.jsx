import { Link } from 'react-router-dom';
import ForoLogo from '../shared/ForoLogo.jsx';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-3">
      <div className="container">
        <Link className="navbar-brand me-auto me-lg-5" to="/" aria-label="Foro UPC, inicio">
          <ForoLogo width={130} />
        </Link>

        {/* Botón Toggler para Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de Navegación */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-links navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/noticias">Noticias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 text-dark" to="/resoluciones">Resoluciones</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 text-dark" href="mailto:soporte@upc.edu.ar">Contacto</a>
            </li>
          </ul>

          {/* Botones de acción */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn btn-outline-custom rounded-pill px-4 py-2 fw-medium">
              Iniciar Sesion
            </Link>
            <Link to="/registro" className="btn btn-warning-custom rounded-pill px-4 py-2 fw-medium">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};