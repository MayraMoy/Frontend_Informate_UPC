const RegisterSubmitButton = ({ isSubmitting }) => (
  <button type="submit" className="btn-submit-register" disabled={isSubmitting}>
    {isSubmitting ? (
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
    ) : (
      <svg className="btn-icon me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )}
    <span>{isSubmitting ? 'Creando cuenta...' : 'Crear mi cuenta'}</span>
  </button>
);

export default RegisterSubmitButton;
