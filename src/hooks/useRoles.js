import { buscarPorId } from '../Services/usuarios/usuarioRoles';

const nombreDeRol = (rol) => {
  if (typeof rol === 'string') return rol;
  if (!rol || typeof rol !== 'object') return '';

  const nombre =
    rol.nombreRol ??
    rol.nombre ??
    rol.name ??
    rol.authority ??
    rol.descripcion ??
    rol.descripcionRol ??
    rol.rol;

  return typeof nombre === 'string' ? nombre : '';
};

const normalizarRol = (rol) =>
  nombreDeRol(rol)
    .trim()
    .toUpperCase()
    .replace(/^ROLE_/, '')
    .replace(/[\s-]+/g, '_');

const obtenerRolesUsuario = (usuario) => {
  if (!usuario) return [];

  if (usuario.nombreRol) {
    return [usuario.nombreRol];
  }

  const rol = usuario.rol ?? usuario.role ?? usuario.roles;

  return Array.isArray(rol) ? rol : rol ? [rol] : [];
};

export const tieneRolAdministrador = (usuario) =>
  obtenerRolesUsuario(usuario).some(
    (rol) => normalizarRol(rol) === 'ADMINISTRADOR'
  );

export const tieneRolPersonalEscuela = (usuario) =>
  obtenerRolesUsuario(usuario).some(
    (rol) => normalizarRol(rol) === 'PERSONAL_ESCOLAR'
  );

export const puedeAccederGestion = (usuario) =>
  tieneRolAdministrador(usuario) ||
  tieneRolPersonalEscuela(usuario);

/** Completa el nombre del rol cuando el login solo devuelve su identificador. */
export const resolverRolUsuario = async (usuario) => {
  if (!usuario || tieneRolAdministrador(usuario)) return usuario;

  const claveRol = usuario.rol !== undefined
    ? 'rol'
    : usuario.role !== undefined
      ? 'role'
      : usuario.roles !== undefined
        ? 'roles'
        : usuario.idRol !== undefined
          ? 'rol'
          : null;

  if (!claveRol) return usuario;

  const rolesOriginales = usuario[claveRol] ?? usuario.idRol;
  const roles = Array.isArray(rolesOriginales)
    ? rolesOriginales
    : [rolesOriginales];
  const rolesResueltos = await Promise.all(roles.map(async (rol) => {
    const idRol = typeof rol === 'number'
      ? rol
      : rol?.idRol ?? rol?.id ?? rol?.roleId;

    if (nombreDeRol(rol) || !idRol) return rol;

    try {
      const rolCompleto = await buscarPorId(idRol);
      return rolCompleto && typeof rolCompleto === 'object'
        ? { ...rol, ...rolCompleto }
        : rol;
    } catch {
      return rol;
    }
  }));

  return {
    ...usuario,
    [claveRol]: Array.isArray(rolesOriginales)
      ? rolesResueltos
      : rolesResueltos[0],
  };
};
