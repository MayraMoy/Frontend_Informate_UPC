import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Components/shared/Navbar';
import { ResolucionesPage } from './Pages/resoluciones/ResolucionesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <Routes>
          {/* Ruta por defecto y módulo de Resoluciones */}
          <Route path="/" element={<Navigate to="/resoluciones" replace />} />
          <Route path="/resoluciones" element={<ResolucionesPage />} />

          {/* Rutas placeholder para los demás módulos */}
          <Route
            path="/noticias"
            element={
              <div className="container py-5 text-center">
                <h2>Módulo de Noticias</h2>
                <p className="text-muted">Desarrollado en la rama correspondiente.</p>
              </div>
            }
          />
          <Route
            path="/contacto"
            element={
              <div className="container py-5 text-center">
                <h2>Contacto Institucional</h2>
                <p className="text-muted">Universidad Provincial de Córdoba</p>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="container py-5 text-center">
                <h2>Iniciar Sesión</h2>
                <p className="text-muted">Módulo de Autenticación de Usuarios</p>
              </div>
            }
          />
          <Route
            path="/registro"
            element={
              <div className="container py-5 text-center">
                <h2>Registrarse</h2>
                <p className="text-muted">Módulo de Autenticación de Usuarios</p>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/resoluciones" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
