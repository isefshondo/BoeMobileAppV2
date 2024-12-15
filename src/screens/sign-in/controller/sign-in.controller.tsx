import React, {useContext} from 'react';
import {SignIn} from '../view/sign-in.view';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '@/navigation/AuthStack';
import {RootStackParams} from '@/navigation/RootStack';
import * as StorageInstance from '../../../utils/storage/index.utils';
import {AuthContext} from '@/context/auth';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

export type SignInInputs = {
  email: string | null;
  password: string | null;
};

export function SignInController() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParams & RootStackParams>
    >();
  const {i18n} = useTranslation();
  const [signInInputs, setSignInInputs] = React.useState<SignInInputs>({
    email: '',
    password: '',
  });
  const [isAuthenticationError, setIsAuthenticationError] =
    React.useState(false);
  const [shouldBreakTitle, setShouldBreakTitle] = React.useState(false);
  const {signIn} = useContext(AuthContext);

  function handleRegisterLinkPress() {
    navigation.navigate('SignUp');
  }

  const getShouldBreakTitle = React.useCallback(() => {
    const englishVariations = ['en-US', 'en-GB'];
    if (!englishVariations.includes(i18n.language)) {
      setShouldBreakTitle(true);
      return;
    }
    setShouldBreakTitle(false);
  }, [i18n]);

  useFocusEffect(() => getShouldBreakTitle());

  async function fetchSignIn() {
    try {
      const response = await axios.post(
        `http://192.168.3.118:4000/api/user/signin`,
        {
          email: signInInputs.email,
          password: signInInputs.password,
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      const {jwt, data} = await response.data;

      StorageInstance.setInStorage('loggedInData', JSON.stringify({jwt, data}));
      signIn({jwt, data, isLoggedIn: true});
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        setIsAuthenticationError(true);
      }
    }
  }

  return (
    <SignIn
      signInInputs={signInInputs}
      setSignInInputs={setSignInInputs}
      handleRegisterLinkPress={handleRegisterLinkPress}
      handleLogInButtonPress={fetchSignIn}
      isAuthenticationError={isAuthenticationError}
      shouldBreakTitle={shouldBreakTitle}
    />
  );
}
