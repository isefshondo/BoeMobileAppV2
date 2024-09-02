import React from 'react';
import {SignIn} from '../view/sign-in.view';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '@/navigation/AuthStack';
import { RootStackParams } from '@/navigation/RootStack';

export type SignInInputs = {
  email: string | null;
  password: string | null;
}

export function SignInController() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams & RootStackParams>>();
  const [signInInputs, setSignInInputs] = React.useState<SignInInputs>({
    email: null,
    password: null,
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fetchSignIn = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signInInputs.email,
          password: signInInputs.password,
        })
      });
      const data = await response.json();

      if (response.status === 401 || response.status === 404) {
        setErrorMessage('E-mail ou senha inválidos')
      }
    } catch (error) {
      // Redireciona para a tela de erro
    }
  }, []);
  return <SignIn setSignInInputs={setSignInInputs} />;
}
