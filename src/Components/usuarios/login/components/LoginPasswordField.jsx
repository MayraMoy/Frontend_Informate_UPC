import { Link } from 'react-router-dom';

const LoginPasswordField = ({ value, onChange, disabled, hasError, visible, onToggle }) => (
  <div className="form-group mb-4">
    <div className="d-flex justify-content-between align-items-center mb-1">
      <label htmlFor="password" className="form-label-custom mb-0">Contraseña</label>
      <Link to="/recuperar-password" className="link-forgot-password">¿Olvidaste tu contraseña?</Link>
    </div>
    <div className={`input-group-custom ${hasError ? 'has-error' : ''}`}>
      <span className="input-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <input
        id="password"
        name="password"
        type={visible ? 'text' : 'password'}
        className="input-field-custom"
        placeholder="Tu contraseña"
        value={value}
        onChange={onChange}
        autoComplete="current-password"
        disabled={disabled}
      />
      <button type="button" className="btn-toggle-password" onClick={onToggle} aria-label={visible ? 'Ocultar contraseña' : 'Ver contraseña'} tabIndex={-1}>
        {visible ? (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  </div>
);

export default LoginPasswordField;
