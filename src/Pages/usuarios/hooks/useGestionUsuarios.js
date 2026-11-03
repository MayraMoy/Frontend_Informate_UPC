import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import usuarioService from '../../../Services/usuarios/usuarioService.js';
import rolService from '../../../Services/usuarios/rolService.js';
import AppContext from '../../../Context/AppContext.js';

export const useGestionUsuarios = () => {
  const { user: adminActual } = useContext(AppContext);

  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');

  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('TODOS');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  // Modales
  const [usuarioDetalle, setUsuarioDetalle] = useState(null);
  const [usuarioParaSuspender, setUsuarioParaSuspender] = useState(null);
  const [usuarioParaCambiarRol, setUsuarioParaCambiarRol] = useState(null);
  const [nuevoRolId, setNuevoRolId] = useState('');

  // Feedback Toast
  const [toast, setToast] = useState({
    visible: false,
    mensaje: '',
    tipo: 'success',
  });

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
  };

  const cerrarToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Cargar usuarios y roles
  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true);
      setError('');
      const [listaUsuarios, listaRoles] = await Promise.all([
        usuarioService.obtenerTodos(),
        rolService.obtenerTodos().catch(() => []),
      ]);
      setUsuarios(Array.isArray(listaUsuarios) ? listaUsuarios : []);
      setRoles(Array.isArray(listaRoles) ? listaRoles : []);
    } catch (err) {
      setError(err.message || 'Error al recuperar el listado de usuarios.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Lista filtrada
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((u) => {
      // Filtro de texto (nombre, apellido, email, dni)
      const query = busqueda.trim().toLowerCase();
      const coincideTexto = !query || (
        (u.nombre && u.nombre.toLowerCase().includes(query)) ||
        (u.apellido && u.apellido.toLowerCase().includes(query)) ||
        (u.email && u.email.toLowerCase().includes(query)) ||
        (u.dni && u.dni.toLowerCase().includes(query))
      );

      // Filtro por Rol
      const rolNombre = (u.nombreRol || u.rol?.nombre || '').toUpperCase();
      const coincideRol = filtroRol === 'TODOS' || (
        filtroRol === 'ADMINISTRADOR'
          ? (rolNombre === 'ADMINISTRADOR' || rolNombre === 'ADMIN')
          : rolNombre === filtroRol
      );

      // Filtro por Estado
      const estadoUsuario = (u.estado || 'ACTIVO').toUpperCase();
      const coincideEstado = filtroEstado === 'TODOS' || estadoUsuario === filtroEstado;

      return coincideTexto && coincideRol && coincideEstado;
    });
  }, [usuarios, busqueda, filtroRol, filtroEstado]);

  // Alternar estado (Suspender / Reactivar)
  const alternarEstadoUsuario = async (u) => {
    const id = u.idUsuario || u.id;
    const esActivo = (u.estado || 'ACTIVO').toUpperCase() === 'ACTIVO';
    const idAdmin = adminActual?.idUsuario || adminActual?.id;

    if (id === idAdmin) {
      mostrarToast('No podés suspender tu propia cuenta de administrador.', 'error');
      return;
    }

    try {
      setProcesando(true);
      const nuevoEstado = esActivo ? 'INACTIVO' : 'ACTIVO';

      await usuarioService.actualizar(id, { estado: nuevoEstado });

      setUsuarios((prev) =>
        prev.map((item) =>
          (item.idUsuario || item.id) === id ? { ...item, estado: nuevoEstado } : item
        )
      );

      mostrarToast(
        esActivo
          ? `La cuenta de ${u.nombre || 'el usuario'} ha sido suspendida.`
          : `La cuenta de ${u.nombre || 'el usuario'} ha sido reactivada con éxito.`
      );
      setUsuarioParaSuspender(null);
    } catch (err) {
      mostrarToast(err.message || 'Error al modificar el estado del usuario.', 'error');
    } finally {
      setProcesando(false);
    }
  };

  // Cambiar rol de usuario
  const guardarCambioRol = async () => {
    if (!usuarioParaCambiarRol || !nuevoRolId) return;
    const id = usuarioParaCambiarRol.idUsuario || usuarioParaCambiarRol.id;

    try {
      setProcesando(true);
      const rolSeleccionado = roles.find((r) => String(r.idRol || r.id) === String(nuevoRolId));
      const nombreRolActualizado = rolSeleccionado?.nombre || 'USUARIO';

      await usuarioService.actualizar(id, { idRol: Number(nuevoRolId) });

      setUsuarios((prev) =>
        prev.map((item) =>
          (item.idUsuario || item.id) === id
            ? { ...item, idRol: Number(nuevoRolId), nombreRol: nombreRolActualizado }
            : item
        )
      );

      mostrarToast(`Se asignó el rol ${nombreRolActualizado} a ${usuarioParaCambiarRol.nombre}.`);
      setUsuarioParaCambiarRol(null);
    } catch (err) {
      mostrarToast(err.message || 'Error al actualizar el rol del usuario.', 'error');
    } finally {
      setProcesando(false);
    }
  };

  // Copiar correo al portapapeles
  const copiarEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    mostrarToast(`Correo copiado al portapapeles: ${email}`);
  };

  return {
    adminActual,
    usuarios,
    usuariosFiltrados,
    roles,
    cargando,
    procesando,
    error,
    busqueda,
    filtroRol,
    filtroEstado,
    usuarioDetalle,
    usuarioParaSuspender,
    usuarioParaCambiarRol,
    nuevoRolId,
    toast,
    setBusqueda,
    setFiltroRol,
    setFiltroEstado,
    setUsuarioDetalle,
    setUsuarioParaSuspender,
    setUsuarioParaCambiarRol,
    setNuevoRolId,
    cargarDatos,
    alternarEstadoUsuario,
    guardarCambioRol,
    copiarEmail,
    cerrarToast,
  };
};

export default useGestionUsuarios;
