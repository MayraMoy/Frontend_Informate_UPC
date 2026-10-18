import { buscarPorId } from '../Services/usuarios/usuarioRoles';

const nombreDeRol = (rol) => {
  if (typeof rol === 'string') return rol;
  if (!rol || typeof rol !== 'object') return '';

  const nombre = rol.nombre
    ?? rol.nombreRol
    ?? rol.name
    ?? rol.authority
    ?? rol.descripcion
    ?? rol.descripcionRol
    ?? rol.rol;

  return typeof nombre === 'string' ? nombre : '';
};

const normalizarRol = (rol) => nombreDeRol(rol)
  .trim()
  .toUpperCase()
  .replace(/^ROLE_/, '')
  .replace(/[\s-]+/g, '_');

export const tieneRolAdministrador = (usuario) => {
  const rol = usuario?.rol ?? usuario?.role ?? usuario?.roles;
  const nombres = Array.isArray(rol) ? rol : [rol];

  return nombres.some((item) => normalizarRol(item) === 'ADMINISTRADOR');
};

export const tieneRolPersonalEscuela = (usuario) => {
  const rol = usuario?.rol ?? usuario?.role ?? usuario?.roles;
  const nombres = Array.isArray(rol) ? rol : [rol];

  return nombres.some((item) => normalizarRol(item) === 'PERSONAL_ESCUELA');
};

export const puedeAccederGestion = (usuario) => (
  tieneRolAdministrador(usuario) || tieneRolPersonalEscuela(usuario)
);

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
