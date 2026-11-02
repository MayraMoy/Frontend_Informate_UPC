import { useState, useContext } from 'react';
import AppContext from '../../../../../Context/AppContext.js';
import usePendientesData from './usePendientesData';
import usePendientesFiltros from './usePendientesFiltros';
import usePendientesPaginacion from './usePendientesPaginacion';
import usePendientesAcciones from './usePendientesAcciones';

export const usePendientesNoticias = () => {
  const { user } = useContext(AppContext);

  // 1. Módulo de Datos
  const {
    noticias,
    categorias,
    cargando,
    error: errorData,
    cargarNoticias,
  } = usePendientesData();

  // 2. Módulo de Filtros (Pestañas, Buscador, Categorías)
  const {
    tabEstado,
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    conteos,
    noticiasFiltradas,
    handleCambiarTab: cambiarTabFiltro,
  } = usePendientesFiltros(noticias, categorias);

  // 3. Módulo de Paginación
  const {
    paginaActual,
    setPaginaActual,
    totalPaginas,
    noticiasPaginadas,
    cambiarPagina,
    reiniciarPagina,
  } = usePendientesPaginacion(noticiasFiltradas);

  // 4. Módulo de Acciones Asíncronas (Publicar, Modificar Estado, Eliminar)
  const {
    accionEnProgreso,
    mensajeExito,
    errorAccion,
    handlePublicar,
    handleCambiarEstado,
    handleEliminar,
  } = usePendientesAcciones(user, cargarNoticias);

  // 5. Estado local para Modal de Previsualización
  const [noticiaPrevia, setNoticiaPrevia] = useState(null);

  // Cambio de pestaña que reinicia la paginación a la primera página
  const handleCambiarTab = (tab) => {
    cambiarTabFiltro(tab);
    reiniciarPagina();
  };

  const error = errorData || errorAccion;

  return {
    noticias,
    categorias,
    cargando,
    error,
    mensajeExito,
    accionEnProgreso,
    tabEstado,
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    noticiasPaginadas,
    conteos,
    noticiaPrevia,
    setNoticiaPrevia,
    handleCambiarTab,
    cambiarPagina,
    handlePublicar,
    handleCambiarEstado,
    handleEliminar,
    cargarNoticias,
  };
};

export default usePendientesNoticias;
