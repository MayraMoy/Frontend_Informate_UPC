import { useEffect, useMemo, useState } from 'react';
import { ordenarNoticiasRecientes, obtenerPaginasVisibles } from '../data/novedadesCarousel.js';

const obtenerTarjetasPorPagina = () => {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(max-width: 575.98px)').matches) return 1;
  if (window.matchMedia('(max-width: 991.98px)').matches) return 2;
  return 3;
};

export const useNovedadesCarousel = (noticias) => {
  const [tarjetasPorPagina, setTarjetasPorPagina] = useState(obtenerTarjetasPorPagina);
  const [paginaActual, setPaginaActual] = useState(0);
  const noticiasRecientes = useMemo(() => ordenarNoticiasRecientes(noticias), [noticias]);
  const totalPaginas = Math.max(1, Math.ceil(noticiasRecientes.length / tarjetasPorPagina));
  const paginaSegura = Math.min(paginaActual, totalPaginas - 1);

  useEffect(() => {
    const actualizarTarjetasPorPagina = () => setTarjetasPorPagina(obtenerTarjetasPorPagina());
    window.addEventListener('resize', actualizarTarjetasPorPagina);
    return () => window.removeEventListener('resize', actualizarTarjetasPorPagina);
  }, []);

  useEffect(() => {
    setPaginaActual(paginaSegura);
  }, [paginaSegura]);

  const noticiasVisibles = noticiasRecientes.slice(
    paginaSegura * tarjetasPorPagina,
    (paginaSegura + 1) * tarjetasPorPagina,
  );

  const cambiarPagina = (pagina) => {
    setPaginaActual(Math.min(Math.max(pagina, 0), totalPaginas - 1));
  };

  return {
    noticiasRecientes,
    noticiasVisibles,
    paginaActual: paginaSegura,
    totalPaginas,
    paginasVisibles: obtenerPaginasVisibles(totalPaginas, paginaSegura),
    cambiarPagina,
  };
};
