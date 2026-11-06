import { useState, useEffect, useCallback, useMemo } from 'react';
import { comentariosService } from '../../../Services/resoluciones/comentariosService.js';
import { resolucionesService } from '../../../Services/resoluciones/resolucionesService.js';

export const usePerfilComentarios = (user) => {
  const [comentarios, setComentarios] = useState([]);
  const [resolucionesMap, setResolucionesMap] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Estados de filtros y búsqueda
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');

  // Estado para confirmación de eliminación
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const idUsuario = user?.idUsuario ?? user?.id;
  const emailUsuario = user?.email;

  const cargarDatos = useCallback(async () => {
    if (!idUsuario && !emailUsuario) {
      setCargando(false);
      setComentarios([]);
      return;
    }

    setCargando(true);
    setError('');

    try {
      // 1. Obtener comentarios del usuario y mapa de resoluciones en paralelo
      const [listaComentarios, listaResoluciones] = await Promise.allSettled([
        comentariosService.obtenerPorUsuario(idUsuario, emailUsuario),
        resolucionesService.obtenerTodas(),
      ]);

      if (listaComentarios.status === 'fulfilled') {
        const datos = Array.isArray(listaComentarios.value)
          ? listaComentarios.value
          : listaComentarios.value?.content || listaComentarios.value?.data || [];
        setComentarios(datos);
      } else {
        throw listaComentarios.reason;
      }

      if (listaResoluciones.status === 'fulfilled' && Array.isArray(listaResoluciones.value)) {
        const mapa = {};
        listaResoluciones.value.forEach((res) => {
          if (res?.idResolucion) {
            mapa[res.idResolucion] = {
              titulo: res.titulo || 'Sin título',
              numeroResolucion: res.numeroResolucion || `RES #${res.idResolucion}`,
              codigoResolucion: res.codigoResolucion || `RES-2026-${String(res.idResolucion).padStart(3, '0')}`,
            };
          }
        });
        setResolucionesMap(mapa);
      }
    } catch (err) {
      setError(
        err?.message || 'No se pudieron cargar tus comentarios. Por favor intentá nuevamente.'
      );
    } finally {
      setCargando(false);
    }
  }, [idUsuario, emailUsuario]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Métricas calculadas sobre el total de comentarios del usuario
  const metricas = useMemo(() => {
    let aprobados = 0;
    let pendientes = 0;
    let rechazados = 0;

    comentarios.forEach((c) => {
      const estado = String(c.estado || '').toUpperCase();
      if (estado === 'APROBADO' || estado === 'PUBLICADO') aprobados += 1;
      else if (estado === 'PENDIENTE') pendientes += 1;
      else if (estado === 'RECHAZADO') rechazados += 1;
    });

    return {
      total: comentarios.length,
      aprobados,
      pendientes,
      rechazados,
    };
  }, [comentarios]);

  // Filtrado reactivo en base a estado y texto
  const comentariosFiltrados = useMemo(() => {
    const query = busqueda.trim().toLowerCase();

    return comentarios.filter((c) => {
      // 1. Filtro por estado
      const estado = String(c.estado || '').toUpperCase();
      if (filtroEstado !== 'TODOS') {
        if (filtroEstado === 'APROBADO' && estado !== 'APROBADO' && estado !== 'PUBLICADO') {
          return false;
        }
        if (filtroEstado === 'PENDIENTE' && estado !== 'PENDIENTE') {
          return false;
        }
        if (filtroEstado === 'RECHAZADO' && estado !== 'RECHAZADO') {
          return false;
        }
      }

      // 2. Filtro por texto
      if (query) {
        const contenido = String(c.contenido || '').toLowerCase();
        const idRes = String(c.idResolucion || '');
        const resInfo = resolucionesMap[c.idResolucion];
        const resTitulo = String(resInfo?.titulo || '').toLowerCase();
        const resNumero = String(resInfo?.numeroResolucion || '').toLowerCase();

        const coincideContenido = contenido.includes(query);
        const coincideId = idRes.includes(query);
        const coincideTitulo = resTitulo.includes(query);
        const coincideNumero = resNumero.includes(query);

        if (!coincideContenido && !coincideId && !coincideTitulo && !coincideNumero) {
          return false;
        }
      }

      return true;
    });
  }, [comentarios, filtroEstado, busqueda, resolucionesMap]);

  // Gestión de eliminación de comentario
  const abrirModalEliminar = (comentario) => {
    setComentarioAEliminar(comentario);
  };

  const cerrarModalEliminar = () => {
    if (!eliminando) {
      setComentarioAEliminar(null);
    }
  };

  const ejecutarEliminacion = async () => {
    if (!comentarioAEliminar) return;

    const idTarget = comentarioAEliminar.idComentario ?? comentarioAEliminar.id;
    if (!idTarget) return;

    try {
      setEliminando(true);
      await comentariosService.eliminar(idTarget);

      setComentarios((prev) =>
        prev.filter((c) => (c.idComentario ?? c.id) !== idTarget)
      );

      setComentarioAEliminar(null);
      setMensajeExito('Tu comentario fue eliminado correctamente.');
    } catch (err) {
      setError(err?.message || 'Error al eliminar el comentario.');
    } finally {
      setEliminando(false);
    }
  };

  const limpiarFiltros = () => {
    setFiltroEstado('TODOS');
    setBusqueda('');
  };

  return {
    comentarios,
    comentariosFiltrados,
    resolucionesMap,
    cargando,
    error,
    mensajeExito,
    filtroEstado,
    busqueda,
    metricas,
    comentarioAEliminar,
    eliminando,
    setFiltroEstado,
    setBusqueda,
    limpiarFiltros,
    recargar: cargarDatos,
    abrirModalEliminar,
    cerrarModalEliminar,
    ejecutarEliminacion,
    limpiarMensajeExito: () => setMensajeExito(''),
    limpiarError: () => setError(''),
  };
};

export default usePerfilComentarios;
