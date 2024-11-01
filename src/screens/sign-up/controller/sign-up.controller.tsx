import React from 'react';
import {SignUp} from '../view/sign-up.view';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '@/navigation/AuthStack';
import {RootStackParams} from '@/navigation/RootStack';
import * as ImagePicker from 'expo-image-picker';
import * as StorageInstance from '../../../utils/storage/index.utils';

export type SignUpInputs = {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  image?: string;
};

export type ErrorMessage = {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

export function SignUpController() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParams>
    >();
  const [signUpInputs, setSignUpInputs] = React.useState<SignUpInputs>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessage>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [imageMimeType, setImageMimeType] = React.useState<string | null>(null);
  function navigateToSignIn() {
    navigation.navigate('SignIn');
  }
  async function fetchSignUp() {
    try {
      const {name, email, password, image} = signUpInputs;
      const res = await fetch('http://192.168.3.118:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image,
        }),
      });
      if (res.ok) {}
    } catch (error) {}
  }
  async function handleSetImage() {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
    });
    if (!res.canceled) {
      const assets = res.assets[0];
      setSignUpInputs(previousState => ({
        ...previousState,
        image: assets.base64,
      }));
      setImageMimeType(assets.type);
    }
  }
  return (
    <SignUp
      handleSignInLinkPress={navigateToSignIn}
      handleSetImage={handleSetImage}
      signUpInputs={signUpInputs}
      setSignUpInputs={setSignUpInputs}
      errorMessage={errorMessage}
      imageMimeType={imageMimeType}
      handleSignUpButtonPress={fetchSignUp}
    />
  );
}
