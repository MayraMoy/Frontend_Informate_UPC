import { Link } from 'react-router-dom';

const RegisterLoginPrompt = () => (
  <div className="register-footer text-center mt-4">
    <span className="footer-text">¿Ya tenés cuenta? </span>
    <Link to="/login" className="link-login-direct">Iniciá sesión acá</Link>
  </div>
);

export default RegisterLoginPrompt;
