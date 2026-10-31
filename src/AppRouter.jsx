import { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './Components/navegacion/Navbar/Navbar.jsx';
import AppContext from './Context/AppContext.js';
import { NoticiasHome } from './Pages/noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from './Pages/resoluciones/ResolucionesPage.jsx';
import InicioPage from './Pages/inicio/InicioPage.jsx';
import DashboardAdmin from './Pages/inicio/DashboardAdmin.jsx';
import { puedeAccederGestion } from './hooks/useRoles.js';
import { Sidebar } from './Components/navegacion/sidebar/Sidebar.jsx';
import { Footer } from './Components/navegacion/Footer/Footer.jsx';

const ConfirmacionRegistroPage = lazy(() =>
  import('./Pages/usuarios/ConfirmacionRegistroPage.jsx').then((module) => ({
    default: module.ConfirmacionRegistroPage,
  })),
);
const LoginPage = lazy(() =>
  import('./Components/usuarios/login/LoginPage.jsx').then((module) => ({
    default: module.LoginPage,
  })),
);
const RegisterPage = lazy(() =>
  import('./Components/usuarios/register/RegisterPage.jsx').then((module) => ({
    default: module.RegisterPage,
  })),
);
const Perfil = lazy(() => import('./Pages/perfil/Perfil.jsx'));
const CrearNoticia = lazy(() =>
  import('./Pages/noticias/logeado-noticias/crear-noticia/CrearNoticia.jsx'),
);
const VerNoticias = lazy(() =>
  import('./Pages/noticias/logeado-noticias/ver-noticias/VerNoticias.jsx'),
);
const EditarNoticia = lazy(() =>
  import('./Pages/noticias/logeado-noticias/editar-noticia/EditarNoticia.jsx'),
);
const DetalleNoticia = lazy(() =>
  import('./Pages/noticias/detalle-noticia/DetalleNoticia.jsx'),
);
const PendientesNoticias = lazy(() =>
  import('./Pages/noticias/logeado-noticias/pendientes/PendientesNoticias.jsx'),
);

// Páginas del módulo de Resoluciones
const CrearResolucionPage = lazy(() =>
  import('./Pages/resoluciones/CrearResolucionPage.jsx'),
);
const ResolucionesPendientesPage = lazy(() =>
  import('./Pages/resoluciones/ResolucionesPendientesPage.jsx'),
);
const ComentariosPendientesPage = lazy(() =>
  import('./Pages/resoluciones/ComentariosPendientesPage.jsx'),
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

  return puedeAccederGestion(user)
    ? children
    : <Navigate to="/" replace />;
};

const AppLayout = () => {
  const { user } = useContext(AppContext);
  const { pathname, hash } = useLocation();
  const ocultarNavbar = ['/login', '/registro', '/register'].includes(pathname);
  const tieneSidebar = !ocultarNavbar && puedeAccederGestion(user);

  // Asegurar que al navegar a cualquier página nueva sin ancla se inicie desde la parte superior
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className={`d-flex min-vh-100 flex-column${tieneSidebar ? ' app-layout-with-sidebar' : ''}`}>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      {!ocultarNavbar && <Navbar />}
      <div className="app-content-layout">
        {tieneSidebar && <Sidebar user={user} />}
        <main id="contenido-principal" className="app-main-content flex-grow-1" tabIndex={-1}>
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
                  <VerNoticias />
                </RutaProtegida>
              )}
            />
            <Route
              path="/noticias/crear"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <CrearNoticia />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/noticias/ver"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <VerNoticias />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/noticias/editar/:id"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <EditarNoticia />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/noticias/:id"
              element={(
                <RutaProtegida>
                  <DetalleNoticia />
                </RutaProtegida>
              )}
            />
            <Route
              path="/noticias/pendientes"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <PendientesNoticias />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route path="/resoluciones" element={<ResolucionesPage />} />
            <Route
              path="/resoluciones/crear"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <CrearResolucionPage />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/resoluciones/pendientes"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <ResolucionesPendientesPage />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/resoluciones/comentarios-pendientes"
              element={(
                <RutaProtegida>
                  <RutaAdministrador>
                    <ComentariosPendientesPage />
                  </RutaAdministrador>
                </RutaProtegida>
              )}
            />
            <Route
              path="/perfil"
              element={(
                <RutaProtegida>
                  <Perfil />
                </RutaProtegida>
              )}
            />
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
      {!ocultarNavbar && <Footer />}
    </div>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default AppRouter;
