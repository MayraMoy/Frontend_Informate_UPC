import React from 'react';
import { NoticiasHome } from '../noticias/home-noticias/NoticiaHome.jsx';
import { ResolucionesPage } from '../resoluciones/ResolucionesPage.jsx';

/**
 * Dashboard para el usuario ESTUDIANTE / regular autenticado.
 * Muestra el inicio editorial institucional con el layout de 3 novedades
 * (1 destacada principal + 2 secundarias apiladas en columna)
 * y el bloque de resoluciones académicas vigentes.
 */
export const DashboardUsuario = () => {
  return (
    <div className="dashboard-usuario">
      {/* 1. Novedades en formato Editorial (1 noticia destacada + 2 secundarias) */}
      <NoticiasHome headingLevel={2} variant="editorial" />

      {/* 2. Sección de Resoluciones académicas para estudiantes */}
      <ResolucionesPage headingLevel={2} mostrarFiltros={false} />
    </div>
  );
};

export default DashboardUsuario;

