const RegisterSubmitButton = ({ isSubmitting }) => (
  <button type="submit" className="btn-submit-register" disabled={isSubmitting}>
    {isSubmitting && (
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
    )}
    <span>{isSubmitting ? 'Creando cuenta...' : 'Crear mi cuenta'}</span>
  </button>
);

export default RegisterSubmitButton;
