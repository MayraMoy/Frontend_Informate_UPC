import useLoginForm from '../login/hooks/useLoginForm';
import LoginFormView from '../login/components/LoginFormView';

export const LoginForm = () => {
  const formProps = useLoginForm();
  return <LoginFormView {...formProps} />;
};

export default LoginForm;