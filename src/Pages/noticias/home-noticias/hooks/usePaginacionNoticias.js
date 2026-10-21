import { useState } from 'react';

const CARDS_POR_PAGINA = 6;

export const usePaginacionNoticias = (noticias) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.max(1, Math.ceil(noticias.length / CARDS_POR_PAGINA));
  const indiceInicio = (paginaActual - 1) * CARDS_POR_PAGINA;
  const noticiasPaginadas = noticias.slice(indiceInicio, indiceInicio + CARDS_POR_PAGINA);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(Math.min(Math.max(nuevaPagina, 1), totalPaginas));
  };

  const reiniciarPagina = () => setPaginaActual(1);

  return {
    paginaActual,
    totalPaginas,
    noticiasPaginadas,
    cambiarPagina,
    reiniciarPagina,
  };
};