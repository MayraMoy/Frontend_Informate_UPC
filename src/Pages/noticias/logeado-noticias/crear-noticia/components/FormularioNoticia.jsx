import React, { useState, useContext } from 'react';
import AppContext from '../../../../../Context/AppContext';
import CamposNoticia from './CamposNoticia';
import AccionesFormulario from './AccionesFormulario';
import useFormularioNoticia from '../hooks/useFormularioNoticia';
import useCrearNoticia from '../../../../../hooks/useCrearNoticia';
import {
  EncabezadoFormularioNoticia,
  BannerExitoCrearNoticia,
  VistaPreviaSeccion,
  ModalConfirmarPublicacion,
  ModalConfirmarLimpiar,
  OverlayCargaNoticia,
} from './formulario-noticia';
import '../styles/CrearNoticia.css';

const FormularioNoticia = ({
  categorias = [],
  cargandoCategorias = false,
  errorCategorias = '',
  onRecargarCategorias,
}) => {
  const { user } = useContext(AppContext);
  const formulario = useFormularioNoticia();
  const creacion = useCrearNoticia();

  const [pestanaActiva, setPestanaActiva] = useState('editor'); // 'editor' | 'preview'
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [confirmacionLimpiarAbierta, setConfirmacionLimpiarAbierta] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  // Primer paso: validar y pedir confirmación.
  const manejarEnvio = (event) => {
    event?.preventDefault?.();
    setMensajeExito('');

    if (creacion.guardando || !formulario.validar()) {
      setPestanaActiva('editor');
      return;
    }

    setConfirmacionAbierta(true);
  };

  // Segundo paso: enviar la noticia después de aceptar en el modal.
  const confirmarCreacion = async () => {
    if (creacion.guardando) return;

    setConfirmacionAbierta(false);
    setMensajeExito('');

    const resultado = await creacion.crearNoticia(
      formulario.obtenerDatos(),
      user?.idUsuario,
      formulario.imagenes
    );

    if (!resultado?.exito) return;

    formulario.limpiar();
    setMensajeExito('¡La noticia se publicó exitosamente!');
  };

  const cancelarCreacion = () => {
    setConfirmacionAbierta(false);
  };

  const solicitarLimpieza = () => {
    const tieneAlgo =
      Boolean(formulario.valores.titulo.trim()) ||
      Boolean(formulario.valores.cuerpo.trim()) ||
      formulario.imagenes.length > 0;

    if (tieneAlgo) {
      setConfirmacionLimpiarAbierta(true);
    } else {
      formulario.limpiar();
    }
  };

  const confirmarLimpieza = () => {
    formulario.limpiar();
    setConfirmacionLimpiarAbierta(false);
    setMensajeExito('');
  };

  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id) === String(formulario.valores.categoriaId)
  );

  return (
    <div className="crear-noticia-pagina">
      <div className="crear-noticia__contenedor-ancho">
        {/* Encabezado con pestañas integradas */}
        <EncabezadoFormularioNoticia
          pestanaActiva={pestanaActiva}
          setPestanaActiva={setPestanaActiva}
          tieneContenido={Boolean(formulario.valores.titulo || formulario.imagenes.length > 0)}
        />

        {/* Banner de éxito */}
        <BannerExitoCrearNoticia
          mensajeExito={mensajeExito}
          onCrearOtra={() => {
            setMensajeExito('');
            setPestanaActiva('editor');
          }}
        />

        {/* Contenido según pestaña */}
        {pestanaActiva === 'preview' ? (
          <VistaPreviaSeccion
            valores={formulario.valores}
            categorias={categorias}
            imagenes={formulario.imagenes}
            usuario={user}
            onVolverEditor={() => setPestanaActiva('editor')}
            onPublicar={manejarEnvio}
            guardando={creacion.guardando}
          />
        ) : (
          <form
            className="crear-noticia__form"
            onSubmit={manejarEnvio}
            noValidate
          >
            <CamposNoticia
              valores={formulario.valores}
              errores={formulario.errores}
              categorias={categorias}
              cargandoCategorias={cargandoCategorias}
              errorCategorias={errorCategorias}
              onRecargarCategorias={onRecargarCategorias}
              onChange={formulario.manejarCambio}
              imagenes={formulario.imagenes}
              errorImagenes={formulario.errorImagenes}
              onSeleccionarImagen={formulario.manejarSeleccionImagen}
              onCambiarEpigrafe={formulario.manejarCambioEpigrafe}
              onQuitarImagen={formulario.manejarQuitarImagen}
              accionesSlot={(
                <AccionesFormulario
                  guardando={creacion.guardando}
                  error={creacion.error}
                  onLimpiar={solicitarLimpieza}
                  onVerPreview={() => setPestanaActiva('preview')}
                />
              )}
            />
          </form>
        )}
      </div>

      {/* Modal de confirmación para publicar */}
      <ModalConfirmarPublicacion
        isOpen={confirmacionAbierta}
        onCancelar={cancelarCreacion}
        onConfirmar={confirmarCreacion}
      />

      {/* Modal de confirmación para limpiar formulario */}
      <ModalConfirmarLimpiar
        isOpen={confirmacionLimpiarAbierta}
        onCancelar={() => setConfirmacionLimpiarAbierta(false)}
        onConfirmar={confirmarLimpieza}
      />

      {/* Overlay de carga */}
      <OverlayCargaNoticia visible={creacion.guardando} />
    </div>
  );
};

export default FormularioNoticia;
