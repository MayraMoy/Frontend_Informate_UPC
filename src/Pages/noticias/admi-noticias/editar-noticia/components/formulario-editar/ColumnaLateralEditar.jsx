import React from 'react';
import CampoCategoria from '../../../crear-noticia/components/CampoCategoria';
import { PanelPublicacionEditar } from '../PanelPublicacionEditar';
import { PanelImagenesEditar } from '../PanelImagenesEditar';

export const ColumnaLateralEditar = ({
  estado,
  onChangeEstado,
  esAdmin,
  user,
  noticiaOriginal,
  guardando,
  onSubmit,
  onVerPreview,
  onCancelar,
  categorias = [],
  cargandoCategorias = false,
  errorCategorias = '',
  onRecargarCategorias,
  categoriaId,
  onChangeCategoria,
  errorCategoria = '',
  imagenesExistentes = [],
  nuevasImagenes = [],
  totalImagenes = 0,
  limiteAlcanzado = false,
  errorImagenes = '',
  onAgregarImagenes,
  onCambiarEpigrafeExistente,
  onCambiarEpigrafeNueva,
  onEliminarExistente,
  onEliminarNueva,
}) => {
  return (
    <aside className="crear-noticia__columna-lateral">
      {/* 1. Panel de Publicación, Estado según Rol y Fechas */}
      <PanelPublicacionEditar
        estado={estado}
        onChangeEstado={onChangeEstado}
        esAdmin={esAdmin}
        user={user}
        noticia={noticiaOriginal}
        guardando={guardando}
        onSubmit={onSubmit}
        onVerPreview={onVerPreview}
        onCancelar={onCancelar}
      />

      {/* 2. Panel de Categoría */}
      <div className="crear-noticia__card-sidebar">
        <CampoCategoria
          categorias={categorias}
          cargando={cargandoCategorias}
          errorCarga={errorCategorias}
          onRecargarCategorias={onRecargarCategorias}
          value={categoriaId}
          onChange={(e) =>
            onChangeCategoria(typeof e === 'object' && e?.target ? e.target.value : e)
          }
          error={errorCategoria}
          requerido
        />
      </div>

      {/* 3. Panel de Imágenes con Epígrafe Obligatorio */}
      <div className="crear-noticia__card-sidebar">
        <PanelImagenesEditar
          imagenesExistentes={imagenesExistentes}
          nuevasImagenes={nuevasImagenes}
          totalImagenes={totalImagenes}
          limiteAlcanzado={limiteAlcanzado}
          error={errorImagenes}
          onAgregarImagenes={onAgregarImagenes}
          onCambiarEpigrafeExistente={onCambiarEpigrafeExistente}
          onCambiarEpigrafeNueva={onCambiarEpigrafeNueva}
          onEliminarExistente={onEliminarExistente}
          onEliminarNueva={onEliminarNueva}
        />
      </div>
    </aside>
  );
};

export default ColumnaLateralEditar;

