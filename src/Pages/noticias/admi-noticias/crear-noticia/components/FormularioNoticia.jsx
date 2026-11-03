import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../../Context/AppContext';
import CamposNoticia from './CamposNoticia';
import AccionesFormulario from './AccionesFormulario';
import useFormularioNoticia from '../hooks/useFormularioNoticia';
import useCrearNoticia from '../../../../../hooks/useCrearNoticia';
import { ToastNotificacion } from '../../../../../Components/shared/ToastNotificacion';
import {
  EncabezadoFormularioNoticia,
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
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const formulario = useFormularioNoticia();
  const creacion = useCrearNoticia();

  const [pestanaActiva, setPestanaActiva] = useState('editor'); // 'editor' | 'preview'
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [confirmacionLimpiarAbierta, setConfirmacionLimpiarAbierta] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    mensaje: '',
    tipo: 'success',
    accion: null,
  });

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

    const resultado = await creacion.crearNoticia(
      formulario.obtenerDatos(),
      user?.idUsuario,
      formulario.imagenes
    );

    if (!resultado?.exito) return;

    formulario.limpiar();
    setPestanaActiva('editor');
    setToast({
      visible: true,
      tipo: 'success',
      mensaje: 'Noticia publicada exitosamente.',
      accion: resultado?.noticia?.id
        ? {
            texto: 'Ver publicación',
            onClick: () =>
              navigate(`/noticias/${resultado.noticia.id}`, {
                state: { noticia: resultado.noticia },
              }),
          }
        : {
            texto: 'Ver listado',
            onClick: () => navigate('/noticias/ver'),
          },
    });
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
  };

  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id) === String(formulario.valores.categoriaId)
  );

  return (
    <div className="crear-noticia-pagina">
      <div className="crear-noticia__contenedor-ancho">
        {/* Notificación Toast flotante */}
        <ToastNotificacion
          visible={toast.visible}
          tipo={toast.tipo}
          mensaje={toast.mensaje}
          accion={toast.accion}
          onCerrar={() => setToast((prev) => ({ ...prev, visible: false }))}
        />

        {/* Encabezado con pestañas integradas */}
        <EncabezadoFormularioNoticia
          pestanaActiva={pestanaActiva}
          setPestanaActiva={setPestanaActiva}
          tieneContenido={Boolean(formulario.valores.titulo || formulario.imagenes.length > 0)}
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
