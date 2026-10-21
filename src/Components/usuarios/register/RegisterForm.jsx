import useRegisterForm from './hooks/useRegisterForm.js';
import RegisterFormView from './components/RegisterFormView.jsx';

export const RegisterForm = () => {
  const formProps = useRegisterForm();
  return <RegisterFormView {...formProps} />;
};

export default RegisterForm;
