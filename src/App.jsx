import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './Pages/usuarios/LoginPage';
import AppContext from './Context/AppContext';
import ForoLogo from './Components/shared/ForoLogo';

const Home = () => {
  const { user, setUser } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('usuarioSesion');
    if (setUser) setUser(null);
  };

  return (
    <div className="container py-5 text-center">
      <ForoLogo width={180} height={95} className="mb-4" />
      <h1 className="fw-bold mb-3">Sistema de Foro UPC</h1>
      <p className="text-muted lead mb-4">
        Plataforma institucional de gestión y consulta académica.
      </p>

      {user ? (
        <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: '480px', borderRadius: '16px' }}>
          <h4 className="fw-bold text-success mb-2">¡Sesión iniciada con éxito!</h4>
          <p className="mb-1"><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
          <p className="mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="mb-1"><strong>DNI:</strong> {user.dni}</p>
          <p className="mb-3"><strong>Rol:</strong> {user.nombreRol || user.rol?.nombre || 'USUARIO'}</p>
          <button
            type="button"
            className="btn btn-outline-danger w-100 fw-bold"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/login"
            className="btn px-4 py-2 text-white fw-bold shadow-sm"
            style={{ backgroundColor: '#ea8207', borderRadius: '10px' }}
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        {/* Redirección ante rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
