export const INITIAL_REGISTER_DATA = {
  nombre: '',
  apellido: '',
  dni: '',
  email: '',
  password: '',
  carrera: '',
  anoCarrera: '',
  aceptaTerminos: false,
};

export const DEFAULT_CARRERAS = [
  { idCarrera: 1, nombre: 'Tecnicatura Universitaria en Desarrollo Web' },
  { idCarrera: 2, nombre: 'Licenciatura en Diseño Gráfico' },
  { idCarrera: 3, nombre: 'Licenciatura en Administración' },
  { idCarrera: 4, nombre: 'Licenciatura en Turismo' },
  { idCarrera: 5, nombre: 'Licenciatura en Psicopedagogía' },
  { idCarrera: 6, nombre: 'Licenciatura en Educación Física' },
];

export const ANOS_CARRERA = [1, 2, 3, 4, 5];
export const REGISTER_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@upc\.edu\.ar$/;
