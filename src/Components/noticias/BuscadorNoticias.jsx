import { useBuscadorNoticias } from '../../Pages/noticias/home-noticias/hooks/useBuscadorNoticias';
import '../../Pages/noticias/home-noticias/styles/BuscadorNoticias.css'

export const BuscadorNoticias = ({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  categorias,
  fecha,
  setFecha,
}) => {
  const {
    categoriaOptions,
    fechaOptions,
    handleBusqueda,
    handleCategoriaChange,
    handleFechaChange,
  } = useBuscadorNoticias({
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    categorias,
    fecha,
    setFecha,
  });

  return (
    <div className="buscador-noticias-container mb-4">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-7">
          <div className="input-group input-group-custom">
            <span className="input-group-text bg-white border-end-0 ps-3">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="text-secondary"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0 py-2 shadow-none"
              placeholder="Buscar por título o resumen..."
              value={busqueda}
              onChange={handleBusqueda}
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
          <select
            className="form-select py-2 custom-select shadow-none"
            value={categoria}
            onChange={handleCategoriaChange}
          >
            {categoriaOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'Todas' ? 'Todas' : option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-3 col-lg-3">
          <select
            className="form-select py-2 custom-select shadow-none"
            value={fecha}
            onChange={handleFechaChange}
          >
            {fechaOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'Todas' ? 'Cualquier fecha' : option === 'Recientes' ? 'Más recientes' : 'Más antiguas'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};