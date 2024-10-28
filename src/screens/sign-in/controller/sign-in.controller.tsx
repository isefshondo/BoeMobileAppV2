import React, {useContext} from 'react';
import {SignIn} from '../view/sign-in.view';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '@/navigation/AuthStack';
import {RootStackParams} from '@/navigation/RootStack';
import * as StorageInstance from '../../../utils/storage/index.utils';
import {AuthContext} from '@/context/auth';

export type SignInInputs = {
  email: string | null;
  password: string | null;
};

export function SignInController() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParams & RootStackParams>
    >();
  const [signInInputs, setSignInInputs] = React.useState<SignInInputs>({
    email: '',
    password: '',
  });
  const [isAuthenticationError, setIsAuthenticationError] =
    React.useState(false);
  const {signIn} = useContext(AuthContext);

  function handleRegisterLinkPress() {
    navigation.navigate('SignUp');
  }

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
        }),
      });
      const {jwt, data} = await response.json();

      StorageInstance.setInStorage('loggedInData', JSON.stringify({jwt, data}));
      signIn({jwt, data, isLoggedIn: true});
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        setIsAuthenticationError(true);
      }
    }
  }, []);

  return (
    <SignIn
      signInInputs={signInInputs}
      setSignInInputs={setSignInInputs}
      handleRegisterLinkPress={handleRegisterLinkPress}
      handleLogInButtonPress={fetchSignIn}
      isAuthenticationError={isAuthenticationError}
    />
  );
}
