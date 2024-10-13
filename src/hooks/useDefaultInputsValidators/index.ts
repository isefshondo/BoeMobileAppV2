interface DefaultInputsValidators {
  nameInput?: string | null;
  emailInput: string | null;
  passwordInput: string | null;
  confirmPasswordInput?: string | null;
}

export function useDefaultInputsValidators({
  nameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
}: DefaultInputsValidators) {
  const nameInputValidator = () => {
    if (!nameInput || nameInput.trim().length === 0) {
      return 'O campo nome não pode ser vazio';
    } else if (nameInput.trim().length < 3) {
      return 'Seu nome deve ter no mínimo três letras';
    }
    return null;
  };

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

  const confirmPasswordInputValidator = () => {
    const arePasswordsInputsEqual =
      passwordInput?.length === confirmPasswordInput?.length &&
      passwordInput === confirmPasswordInput;
    if (!arePasswordsInputsEqual) return 'As senhas não conferem';
    return null;
  };

  return {
    nameInputValidator,
    emailInputValidator,
    passwordInputValidator,
    confirmPasswordInputValidator,
  };
}
