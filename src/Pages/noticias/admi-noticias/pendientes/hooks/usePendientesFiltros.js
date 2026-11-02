import { useState, useMemo } from 'react';
import { normalizar, obtenerAutor, obtenerNombreCategoria } from '../utils/pendientesHelpers';

export const usePendientesFiltros = (noticias = [], categorias = []) => {
  const [tabEstado, setTabEstado] = useState('TODAS');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Conteos dinámicos por estado para las pestañas de navegación
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

  // Filtrado reactivo por estado, buscador y categoría
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

  const handleCambiarTab = (tab) => {
    setTabEstado(tab);
  };

  return {
    tabEstado,
    setTabEstado,
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    conteos,
    noticiasFiltradas,
    handleCambiarTab,
  };
};

export default usePendientesFiltros;

