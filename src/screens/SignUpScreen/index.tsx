import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

export type SignupInputsState = {
  nameInput: string | null;
  emailInput: string | null;
  passwordInput: string | null;
  confirmPassword: string | null;
}

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [signupInputs, setSignupInputs] = React.useState<SignupInputsState>({
    nameInput: null,
    emailInput: null,
    passwordInput: null,
    confirmPassword: null,
  })

  const handleInputChange = (inputName: keyof SignupInputsState, value: string) => {
    setSignupInputs(prevState => ({...prevState, [inputName]: value}))
  }

  const handleSignUpButtonPress = async () => {
    
  };
  return (
    <SafeAreaView>
      <Text>Sign Up Screen</Text>
    </SafeAreaView>
  );
};
