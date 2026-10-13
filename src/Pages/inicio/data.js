import institutoHoussay480 from '../../assets/houssay-capilla-del-monte-480.jpg';
import institutoHoussay768 from '../../assets/houssay-capilla-del-monte-768.jpg';
import institutoHoussay1024 from '../../assets/houssay-capilla-del-monte-1024.jpg';

export const inicioContenido = {
  titulo: 'Conectando el conocimiento',
  tituloDestacado: 'Foro UPC',
  descripcion:
    'El espacio digital oficial de la Universidad Provincial de Córdoba para el intercambio de ideas, noticias institucionales y acceso directo a resoluciones oficiales.',
  imagen: institutoHoussay1024,
  imagenResponsive: [
    { src: institutoHoussay480, width: 480 },
    { src: institutoHoussay768, width: 768 },
    { src: institutoHoussay1024, width: 1024 },
  ],
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
