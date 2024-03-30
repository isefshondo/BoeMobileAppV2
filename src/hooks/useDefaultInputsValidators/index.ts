import {SignInInputsState} from '../../screens/SignInScreen';

interface DefaultInputsValidators {
  signinInputsState: SignInInputsState;
}

export function useDefaultInputsValidators({
  signinInputsState,
}: DefaultInputsValidators) {
  const {emailInput, passwordInput} = signinInputsState;

  const emailInputValidator = () => {
    if (!emailInput || emailInput.trim().length === 0) {
      return 'O campo de e-mail não pode ser vazio';
    } else if (!emailInput.includes('@')) {
      return 'O e-mail informado não é válido';
    }
    return null;
  };

  const passwordInputValidator = () => {
    if (!passwordInput || passwordInput.trim().length === 0) {
      return 'O campo de senha não pode ser vazio';
    } else if (passwordInput.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres';
    }
    return null;
  };

  return {
    emailInputValidator,
    passwordInputValidator,
  };
}
