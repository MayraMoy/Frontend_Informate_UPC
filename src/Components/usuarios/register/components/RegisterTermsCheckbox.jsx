import { Link } from 'react-router-dom';

const RegisterTermsCheckbox = ({ checked, onChange, disabled }) => (
  <div className="form-check-custom text-start mb-4">
    <input
      id="aceptaTerminos"
      name="aceptaTerminos"
      type="checkbox"
      className="checkbox-custom"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor="aceptaTerminos" className="checkbox-label-custom">
      Acepto los{' '}
      <Link to="/terminos" className="link-terms">Términos y Condiciones</Link>{' '}
      y la{' '}
      <Link to="/privacidad" className="link-terms">Política de Privacidad</Link>{' '}
      de Foro UPC.
    </label>
  </div>
);

export default RegisterTermsCheckbox;
