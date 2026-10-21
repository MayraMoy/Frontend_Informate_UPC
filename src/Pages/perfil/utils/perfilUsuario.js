const nombreRol = (rol) => {
  if (typeof rol === 'string') return rol;
  if (!rol || typeof rol !== 'object') return '';

  return rol.nombre ?? rol.nombreRol ?? rol.name ?? rol.authority
    ?? rol.descripcion ?? rol.descripcionRol ?? '';
};

export const obtenerNombreUsuario = (usuario) => {
  const nombreCompleto = usuario?.nombreCompleto
    || [usuario?.nombre, usuario?.apellido].filter(Boolean).join(' ')
    || usuario?.username
    || usuario?.email;

  return typeof nombreCompleto === 'string' && nombreCompleto.trim()
    ? nombreCompleto.trim()
    : 'Usuario';
};

export const obtenerRolesUsuario = (usuario) => {
  if (usuario?.nombreRol) {
    return nombreRol(usuario.nombreRol) || 'Usuario';
  }

  const roles = usuario?.rol ?? usuario?.role ?? usuario?.roles;
  const listaRoles = Array.isArray(roles) ? roles : [roles];
  const nombres = listaRoles.map(nombreRol).filter(Boolean);

  return nombres.length ? nombres.join(', ') : 'Usuario';
};
