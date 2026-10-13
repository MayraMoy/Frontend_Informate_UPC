import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './Components/navegacion/Footer.jsx';
import { Navbar } from './Components/navegacion/Navbar.jsx';
import { NoticiasHome } from './Pages/noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from './Pages/resoluciones/ResolucionesPage.jsx';
import { ConfirmacionRegistroPage } from './Pages/usuarios/ConfirmacionRegistroPage.jsx';
import { LoginPage } from './Pages/usuarios/LoginPage.jsx';
import { RegisterPage } from './Pages/usuarios/RegisterPage.jsx';
import InicioPage from './Pages/inicio/InicioPage.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div className="d-flex min-vh-100 flex-column">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/noticias" element={<NoticiasHome />} />
          <Route path="/resoluciones" element={<ResolucionesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registro-completado" element={<ConfirmacionRegistroPage />} />
          <Route path="/confirmacion-registro" element={<ConfirmacionRegistroPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
