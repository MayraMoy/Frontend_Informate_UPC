export const sidebarHomeItem = {
  etiqueta: 'Inicio',
  ruta: '/dashboard-admin',
  icono: 'inicio',
};

export const sidebarGroups = [
  {
    id: 'noticias',
    etiqueta: 'Noticias',
    icono: 'noticias',
    opciones: [
      { etiqueta: 'Crear noticia', ruta: '/noticias/crear' },
      { etiqueta: 'Ver noticias', ruta: '/noticias' },
      { etiqueta: 'Pendientes de revisión', ruta: '/noticias/pendientes' },
    ],
  },
  {
    id: 'resoluciones',
    etiqueta: 'Resoluciones',
    icono: 'resoluciones',
    opciones: [
      { etiqueta: 'Crear resolución', ruta: '/resoluciones/crear' },
      { etiqueta: 'Ver resoluciones', ruta: '/resoluciones' },
      { etiqueta: 'Resoluciones pendientes', ruta: '/resoluciones/pendientes' },
      { etiqueta: 'Comentarios de estudiantes pendientes', ruta: '/resoluciones/comentarios-pendientes' },
    ],
  },
  {
    id: 'usuarios',
    etiqueta: 'Usuarios',
    icono: 'usuarios',
    opciones: [{ etiqueta: 'Ver usuarios', ruta: '/usuarios' }],
  },
];
