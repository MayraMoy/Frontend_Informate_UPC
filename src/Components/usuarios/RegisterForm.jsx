import useRegisterForm from './register/hooks/useRegisterForm';
import RegisterFormView from './register/components/RegisterFormView';

export const RegisterForm = () => {
  const formProps = useRegisterForm();
  return <RegisterFormView {...formProps} />;
};

export default RegisterForm;