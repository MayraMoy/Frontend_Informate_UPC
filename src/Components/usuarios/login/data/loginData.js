export const INITIAL_LOGIN_DATA = {
  email: '',
  password: '',
};

export const LOGIN_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LOGIN_MESSAGES = {
  emailRequired: 'Por favor, ingresa tu correo electrónico.',
  emailInvalid: 'Correo electronico equivocado',
  passwordRequired: 'Por favor, ingresa tu contraseña.',
  submitFailed: 'Error al iniciar sesión. Inténtalo nuevamente.',
};
