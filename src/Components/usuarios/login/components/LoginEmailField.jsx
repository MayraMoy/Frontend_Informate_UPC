const LoginEmailField = ({ value, onChange, disabled, hasError }) => (
  <div className="form-group mb-3 text-start">
    <label htmlFor="email" className="form-label-custom mb-1">Correo electrónico</label>
    <div className={`input-group-custom ${hasError ? 'has-error' : ''}`}>
      <span className="input-icon" aria-hidden="true">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </span>
      <input
        id="email"
        name="email"
        type="email"
        className="input-field-custom"
        placeholder="foroUPC@gmail.com"
        value={value}
        onChange={onChange}
        autoComplete="email"
        disabled={disabled}
      />
    </div>
  </div>
);

export default LoginEmailField;
