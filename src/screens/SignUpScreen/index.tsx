import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../../App';

export type SignupInputsState = {
  nameInput: string | null;
  emailInput: string | null;
  passwordInput: string | null;
  confirmPassword: string | null;
};

export type SignupInputsErrorMessage = {
  nameErrorMessage: string | null;
  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;
  confirmPasswordErrorMessage: string | null;
};

export const SignUpScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [signupInputs, setSignupInputs] = React.useState<SignupInputsState>({
    nameInput: null,
    emailInput: null,
    passwordInput: null,
    confirmPassword: null,
  });
  const [signupInputsErrorMessage, setSignupInputsErrorMessage] =
    React.useState<SignupInputsErrorMessage>({
      nameErrorMessage: null,
      emailErrorMessage: null,
      passwordErrorMessage: null,
      confirmPasswordErrorMessage: null,
    });

  const handleInputChange = (
    inputName: keyof SignupInputsState,
    value: string,
  ) => {
    setSignupInputs(prevState => ({...prevState, [inputName]: value}));
  };

  const {
    nameInputValidator,
    emailInputValidator,
    passwordInputValidator,
    confirmPasswordInputValidator,
  } = useDefaultInputsValidators({
    nameInput: signupInputs.nameInput,
    emailInput: signupInputs.emailInput,
    passwordInput: signupInputs.passwordInput,
    confirmPasswordInput: signupInputs.confirmPassword,
  });

  const handleSignUpButtonPress = async () => {
    const nameErrorMessage = nameInputValidator();
    const emailErrorMessage = emailInputValidator();
    const passwordErrorMessage = passwordInputValidator();
    const confirmPasswordErrorMessage = confirmPasswordInputValidator();
    setSignupInputsErrorMessage({
      nameErrorMessage,
      emailErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
    });

    if (
      nameErrorMessage ||
      emailErrorMessage ||
      passwordErrorMessage ||
      confirmPasswordErrorMessage
    ) {
      return;
    }

    try {
      // TODO: Introduce the real HTTP URL
      const res = await fetch('', {
        method: 'POST',
        body: JSON.stringify(signupInputs),
      });
      if (res.ok) {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <Text>Sign Up Screen</Text>
    </SafeAreaView>
  );
};
