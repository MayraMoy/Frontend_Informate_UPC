import React from 'react';
import {
  ColumnaPrincipalEditar,
  ColumnaLateralEditar,
} from './formulario-editar';

export const FormularioEditarNoticia = ({
  titulo,
  cuerpo,
  categoriaId,
  estado,
  categorias = [],
  cargandoCategorias = false,
  errorCategorias = '',
  onRecargarCategorias,
  noticiaOriginal,
  esAdmin,
  user,
  guardando,
  errores = {},
  errorImagenes = '',
  imagenesExistentes = [],
  nuevasImagenes = [],
  totalImagenes = 0,
  limiteAlcanzado = false,
  onChangeTitulo,
  onChangeCuerpo,
  onChangeCategoria,
  onChangeEstado,
  onAgregarImagenes,
  onCambiarEpigrafeExistente,
  onCambiarEpigrafeNueva,
  onEliminarExistente,
  onEliminarNueva,
  onSubmit,
  onVerPreview,
  onCancelar,
}) => {
  return (
    <form className="crear-noticia__form" onSubmit={onSubmit} noValidate>
      <div className="crear-noticia__layout-grid">
        {/* Columna Principal (Izquierda): Título y Editor enriquecido */}
        <ColumnaPrincipalEditar
          titulo={titulo}
          cuerpo={cuerpo}
          errores={errores}
          onChangeTitulo={onChangeTitulo}
          onChangeCuerpo={onChangeCuerpo}
        />

        {/* Columna Lateral (Derecha): Publicación, Estado, Fechas, Categoría e Imágenes */}
        <ColumnaLateralEditar
          estado={estado}
          onChangeEstado={onChangeEstado}
          esAdmin={esAdmin}
          user={user}
          noticiaOriginal={noticiaOriginal}
          guardando={guardando}
          onSubmit={onSubmit}
          onVerPreview={onVerPreview}
          onCancelar={onCancelar}
          categorias={categorias}
          cargandoCategorias={cargandoCategorias}
          errorCategorias={errorCategorias}
          onRecargarCategorias={onRecargarCategorias}
          categoriaId={categoriaId}
          onChangeCategoria={onChangeCategoria}
          errorCategoria={errores.categoriaId}
          imagenesExistentes={imagenesExistentes}
          nuevasImagenes={nuevasImagenes}
          totalImagenes={totalImagenes}
          limiteAlcanzado={limiteAlcanzado}
          errorImagenes={errorImagenes}
          onAgregarImagenes={onAgregarImagenes}
          onCambiarEpigrafeExistente={onCambiarEpigrafeExistente}
          onCambiarEpigrafeNueva={onCambiarEpigrafeNueva}
          onEliminarExistente={onEliminarExistente}
          onEliminarNueva={onEliminarNueva}
        />
      </div>
    </form>
  );
};

export default FormularioEditarNoticia;
