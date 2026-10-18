import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './Components/navegacion/Navbar.jsx';
import AppContext from './Context/AppContext.js';
import { NoticiasHome } from './Pages/noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from './Pages/resoluciones/ResolucionesPage.jsx';
import InicioPage from './Pages/inicio/InicioPage.jsx';
import DashboardAdmin from './Pages/inicio/DashboardAdmin.jsx';
import { tieneRolAdministrador } from './hooks/useRoles.js';

const ConfirmacionRegistroPage = lazy(() =>
  import('./Pages/usuarios/ConfirmacionRegistroPage.jsx').then((module) => ({
    default: module.ConfirmacionRegistroPage,
  })),
);
const LoginPage = lazy(() =>
  import('./Pages/usuarios/LoginPage.jsx').then((module) => ({
    default: module.LoginPage,
  })),
);
const RegisterPage = lazy(() =>
  import('./Pages/usuarios/RegisterPage.jsx').then((module) => ({
    default: module.RegisterPage,
  })),
);

const RutaProtegida = ({ children }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();

  return user
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
};

const RutaAdministrador = ({ children }) => {
  const { user } = useContext(AppContext);

  return tieneRolAdministrador(user)
    ? children
    : <Navigate to="/" replace />;
};

const AppLayout = () => {
  const { pathname } = useLocation();
  const ocultarNavbar = ['/login', '/registro', '/register'].includes(pathname);

  return (
    <div className="d-flex min-vh-100 flex-column">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      {!ocultarNavbar && <Navbar />}
      <main id="contenido-principal" className="flex-grow-1" tabIndex={-1}>
        <Suspense
          fallback={(
            <div className="d-flex justify-content-center py-5" role="status">
              <span className="visually-hidden">Cargando página...</span>
              <span className="spinner-border text-warning" aria-hidden="true"></span>
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route
              path="/noticias"
              element={(
                <RutaProtegida>
                  <NoticiasHome />
                </RutaProtegida>
              )}
            />
            <Route path="/resoluciones" element={<ResolucionesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard-admin"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <DashboardAdmin />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registro-completado" element={<ConfirmacionRegistroPage />} />
            <Route path="/confirmacion-registro" element={<ConfirmacionRegistroPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default AppRouter;
