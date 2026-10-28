const RegisterPasswordField = ({
  value,
  onChange,
  disabled,
  visible,
  onToggle,
  strength,
}) => (
  <div className="form-group mb-3 text-start">
    <label htmlFor="password" className="form-label-custom mb-1">
      Contraseña <span className="text-warning">*</span>
    </label>
    <div className="input-group-custom">
      <span className="input-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <input id="password" name="password" type={visible ? 'text' : 'password'} className="input-field-custom" placeholder="Entre 8 y 25 caracteres" maxLength={25} value={value} onChange={onChange} autoComplete="new-password" disabled={disabled} />
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
    {value && (
      <div className="password-strength-container" aria-hidden="true">
        <div className="password-strength-track">
          <div className="password-strength-bar" style={{ width: strength.width, backgroundColor: strength.barColor }} />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <small className="form-helper-text m-0" style={{ color: strength.color }}>{strength.label}</small>
          <span className="password-percent-badge" style={{ color: strength.color }}>{strength.percentage}%</span>
        </div>
      </div>
    )}
  </div>
);

export default RegisterPasswordField;
