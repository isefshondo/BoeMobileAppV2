import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';

export type SignInInputsState = {
  emailInput?: string | null;
  passwordInput?: string | null;
};

export const SignInScreen: React.FC = () => {
  const [signinInputs, setSigninInputs] = React.useState<SignInInputsState>({
    emailInput: null,
    passwordInput: null,
  });
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<
    string | null
  >(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<
    string | null
  >(null);

  const {emailInputValidator, passwordInputValidator} =
    useDefaultInputsValidators({signinInputsState: signinInputs});

  const handleInputChange = (
    inputName: keyof SignInInputsState,
    value: string,
  ) => {
    setSigninInputs(prevState => ({...prevState, [inputName]: value}));
  };

  const handleSignInButtonPress = async () => {
    const newEmailErrorMessage = emailInputValidator();
    const newPasswordErrorMessage = passwordInputValidator();

    setEmailErrorMessage(newEmailErrorMessage);
    setPasswordErrorMessage(newPasswordErrorMessage);

    if (newEmailErrorMessage || newPasswordErrorMessage) {
      return;
    }

    try {
      await fetch('https://api.example.com/signin', {
        method: 'POST',
        body: JSON.stringify(signinInputs),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Sign In Screen</Text>
    </SafeAreaView>
  );
};
