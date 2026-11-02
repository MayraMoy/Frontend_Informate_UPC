import { useState, useEffect, useMemo, useRef } from 'react';
import {
  listarCategoria,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
} from '../../../../../Services/noticias/categoriasServices';

export const obtenerIdCategoria = (cat) =>
  String(
    cat?.id ??
    cat?.idCategoria ??
    cat?.id_categoria ??
    cat?.idCategoriaNoticia ??
    cat?.id_categoria_noticia ??
    ''
  );

export const useGestionCategorias = ({
  isOpen,
  onClose,
  categoriasIniciales = [],
  onCategoriasActualizadas,
  onSeleccionarCategoria,
}) => {
  const [categorias, setCategorias] = useState(categoriasIniciales);
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [creando, setCreando] = useState(false);

  // Estado de edición en línea
  const [idEnEdicion, setIdEnEdicion] = useState(null);
  const [nombreEnEdicion, setNombreEnEdicion] = useState('');
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);

  // Estado para confirmación de eliminación
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  // Alerta de feedback (éxito o error)
  const [alerta, setAlerta] = useState(null);

  const inputNuevoRef = useRef(null);
  const inputEdicionRef = useRef(null);

  const mostrarMensaje = (tipo, texto) => {
    setAlerta({ tipo, texto });
    setTimeout(() => {
      setAlerta(null);
    }, 4000);
  };

  const recargarLista = async () => {
    try {
      setCargando(true);
      const resp = await listarCategoria();
      const datos = Array.isArray(resp) ? resp : resp?.data || [];
      const listaFinal = Array.isArray(datos) ? datos : [];
      setCategorias(listaFinal);
      onCategoriasActualizadas?.(listaFinal);
    } catch (err) {
      console.warn('Error al listar categorías:', err);
    } finally {
      setCargando(false);
    }
  };

  // Sincronizar categorías al abrir
  useEffect(() => {
    if (isOpen) {
      recargarLista();
    }
  }, [isOpen]);

  // Enfocar input de edición cuando se activa
  useEffect(() => {
    if (idEnEdicion && inputEdicionRef.current) {
      inputEdicionRef.current.focus();
      inputEdicionRef.current.select();
    }
  }, [idEnEdicion]);

  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !creando && !guardandoEdicion && !eliminando) {
        if (idEnEdicion) {
          setIdEnEdicion(null);
        } else if (idAEliminar) {
          setIdAEliminar(null);
        } else {
          onClose?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, idEnEdicion, idAEliminar, creando, guardandoEdicion, eliminando, onClose]);

  // Crear categoría
  const manejarCrearCategoria = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const nombreLimpio = nuevoNombre.trim();
    if (!nombreLimpio) {
      mostrarMensaje('error', 'Ingresá un nombre para la categoría.');
      return;
    }

    const existe = categorias.some(
      (c) => String(c.nombre || '').trim().toLowerCase() === nombreLimpio.toLowerCase()
    );
    if (existe) {
      mostrarMensaje('error', `Ya existe una categoría llamada "${nombreLimpio}".`);
      return;
    }

    try {
      setCreando(true);
      const creada = await crearCategoria({ nombre: nombreLimpio });
      mostrarMensaje('exito', `Categoría "${nombreLimpio}" creada correctamente.`);
      setNuevoNombre('');

      const idCreada = obtenerIdCategoria(creada);
      if (idCreada && onSeleccionarCategoria) {
        onSeleccionarCategoria(idCreada);
      }

      await recargarLista();
    } catch (err) {
      console.error('Error al crear categoría:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'No se pudo crear la categoría.';
      mostrarMensaje('error', typeof msg === 'string' ? msg : 'No se pudo crear la categoría.');
    } finally {
      setCreando(false);
    }
  };

  // Iniciar edición en línea
  const iniciarEdicion = (cat) => {
    setIdAEliminar(null);
    setIdEnEdicion(obtenerIdCategoria(cat));
    setNombreEnEdicion(cat.nombre || '');
  };

  const cancelarEdicion = () => {
    setIdEnEdicion(null);
  };

  // Guardar edición en línea
  const guardarEdicion = async (idCat) => {
    const nombreLimpio = nombreEnEdicion.trim();
    if (!nombreLimpio) {
      mostrarMensaje('error', 'El nombre de la categoría no puede estar vacío.');
      return;
    }

    try {
      setGuardandoEdicion(true);
      await modificarCategoria(idCat, { nombre: nombreLimpio });
      mostrarMensaje('exito', 'Categoría actualizada con éxito.');
      setIdEnEdicion(null);
      await recargarLista();
    } catch (err) {
      console.error('Error al modificar categoría:', err);
      const msg =
        err?.response?.data?.message || err?.message || 'No se pudo actualizar la categoría.';
      mostrarMensaje('error', msg);
    } finally {
      setGuardandoEdicion(false);
    }
  };

  // Iniciar y cancelar eliminación
  const iniciarEliminacion = (idCat) => {
    setIdEnEdicion(null);
    setIdAEliminar(idCat);
  };

  const cancelarEliminacion = () => {
    setIdAEliminar(null);
  };

  // Confirmar eliminación
  const confirmarEliminar = async (idCat) => {
    try {
      setEliminando(true);
      await eliminarCategoria(idCat);
      mostrarMensaje('exito', 'Categoría eliminada del sistema.');
      setIdAEliminar(null);
      await recargarLista();
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      const msg =
        err?.response?.data?.message || err?.message || 'No se pudo eliminar la categoría.';
      mostrarMensaje('error', msg);
    } finally {
      setEliminando(false);
    }
  };

  // Búsqueda y visualización
  const hayFiltro = Boolean(filtro.trim());

  const categoriasFiltradas = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return categorias;
    return categorias.filter((cat) => String(cat.nombre || '').toLowerCase().includes(q));
  }, [categorias, filtro]);

  // A primera vista (sin búsqueda activa), se muestran hasta 3 categorías.
  // Con búsqueda activa, se muestran todas las que coinciden.
  const categoriasAMostrar = useMemo(() => {
    if (hayFiltro) {
      return categoriasFiltradas;
    }
    return categorias.slice(0, 3);
  }, [hayFiltro, categoriasFiltradas, categorias]);

  return {
    categorias,
    cargando,
    filtro,
    setFiltro,
    hayFiltro,
    nuevoNombre,
    setNuevoNombre,
    creando,
    manejarCrearCategoria,
    inputNuevoRef,
    idEnEdicion,
    nombreEnEdicion,
    setNombreEnEdicion,
    guardandoEdicion,
    inputEdicionRef,
    iniciarEdicion,
    cancelarEdicion,
    guardarEdicion,
    idAEliminar,
    eliminando,
    iniciarEliminacion,
    cancelarEliminacion,
    confirmarEliminar,
    alerta,
    categoriasFiltradas,
    categoriasAMostrar,
    recargarLista,
  };
};

export default useGestionCategorias;

