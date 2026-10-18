import AuthFormAlert from '../../shared/AuthFormAlert';
import LoginEmailField from './LoginEmailField';
import LoginPasswordField from './LoginPasswordField';
import LoginRegisterPrompt from './LoginRegisterPrompt';
import LoginSubmitButton from './LoginSubmitButton';

const LoginFormView = ({
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  errorMsg,
  isSubmitting,
  isEmailError,
  isPasswordError,
}) => (
  <form onSubmit={handleSubmit} className="login-form" noValidate>
    <AuthFormAlert message={errorMsg} form="login" />
    <LoginEmailField
      value={formData.email}
      onChange={handleChange}
      disabled={isSubmitting}
      hasError={isEmailError}
    />
    <LoginPasswordField
      value={formData.password}
      onChange={handleChange}
      disabled={isSubmitting}
      hasError={isPasswordError}
      visible={showPassword}
      onToggle={() => setShowPassword((previous) => !previous)}
    />
    <LoginSubmitButton isSubmitting={isSubmitting} />
    <LoginRegisterPrompt />
  </form>
);

export default LoginFormView;
