import { useEffect, useMemo, useState } from 'react';
import { listarNoticiasPublicadas } from '../../../../Services/noticias/noticiasServices';
import { listarCategoria } from '../../../../Services/noticias/categoriasServices';

export const useNoticiasHome = () => {
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [fecha, setFecha] = useState('Todas');

  useEffect(() => {
    listarNoticiasPublicadas()
      .then((data) => setNoticias(data))
      .catch((err) => console.error('Error al cargar noticias:', err))
      .finally(() => setLoading(false));

    listarCategoria()
      .then((data) => setCategorias(data))
      .catch((err) => console.error('Error al cargar categorías:', err));
  }, []);

  const noticiasConCategoria = useMemo(() => noticias.map((item) => {
    const categoriaActual = item.categoriaNoticia;
    const idCategoria = (typeof categoriaActual === 'object' ? categoriaActual?.id : categoriaActual)
      ?? item.categoriaNoticiaId
      ?? item.categoriaId;
    const categoriaGuardada = categorias.find(
      (categoriaItem) => String(categoriaItem.id) === String(idCategoria),
    );

    return {
      ...item,
      categoriaNoticia: categoriaActual?.nombre ? categoriaActual : categoriaGuardada ?? categoriaActual,
    };
  }), [noticias, categorias]);

  const noticiasFiltradas = useMemo(() => {
    const textoBuscado = busqueda.trim().toLowerCase();

    return noticiasConCategoria.filter((item) => {
      const coincideBusqueda =
        !textoBuscado ||
        item.titulo?.toLowerCase().includes(textoBuscado) ||
        item.cuerpo?.toLowerCase().includes(textoBuscado);

      const coincideCategoria =
        categoria === 'Todas' || item.categoriaNoticia?.nombre === categoria;

      const coincideFecha =
        fecha === 'Todas' ||
        (fecha === 'Recientes' && item.fechaPublicacion) ||
        (fecha === 'Antiguas' && item.fechaPublicacion);

      return coincideBusqueda && coincideCategoria && coincideFecha;
    });
  }, [noticiasConCategoria, busqueda, categoria, fecha]);

  return {
    noticias: noticiasFiltradas,
    categorias,
    loading,
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    fecha,
    setFecha,
  };
};