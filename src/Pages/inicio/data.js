import institutoHoussay from '../../assets/houssay-capilla-del-monte.jpg';

export const inicioContenido = {
  titulo: 'Conectando el conocimiento',
  tituloDestacado: 'Foro UPC',
  descripcion:
    'El espacio digital oficial de la Universidad Provincial de Córdoba para el intercambio de ideas, noticias institucionales y acceso directo a resoluciones oficiales.',
  imagen: institutoHoussay,
  imagenAlt: 'Instituto Superior Dr. Bernardo Houssay de Capilla del Monte',
  imagenPie:
    'UPC Instituto Superior “Dr. Bernardo Houssay” (Capilla del Monte)',
  acciones: [
    {
      texto: 'Participar del Foro',
      destino: '/registro',
      estilo: 'outline',
    },
    {
      texto: 'Ver Resoluciones',
      destino: '/resoluciones',
      estilo: 'primary',
    },
  ],
};
