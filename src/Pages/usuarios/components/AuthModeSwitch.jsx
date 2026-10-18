import { Link, useLocation } from 'react-router-dom';

const AuthModeSwitch = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === '/registro' || pathname === '/register';

  return (
    <nav className="auth-mode-switch" aria-label="Acceso a la cuenta">
      <Link
        to="/login"
        className={!isRegister ? 'is-active' : ''}
        aria-current={!isRegister ? 'page' : undefined}
      >
        Iniciar sesión
      </Link>
      <Link
        to="/registro"
        className={isRegister ? 'is-active' : ''}
        aria-current={isRegister ? 'page' : undefined}
      >
        Registrarte
      </Link>
    </nav>
  );
};

export default AuthModeSwitch;
