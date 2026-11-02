import { useState, useEffect, useCallback } from 'react';
import { listarNoticiasPendientes } from '../../../../../Services/noticias/noticiasServices';
import { listarCategoria } from '../../../../../Services/noticias/categoriasServices';
import { ESTADOS_PERMITIDOS } from '../data/pendientesData';

export const usePendientesData = () => {
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarNoticias = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const [resNoticias, resCategorias] = await Promise.all([
        listarNoticiasPendientes().catch((err) => {
          console.error('Detalle del error 400 en listarNoticiasPendientes:', err?.response?.data || err?.message || err);
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

  return {
    noticias,
    setNoticias,
    categorias,
    cargando,
    error,
    setError,
    cargarNoticias,
  };
};

export default usePendientesData;

