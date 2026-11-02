export const ESTADOS_NOTICIA = [
  { valor: 'PUBLICADA', etiqueta: 'Publicada', descripcion: 'Visible para todos los usuarios en el portal' },
  { valor: 'PENDIENTE', etiqueta: 'Pendiente de revisión', descripcion: 'En espera de aprobación administrativa' },
  { valor: 'BORRADOR', etiqueta: 'Borrador', descripcion: 'Solo visible en el panel de gestión' },
  { valor: 'ARCHIVADA', etiqueta: 'Archivada', descripcion: 'Retirada de la vista pública' },
];

export const LIMITES_EDICION = {
  titulo: 150,
  cuerpo: 10000,
  maxImagenes: 3,
  maxTamanoBytes: 5 * 1024 * 1024,
  tiposPermitidos: ['image/jpeg', 'image/png', 'image/webp'],
};

export const PESTANAS_EDICION = {
  EDITOR: 'editor',
  PREVIEW: 'preview',
};
