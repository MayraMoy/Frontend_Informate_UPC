import { useState, useMemo, useEffect } from 'react';
import { NOTICIAS_POR_PAGINA } from '../data/pendientesData';

export const usePendientesPaginacion = (
  noticiasFiltradas = [],
  porPagina = NOTICIAS_POR_PAGINA,
) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(noticiasFiltradas.length / porPagina) || 1;

  // Ajustar la página actual si la lista filtrada se reduce
  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(1);
    }
  }, [totalPaginas, paginaActual]);

  const noticiasPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * porPagina;
    return noticiasFiltradas.slice(inicio, inicio + porPagina);
  }, [noticiasFiltradas, paginaActual, porPagina]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const reiniciarPagina = () => {
    setPaginaActual(1);
  };

  return {
    paginaActual,
    setPaginaActual,
    totalPaginas,
    noticiasPaginadas,
    cambiarPagina,
    reiniciarPagina,
  };
};

export default usePendientesPaginacion;

