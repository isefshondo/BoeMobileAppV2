import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';
import {storageInstance} from '../../utils/storage/index.utils';

export type SignInInputsState = {
  emailInput: string | null;
  passwordInput: string | null;
};

export type SignInInputsErrorMessages = {
  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;
};

export const SignInScreen: React.FC = () => {
  const [signinInputs, setSigninInputs] = React.useState<SignInInputsState>({
    emailInput: null,
    passwordInput: null,
  });
  const [signinInputsErrorMessage, setSigninInputsErrorMessage] =
    React.useState<SignInInputsErrorMessages>({
      emailErrorMessage: null,
      passwordErrorMessage: null,
    });

  const {emailInputValidator, passwordInputValidator} =
    useDefaultInputsValidators({
      emailInput: signinInputs.emailInput,
      passwordInput: signinInputs.passwordInput,
    });

  const handleInputChange = (
    inputName: keyof SignInInputsState,
    value: string,
  ) => {
    setSigninInputs(prevState => ({...prevState, [inputName]: value}));
  };

  const handleSignInButtonPress = async () => {
    const emailErrorMessage = emailInputValidator();
    const passwordErrorMessage = passwordInputValidator();

    setSigninInputsErrorMessage({emailErrorMessage, passwordErrorMessage});

    if (emailErrorMessage || passwordErrorMessage) {
      return;
    }

    try {
      // TODO: Introduce the real HTTP URL
      const res = await fetch('', {
        method: 'POST',
        body: JSON.stringify(signinInputs),
      });
      const data = await res.json();
      storageInstance.set(
        'loggedInData',
        JSON.stringify({...data, isLoggedIn: true}),
      );
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
