import FormularioNoticia from "./components/FormularioNoticia";
import useCategorias from "../../../../hooks/useCategorias";

const CrearNoticia = () => {
  const { categorias, cargando, error } = useCategorias();

  return (
    <FormularioNoticia
      categorias={categorias}
      cargandoCategorias={cargando}
      errorCategorias={error}
    />
  );
};

export default CrearNoticia;
