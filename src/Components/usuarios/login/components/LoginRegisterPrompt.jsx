import { Link } from 'react-router-dom';

const LoginRegisterPrompt = () => (
  <div className="login-footer text-center mt-4">
    <span className="footer-text">¿No tenés cuenta? </span>
    <Link to="/registro" className="link-register">Registrate</Link>
  </div>
);

export default LoginRegisterPrompt;
