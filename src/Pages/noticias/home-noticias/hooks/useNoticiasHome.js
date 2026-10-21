import { useEffect, useMemo, useState } from 'react';
import { listar6Noticias, listarNoticiasPublicadas } from '../../../../Services/noticias/noticiasServices';
import { listarCategoria } from '../../../../Services/noticias/categoriasServices';

const ordenarPorFechaDescendente = (noticias) => [...noticias].sort((a, b) => {
  const fechaA = Date.parse(a.fechaPublicacion);
  const fechaB = Date.parse(b.fechaPublicacion);
  const fechaAValida = Number.isFinite(fechaA);
  const fechaBValida = Number.isFinite(fechaB);

  if (!fechaAValida || !fechaBValida) {
    return fechaAValida === fechaBValida ? 0 : fechaAValida ? -1 : 1;
  }

  return fechaB - fechaA;
});

export const useNoticiasHome = ({ soloUltimasSeis = false, cargarCategorias = true } = {}) => {
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [fecha, setFecha] = useState('Todas');

  useEffect(() => {
    const cargarNoticias = soloUltimasSeis ? listar6Noticias : listarNoticiasPublicadas;

    cargarNoticias()
      .then((data) => {
        setNoticias(ordenarPorFechaDescendente(data));
      })
      .catch((err) => console.error('Error al cargar noticias:', err))
      .finally(() => setLoading(false));

    if (cargarCategorias) {
      listarCategoria()
        .then((data) => setCategorias(data))
        .catch((err) => console.error('Error al cargar categorías:', err));
    }
  }, [soloUltimasSeis, cargarCategorias]);

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
    const normalizarTexto = (texto) => String(texto ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
    const textoBuscado = normalizarTexto(busqueda);

    const resultados = noticiasConCategoria.filter((item) => {
      const textoNoticia = [
        item.titulo,
        item.resumen,
        item.descripcion,
        item.cuerpo,
      ].map(normalizarTexto).join(' ');
      const coincideBusqueda = !textoBuscado || textoNoticia.includes(textoBuscado);

      const coincideCategoria =
        categoria === 'Todas' ||
        normalizarTexto(item.categoriaNoticia?.nombre) === normalizarTexto(categoria);

      return coincideBusqueda && coincideCategoria;
    });

    if (fecha === 'Todas') return resultados;

    return resultados.sort((a, b) => {
      const fechaA = Date.parse(a.fechaPublicacion);
      const fechaB = Date.parse(b.fechaPublicacion);
      const fechaAValida = Number.isFinite(fechaA);
      const fechaBValida = Number.isFinite(fechaB);

      if (!fechaAValida || !fechaBValida) {
        return fechaAValida === fechaBValida ? 0 : fechaAValida ? -1 : 1;
      }

      return fecha === 'Recientes' ? fechaB - fechaA : fechaA - fechaB;
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
