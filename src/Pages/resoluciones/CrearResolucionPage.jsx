import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import { ToastNotificacion } from '../../Components/shared/ToastNotificacion';
import {
  EncabezadoCrearResolucion,
  CamposPrincipalesResolucion,
  SidebarPublicacionResolucion,
  VistaPreviaResolucion,
  ModalConfirmarResolucion,
  ModalConfirmarLimpiarResolucion,
  OverlayCargaResolucion,
} from './components/crear-resolucion';
import './CrearResolucionPage.css';

export const CrearResolucionPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  // Estados de navegación interna
  const [pestanaActiva, setPestanaActiva] = useState('editor'); // 'editor' | 'preview'

  // Estados de datos del formulario
  const [numeroResolucion, setNumeroResolucion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(['CALENDARIO', '2026']);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
  const [archivoPdf, setArchivoPdf] = useState(null);

  // Estados de carga y validación
  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  // Modales de confirmación
  const [modalConfirmacion, setModalConfirmacion] = useState({
    isOpen: false,
    estado: 'VIGENTE',
  });
  const [modalLimpiarOpen, setModalLimpiarOpen] = useState(false);

  // Toast flotante
  const [toast, setToast] = useState({
    visible: false,
    mensaje: '',
    tipo: 'success',
    accion: null,
  });

  // Cargar categorías institucionales al montar
  useEffect(() => {
    let montado = true;
    const cargarCategorias = async () => {
      try {
        setCargandoCategorias(true);
        const lista = await categoriasResolucionService.obtenerTodas();
        if (!montado) return;
        if (Array.isArray(lista) && lista.length > 0) {
          setCategorias(lista);
          const primerId = lista[0].idCategoria ?? lista[0].id;
          if (primerId !== undefined && primerId !== null) {
            setIdCategoria(String(primerId));
          }
        }
      } catch (err) {
        if (!montado) return;
        console.error('Error al cargar categorías de resolución:', err);
        setErrorGeneral('No se pudieron cargar las categorías del servidor.');
      } finally {
        if (montado) setCargandoCategorias(false);
      }
    };

    cargarCategorias();
    return () => {
      montado = false;
    };
  }, []);

  // Validación de campos obligatorios
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!numeroResolucion.trim()) {
      nuevosErrores.numeroResolucion = 'El número de resolución es obligatorio (ej: Res. Rectoral 0542/2026).';
    }
    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título oficial de la resolución es obligatorio.';
    }
    if (!idCategoria) {
      nuevosErrores.idCategoria = 'Debes seleccionar una categoría institucional.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Paso 1: Validar y abrir modal de confirmación
  const solicitarEnvio = (estadoDeseado = 'VIGENTE') => {
    setErrorGeneral('');
    setToast((prev) => ({ ...prev, visible: false }));

    if (guardando) return;

    if (!validarFormulario()) {
      setPestanaActiva('editor');
      return;
    }

    setModalConfirmacion({
      isOpen: true,
      estado: estadoDeseado.toUpperCase(),
    });
  };

  // Paso 2: Ejecutar envío en backend tras confirmar en modal
  const ejecutarCreacion = async () => {
    const estadoFinal = modalConfirmacion.estado;
    setModalConfirmacion({ isOpen: false, estado: estadoFinal });

    try {
      setGuardando(true);
      setErrorGeneral('');

      const idCatNum = Number(idCategoria);
      const idAutorFinal = Number(user?.idUsuario ?? user?.id ?? user?.usuarioId ?? 1);

      const payload = {
        numeroResolucion: numeroResolucion.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        idCategoria: idCatNum,
        categoriaId: idCatNum,
        idAutor: idAutorFinal,
        autorId: idAutorFinal,
        usuarioId: idAutorFinal,
        versionActual: 1,
        observaciones: observaciones.trim() || 'Creación inicial de la resolución.',
        estado: estadoFinal,
      };

      const respuesta = await resolucionesService.crear(payload, idAutorFinal);
      const idNueva = respuesta?.idResolucion ?? respuesta?.id;

      // Limpiar formulario y mostrar feedback
      limpiarCampos();
      setPestanaActiva('editor');

      const esVigente = estadoFinal === 'VIGENTE';
      const mensajeExito = esVigente
        ? 'Resolución aprobada y publicada exitosamente.'
        : 'Resolución registrada como pendiente de revisión.';

      setToast({
        visible: true,
        tipo: 'success',
        mensaje: mensajeExito,
        accion: idNueva
          ? {
              texto: 'Ver resolución',
              onClick: () => navigate(`/resoluciones/${idNueva}`),
            }
          : {
              texto: 'Ver listado',
              onClick: () => navigate(esVigente ? '/resoluciones' : '/resoluciones/pendientes'),
            },
      });

      // Redireccionar suavemente tras breve delay
      setTimeout(() => {
        const destino = esVigente ? '/resoluciones' : '/resoluciones/pendientes';
        navigate(destino, {
          state: {
            notificacion: {
              tipo: 'success',
              mensaje: mensajeExito,
            },
          },
        });
      }, 1600);
    } catch (err) {
      console.error('Error al crear resolución:', err);
      const mensaje = err.message || 'Error al guardar la resolución en el servidor.';
      setErrorGeneral(mensaje);
      setToast({
        visible: true,
        tipo: 'error',
        mensaje,
      });
    } finally {
      setGuardando(false);
    }
  };

  const limpiarCampos = () => {
    setNumeroResolucion('');
    setTitulo('');
    setDescripcion('');
    setObservaciones('');
    setArchivoPdf(null);
    setEtiquetasSeleccionadas(['CALENDARIO', '2026']);
    setNuevaEtiqueta('');
    setErrores({});
    setErrorGeneral('');
  };

  const solicitarLimpieza = () => {
    const tieneDatos =
      Boolean(numeroResolucion.trim()) ||
      Boolean(titulo.trim()) ||
      Boolean(descripcion.trim()) ||
      Boolean(observaciones.trim()) ||
      Boolean(archivoPdf);

    if (tieneDatos) {
      setModalLimpiarOpen(true);
    } else {
      limpiarCampos();
    }
  };

  const confirmarLimpieza = () => {
    limpiarCampos();
    setModalLimpiarOpen(false);
  };

  const tieneContenidoParaPreview =
    Boolean(numeroResolucion.trim()) ||
    Boolean(titulo.trim()) ||
    Boolean(descripcion.trim()) ||
    Boolean(archivoPdf);

  return (
    <div className="crear-resolucion-pagina">
      <div className="crear-resolucion__contenedor-ancho">
        {/* Toast Notificación Flotante */}
        <ToastNotificacion
          visible={toast.visible}
          tipo={toast.tipo}
          mensaje={toast.mensaje}
          accion={toast.accion}
          onCerrar={() => setToast((prev) => ({ ...prev, visible: false }))}
        />

        {/* Encabezado con pestañas integradas */}
        <EncabezadoCrearResolucion
          pestanaActiva={pestanaActiva}
          setPestanaActiva={setPestanaActiva}
          tieneContenido={tieneContenidoParaPreview}
        />

        {/* Contenido según pestaña activa */}
        {pestanaActiva === 'preview' ? (
          <VistaPreviaResolucion
            numeroResolucion={numeroResolucion}
            titulo={titulo}
            descripcion={descripcion}
            idCategoria={idCategoria}
            categorias={categorias}
            observaciones={observaciones}
            etiquetas={etiquetasSeleccionadas}
            archivoPdf={archivoPdf}
            usuario={user}
            onVolverEditor={() => setPestanaActiva('editor')}
            onPublicar={(est) => solicitarEnvio(est)}
            guardando={guardando}
          />
        ) : (
          <form
            className="crear-resolucion__form"
            onSubmit={(e) => {
              e.preventDefault();
              solicitarEnvio('VIGENTE');
            }}
            noValidate
          >
            <div className="crear-resolucion__layout-grid">
              {/* Columna Principal (Izquierda) */}
              <div className="crear-resolucion__columna-principal">
                <CamposPrincipalesResolucion
                  numeroResolucion={numeroResolucion}
                  setNumeroResolucion={setNumeroResolucion}
                  titulo={titulo}
                  setTitulo={setTitulo}
                  descripcion={descripcion}
                  setDescripcion={setDescripcion}
                  observaciones={observaciones}
                  setObservaciones={setObservaciones}
                  errores={errores}
                  guardando={guardando}
                />
              </div>

              {/* Columna Lateral (Derecha - Sticky) */}
              <SidebarPublicacionResolucion
                idCategoria={idCategoria}
                setIdCategoria={setIdCategoria}
                categorias={categorias}
                cargandoCategorias={cargandoCategorias}
                errorCategoria={errores.idCategoria}
                archivoPdf={archivoPdf}
                setArchivoPdf={setArchivoPdf}
                etiquetasSeleccionadas={etiquetasSeleccionadas}
                setEtiquetasSeleccionadas={setEtiquetasSeleccionadas}
                nuevaEtiqueta={nuevaEtiqueta}
                setNuevaEtiqueta={setNuevaEtiqueta}
                guardando={guardando}
                errorGeneral={errorGeneral}
                onSubmit={(est) => solicitarEnvio(est)}
                onVerPreview={() => setPestanaActiva('preview')}
                onLimpiar={solicitarLimpieza}
                onCancelar={() => navigate('/resoluciones')}
              />
            </div>
          </form>
        )}
      </div>

      {/* Modal de confirmación para publicar o solicitar aprobación */}
      <ModalConfirmarResolucion
        isOpen={modalConfirmacion.isOpen}
        estado={modalConfirmacion.estado}
        onCancelar={() => setModalConfirmacion({ isOpen: false, estado: 'VIGENTE' })}
        onConfirmar={ejecutarCreacion}
      />

      {/* Modal de confirmación para limpiar formulario */}
      <ModalConfirmarLimpiarResolucion
        isOpen={modalLimpiarOpen}
        onCancelar={() => setModalLimpiarOpen(false)}
        onConfirmar={confirmarLimpieza}
      />

      {/* Overlay de carga */}
      <OverlayCargaResolucion
        visible={guardando}
        mensaje={
          modalConfirmacion.estado === 'VIGENTE'
            ? 'Publicando y aprobando resolución oficial...'
            : 'Registrando resolución como pendiente...'
        }
      />
    </div>
  );
};

export default CrearResolucionPage;
