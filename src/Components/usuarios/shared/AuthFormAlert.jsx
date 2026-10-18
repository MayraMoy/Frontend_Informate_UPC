const AuthFormAlert = ({ message, variant = 'error', form = 'register' }) => {
  if (!message) return null;

  const success = variant === 'success';

  const alertClass = success
    ? 'register-alert-success'
    : form === 'login'
      ? 'login-alert-error'
      : 'register-alert-error';

  return (
    <div className={alertClass} role="alert">
      {success ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      <span>{message}</span>
    </div>
  );
};

export default AuthFormAlert;
