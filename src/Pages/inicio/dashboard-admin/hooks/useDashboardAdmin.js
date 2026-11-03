import { useState, useEffect, useCallback, useContext } from 'react';
import AppContext from '../../../../Context/AppContext';
import {
  listarNoticiasPendientes,
  listarNoticiasPublicadas,
} from '../../../../Services/noticias/noticiasServices';
import { resolucionesService } from '../../../../Services/resoluciones/resolucionesService';
import { comentariosService } from '../../../../Services/resoluciones/comentariosService';
import { listarCategoria } from '../../../../Services/noticias/categoriasServices';

export const useDashboardAdmin = () => {
  const { user } = useContext(AppContext);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [modalCategoriasAbierto, setModalCategoriasAbierto] = useState(false);

  const [metricas, setMetricas] = useState({
    noticiasPendientes: 0,
    noticiasPublicadas: 0,
    resolucionesVigentes: 0,
    resolucionesPendientes: 0,
    comentariosPendientes: 0,
    totalCategorias: 0,
  });

  const [noticiasPendientes, setNoticiasPendientes] = useState([]);
  const [resolucionesRecientes, setResolucionesRecientes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const cargarDatosDashboard = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const [
        resPendientes,
        resPublicadas,
        resResoluciones,
        resComentarios,
        resCategorias,
      ] = await Promise.allSettled([
        listarNoticiasPendientes(),
        listarNoticiasPublicadas(),
        resolucionesService.obtenerTodas(),
        comentariosService.obtenerTodos(),
        listarCategoria(),
      ]);

      // 1. Noticias Pendientes
      let listaPendientes = [];
      if (resPendientes.status === 'fulfilled' && resPendientes.value) {
        const val = resPendientes.value;
        listaPendientes = Array.isArray(val) ? val : val.content || val.data || [];
      }
      setNoticiasPendientes(listaPendientes.slice(0, 5));

      // 2. Noticias Publicadas
      let totalPublicadas = 0;
      if (resPublicadas.status === 'fulfilled' && resPublicadas.value) {
        const val = resPublicadas.value;
        const listaPub = Array.isArray(val) ? val : val.content || val.data || [];
        totalPublicadas = listaPub.length;
      }

      // 3. Resoluciones
      let totalResoluciones = 0;
      let totalResPendientes = 0;
      let listaResoluciones = [];
      if (resResoluciones.status === 'fulfilled' && resResoluciones.value) {
        const val = resResoluciones.value;
        listaResoluciones = Array.isArray(val) ? val : val.content || val.data || [];
        totalResoluciones = listaResoluciones.length;
        totalResPendientes = listaResoluciones.filter(
          (r) => String(r.estado).toUpperCase() === 'PENDIENTE'
        ).length;
      }
      setResolucionesRecientes(listaResoluciones.slice(0, 5));

      // 4. Comentarios pendientes de moderación
      let totalComentariosPendientes = 0;
      if (resComentarios.status === 'fulfilled' && resComentarios.value) {
        const val = resComentarios.value;
        const listaComentarios = Array.isArray(val) ? val : val.content || val.data || [];
        totalComentariosPendientes = listaComentarios.filter(
          (c) => String(c.estado).toUpperCase() === 'PENDIENTE'
        ).length;
      }

      // 5. Categorías
      let listaCategorias = [];
      if (resCategorias.status === 'fulfilled' && resCategorias.value) {
        const val = resCategorias.value;
        listaCategorias = Array.isArray(val) ? val : val.content || val.data || [];
      }
      setCategorias(listaCategorias);

      // Actualizar métricas consolidadas
      setMetricas({
        noticiasPendientes: listaPendientes.length,
        noticiasPublicadas: totalPublicadas,
        resolucionesVigentes: totalResoluciones,
        resolucionesPendientes: totalResPendientes,
        comentariosPendientes: totalComentariosPendientes,
        totalCategorias: listaCategorias.length,
      });
    } catch (err) {
      setError(err?.message || 'Ocurrió un error al cargar la información del panel.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatosDashboard();
  }, [cargarDatosDashboard]);

  const abrirModalCategorias = () => setModalCategoriasAbierto(true);
  const cerrarModalCategorias = () => {
    setModalCategoriasAbierto(false);
    cargarDatosDashboard();
  };

  return {
    user,
    cargando,
    error,
    metricas,
    noticiasPendientes,
    resolucionesRecientes,
    categorias,
    modalCategoriasAbierto,
    abrirModalCategorias,
    cerrarModalCategorias,
    recargarDatos: cargarDatosDashboard,
  };
};

export default useDashboardAdmin;

