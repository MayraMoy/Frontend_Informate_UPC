import { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import AppContext from '../../../../../Context/AppContext.js';
import {
  listarNoticiasPendientes,
  editarNoticia,
  eliminarNoticia,
} from '../../../../../Services/noticias/noticiasServices';
import { listarCategoria } from '../../../../../Services/noticias/categoriasServices';
import { ESTADOS_PERMITIDOS, NOTICIAS_POR_PAGINA } from '../data/pendientesData';
import {
  normalizar,
  obtenerAutor,
  obtenerNombreCategoria,
} from '../utils/pendientesHelpers';

export const usePendientesNoticias = () => {
  const { user } = useContext(AppContext);

  // Estados de datos
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [accionEnProgreso, setAccionEnProgreso] = useState(null);

  // Filtros
  const [tabEstado, setTabEstado] = useState('TODAS');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);

  // Modal de Previsualización
  const [noticiaPrevia, setNoticiaPrevia] = useState(null);

  const cargarNoticias = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const [resNoticias, resCategorias] = await Promise.all([
        listarNoticiasPendientes().catch((err) => {
          console.warn('Error al llamar listarNoticiasPendientes:', err);
          return [];
        }),
        listarCategoria().catch(() => []),
      ]);

      setCategorias(Array.isArray(resCategorias) ? resCategorias : []);

      const listaCruda = Array.isArray(resNoticias)
        ? resNoticias
        : resNoticias?.content || resNoticias?.data || [];

      // Filtrar únicamente aquellas con estado BORRADOR, ARCHIVADA o SUSPENDIDA
      const filtradas = listaCruda.filter((item) => {
        const est = String(item?.estado || item?.estadoNoticia || '')
          .trim()
          .toUpperCase();
        return ESTADOS_PERMITIDOS.includes(est);
      });

      setNoticias(filtradas);
    } catch (err) {
      setError(err?.message || 'Error al cargar las noticias pendientes.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarNoticias();
  }, [cargarNoticias]);

  // Conteos por estado para las pestañas
  const conteos = useMemo(() => {
    const counts = { TODAS: 0, BORRADOR: 0, ARCHIVADA: 0, SUSPENDIDA: 0 };
    noticias.forEach((item) => {
      const est = String(item?.estado || item?.estadoNoticia || '')
        .trim()
        .toUpperCase();
      counts.TODAS += 1;
      if (counts[est] !== undefined) counts[est] += 1;
    });
    return counts;
  }, [noticias]);

  // Filtrado reactivo por pestaña, buscador y categoría
  const noticiasFiltradas = useMemo(() => {
    const textoBuscado = normalizar(busqueda);

    return noticias.filter((item) => {
      const est = String(item?.estado || item?.estadoNoticia || '')
        .trim()
        .toUpperCase();

      if (tabEstado !== 'TODAS' && est !== tabEstado) return false;

      if (categoriaSeleccionada !== 'Todas') {
        const catNombre = normalizar(obtenerNombreCategoria(item, categorias));
        if (catNombre !== normalizar(categoriaSeleccionada)) return false;
      }

      if (textoBuscado) {
        const autorNombre = normalizar(obtenerAutor(item));
        const titulo = normalizar(item?.titulo);
        const resumen = normalizar(item?.resumen || item?.descripcion);
        if (
          !titulo.includes(textoBuscado) &&
          !resumen.includes(textoBuscado) &&
          !autorNombre.includes(textoBuscado)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [noticias, tabEstado, categoriaSeleccionada, busqueda, categorias]);

  // Paginación
  const totalPaginas = Math.ceil(noticiasFiltradas.length / NOTICIAS_POR_PAGINA) || 1;
  const noticiasPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * NOTICIAS_POR_PAGINA;
    return noticiasFiltradas.slice(inicio, inicio + NOTICIAS_POR_PAGINA);
  }, [noticiasFiltradas, paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleCambiarTab = (tab) => {
    setTabEstado(tab);
    setPaginaActual(1);
  };

  // Acción: Publicar Noticia
  const handlePublicar = async (noticia) => {
    if (!window.confirm(`¿Publicar la noticia "${noticia.titulo}" en el portal oficial?`)) {
      return;
    }
    setAccionEnProgreso(noticia.id);
    setError('');
    setMensajeExito('');
    try {
      const idAutor =
        noticia?.idAutor ??
        noticia?.autorId ??
        noticia?.autor?.id ??
        user?.idUsuario ??
        user?.id;

      const payload = {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo || noticia.descripcion || noticia.resumen || '',
        categoriaId: Number(
          noticia.categoriaId ||
          noticia.categoriaNoticiaId ||
          noticia?.categoriaNoticia?.id ||
          1,
        ),
        estado: 'PUBLICADA',
        ...(idAutor ? { idAutor: Number(idAutor), autorId: Number(idAutor) } : {}),
      };

      await editarNoticia(noticia.id, payload, idAutor);
      setMensajeExito(`Noticia "${noticia.titulo}" publicada exitosamente en el portal.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setError(
        `Error al publicar: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

  // Acción: Cambiar Estado
  const handleCambiarEstado = async (noticia, nuevoEstado) => {
    const nombresAccion = {
      ARCHIVADA: 'archivar',
      SUSPENDIDA: 'suspender',
      BORRADOR: 'marcar como borrador',
    };
    const accion = nombresAccion[nuevoEstado] || 'actualizar el estado de';

    if (!window.confirm(`¿Deseas ${accion} la noticia "${noticia.titulo}"?`)) {
      return;
    }

    setAccionEnProgreso(noticia.id);
    setError('');
    setMensajeExito('');
    try {
      const idAutor =
        noticia?.idAutor ??
        noticia?.autorId ??
        noticia?.autor?.id ??
        user?.idUsuario ??
        user?.id;

      const payload = {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo || noticia.descripcion || noticia.resumen || '',
        categoriaId: Number(
          noticia.categoriaId ||
          noticia.categoriaNoticiaId ||
          noticia?.categoriaNoticia?.id ||
          1,
        ),
        estado: nuevoEstado,
        ...(idAutor ? { idAutor: Number(idAutor), autorId: Number(idAutor) } : {}),
      };

      await editarNoticia(noticia.id, payload, idAutor);
      setMensajeExito(`Estado de "${noticia.titulo}" actualizado a ${nuevoEstado}.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setError(
        `Error al cambiar estado: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

  // Acción: Eliminar Noticia
  const handleEliminar = async (noticia) => {
    if (
      !window.confirm(
        `¿Eliminar definitivamente la noticia "${noticia.titulo}"? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }
    setAccionEnProgreso(noticia.id);
    setError('');
    setMensajeExito('');
    try {
      await eliminarNoticia(noticia.id);
      setMensajeExito(`Noticia "${noticia.titulo}" eliminada correctamente.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setError(
        `Error al eliminar noticia: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

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
  };
};

export default usePendientesNoticias;
