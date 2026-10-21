const LoginSubmitButton = ({ isSubmitting }) => (
  <button type="submit" className="btn-submit-login" disabled={isSubmitting}>
    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
  </button>
);

export default LoginSubmitButton;
