import React from 'react';
import { useDashboardAdmin } from './dashboard-admin/hooks/useDashboardAdmin';
import {
  DashboardAdminHeader,
  DashboardAdminKpis,
  DashboardAdminAccionesRapidas,
  DashboardAdminPendientes,
  DashboardAdminResoluciones,
  DashboardAdminResumenLateral,
} from './dashboard-admin/components';
import { ModalGestionCategorias } from '../noticias/admi-noticias/crear-noticia/components/ModalGestionCategorias';
import './dashboard-admin/styles/DashboardAdmin.css';

const DashboardAdmin = () => {
  const {
    user,
    cargando,
    metricas,
    noticiasPendientes,
    resolucionesRecientes,
    categorias,
    modalCategoriasAbierto,
    abrirModalCategorias,
    cerrarModalCategorias,
    recargarDatos,
  } = useDashboardAdmin();

  return (
    <div className="dashboard-admin">
      {/* 1. Encabezado con saludo institucional, fecha y actualización */}
      <DashboardAdminHeader
        user={user}
        cargando={cargando}
        onRecargar={recargarDatos}
      />

      {/* 2. Tarjetas de métricas clave (KPIs) con acceso rápido */}
      <DashboardAdminKpis
        metricas={metricas}
        cargando={cargando}
      />

      {/* 3. Barra de acciones operativas rápidas */}
      <DashboardAdminAccionesRapidas
        onAbrirCategorias={abrirModalCategorias}
      />

      {/* 4. Grid de contenido principal en 2 columnas */}
      <div className="dashboard-admin__cuerpo-grid">
        {/* Columna Izquierda: Cola de atención y gestión prioritaria */}
        <div className="dashboard-admin__columna-principal">
          <DashboardAdminPendientes
            noticias={noticiasPendientes}
            cargando={cargando}
          />

          <DashboardAdminResoluciones
            resoluciones={resolucionesRecientes}
            cargando={cargando}
          />
        </div>

        {/* Columna Derecha: Resumen de categorías, usuarios y estado del sistema */}
        <DashboardAdminResumenLateral
          categorias={categorias}
          cargando={cargando}
          onAbrirCategorias={abrirModalCategorias}
        />
      </div>

      {/* 5. Modal de gestión de categorías integrado */}
      {modalCategoriasAbierto && (
        <ModalGestionCategorias
          isOpen={modalCategoriasAbierto}
          onClose={cerrarModalCategorias}
          categoriasIniciales={categorias}
          onCategoriasActualizadas={recargarDatos}
        />
      )}
    </div>
  );
};

export default DashboardAdmin;
