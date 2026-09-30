export const useBuscadorNoticias = ({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  categorias,
  fecha,
  setFecha,
}) => {
  const categoriaOptions = ['Todas', ...categorias.map((item) => item.nombre)];
  const fechaOptions = ['Todas', 'Recientes', 'Antiguas'];

  const handleBusqueda = (event) => setBusqueda(event.target.value);
  const handleCategoriaChange = (event) => setCategoria(event.target.value);
  const handleFechaChange = (event) => setFecha(event.target.value);

  return {
    busqueda,
    categoria,
    fecha,
    categoriaOptions,
    fechaOptions,
    handleBusqueda,
    handleCategoriaChange,
    handleFechaChange,
  };
};