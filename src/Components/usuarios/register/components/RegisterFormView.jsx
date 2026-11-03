import AuthFormAlert from '../../shared/AuthFormAlert';
import RegisterIdentityFields from './RegisterIdentityFields';
import RegisterLoginPrompt from './RegisterLoginPrompt';
import RegisterPasswordField from './RegisterPasswordField';
import RegisterSubmitButton from './RegisterSubmitButton';
import RegisterTermsCheckbox from './RegisterTermsCheckbox';

const RegisterFormView = ({
  formData,
  showPassword,
  setShowPassword,
  errorMsg,
  successMsg,
  isSubmitting,
  passwordStrength,
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="register-form" noValidate>
    <AuthFormAlert message={errorMsg} />
    <AuthFormAlert message={successMsg} variant="success" />
    <RegisterIdentityFields formData={formData} onChange={handleChange} disabled={isSubmitting} />
    <RegisterPasswordField
      value={formData.password}
      onChange={handleChange}
      disabled={isSubmitting}
      visible={showPassword}
      onToggle={() => setShowPassword((previous) => !previous)}
      strength={passwordStrength}
    />
    <RegisterTermsCheckbox checked={formData.aceptaTerminos} onChange={handleChange} disabled={isSubmitting} />
    <RegisterSubmitButton isSubmitting={isSubmitting} />
    <RegisterLoginPrompt />
  </form>
);

export default RegisterFormView;
