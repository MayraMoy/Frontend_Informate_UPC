import { ANOS_CARRERA } from '../data/registerData';

const RegisterAcademicFields = ({ formData, carreras, onChange, disabled }) => (
  <div className="row g-3 mb-4">
    <div className="col-12 col-md-6 text-start">
      <label htmlFor="carrera" className="form-label-custom mb-1">Carrera <span className="text-warning">*</span></label>
      <div className="input-group-custom select-wrapper">
        <span className="input-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </span>
        <select id="carrera" name="carrera" className="input-field-custom select-field-custom" value={formData.carrera} onChange={onChange} disabled={disabled}>
          <option value="">Seleccioná tu carrera</option>
          {carreras.map((carrera) => (
            <option key={carrera.idCarrera} value={carrera.nombre}>{carrera.nombre}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="col-12 col-md-6 text-start">
      <label htmlFor="anoCarrera" className="form-label-custom mb-1">Año de la carrera <span className="text-warning">*</span></label>
      <div className="input-group-custom select-wrapper">
        <span className="input-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <select id="anoCarrera" name="anoCarrera" className="input-field-custom select-field-custom" value={formData.anoCarrera} onChange={onChange} disabled={disabled}>
          <option value="">Seleccioná el año</option>
          {ANOS_CARRERA.map((ano) => (
            <option key={ano} value={ano}>{ano}° Año</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default RegisterAcademicFields;
