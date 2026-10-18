const RegisterIdentityFields = ({ formData, onChange, disabled }) => (
  <>
    <div className="row g-3 mb-3">
      <div className="col-12 col-md-6 text-start">
        <label htmlFor="dni" className="form-label-custom mb-1">DNI <span className="text-warning">*</span></label>
        <div className="input-group-custom">
          <span className="input-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <circle cx="8" cy="10" r="2" />
              <line x1="14" y1="9" x2="18" y2="9" />
              <line x1="14" y1="13" x2="18" y2="13" />
            </svg>
          </span>
          <input id="dni" name="dni" type="text" className="input-field-custom" placeholder="Ej. 40123456" maxLength={10} value={formData.dni} onChange={onChange} disabled={disabled} />
        </div>
      </div>
      <div className="col-12 col-md-6 text-start">
        <label htmlFor="nombre" className="form-label-custom mb-1">Nombre <span className="text-warning">*</span></label>
        <div className="input-group-custom">
          <span className="input-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input id="nombre" name="nombre" type="text" className="input-field-custom" placeholder="Ej. Juan" value={formData.nombre} onChange={onChange} disabled={disabled} />
        </div>
      </div>
    </div>
    <div className="row g-3 mb-3">
      <div className="col-12 col-md-6 text-start">
        <label htmlFor="apellido" className="form-label-custom mb-1">Apellido <span className="text-warning">*</span></label>
        <div className="input-group-custom">
          <input id="apellido" name="apellido" type="text" className="input-field-custom" placeholder="Ej. Pérez" value={formData.apellido} onChange={onChange} disabled={disabled} />
        </div>
      </div>
      <div className="col-12 col-md-6 text-start">
        <label htmlFor="email" className="form-label-custom mb-1">Email institucional <span className="text-warning">*</span></label>
        <div className="input-group-custom">
          <span className="input-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input id="email" name="email" type="email" className="input-field-custom" placeholder="usuario@upc.edu.ar" value={formData.email} onChange={onChange} autoComplete="email" disabled={disabled} />
        </div>
      </div>
    </div>
  </>
);

export default RegisterIdentityFields;
