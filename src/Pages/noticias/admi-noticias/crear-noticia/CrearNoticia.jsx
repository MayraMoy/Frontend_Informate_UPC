import FormularioNoticia from "./components/FormularioNoticia";
import useCategorias from "../../../../hooks/useCategorias";

const CrearNoticia = () => {
  const { categorias, cargando, error, recargarCategorias } = useCategorias();

  return (
    <FormularioNoticia
      categorias={categorias}
      cargandoCategorias={cargando}
      errorCategorias={error}
      onRecargarCategorias={recargarCategorias}
    />
  );
};

export default CrearNoticia;
