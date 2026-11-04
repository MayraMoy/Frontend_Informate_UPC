const ESTADOS_RESOLUCION = {
  VIGENTE: {
    etiqueta: 'Vigente',
    clase: 'estado-vigente',
    color: '#10B981',
    descripcion: 'Está aprobada y disponible para consulta pública.',
  },
  PENDIENTE: {
    etiqueta: 'Pendiente de revisión',
    clase: 'estado-pendiente',
    color: '#3B82F6',
    descripcion: 'Está a la espera de revisión y aprobación.',
  },
  ARCHIVADA: {
    etiqueta: 'Archivada',
    clase: 'estado-archivado',
    color: '#EF4444',
    descripcion: 'Se conserva como antecedente y no está vigente.',
  },
};

export const obtenerEstadoResolucion = (estado) => {
  const valorOriginal = String(estado ?? '').trim();
  const estadoNormalizado = valorOriginal.toUpperCase().replace(/[\s-]+/g, '_');
  const clave = estadoNormalizado === 'ARCHIVADO' ? 'ARCHIVADA' : estadoNormalizado;

  if (ESTADOS_RESOLUCION[clave]) return ESTADOS_RESOLUCION[clave];

  return {
    etiqueta: valorOriginal || 'Sin estado',
    clase: 'estado-desconocido',
    color: '#94A3B8',
    descripcion: 'El estado de esta resolución no está disponible.',
  };
};
