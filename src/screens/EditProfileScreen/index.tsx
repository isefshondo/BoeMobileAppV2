import React from 'react';
import {Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storageInstance} from '../../utils/storage/index.utils';

export type EditProfileInputValues = {
  name: string | null;
  email: string | null;
  password?: string | null;
};

export const EditProfileScreen: React.FC = () => {
  const [editProfileInputValues, setEditProfileInputValues] =
    React.useState<EditProfileInputValues>({
      name: null,
      email: null,
    });
  const [isInputFocused, setIsInputFocused] = React.useState({
    name: false,
    email: false,
    password: false,
  });
  const isFirstRender = React.useRef<boolean>(true);

  React.useEffect(() => {
    setEditProfileInputValues({
      name: storageInstance.getString('name') ?? null,
      email: storageInstance.getString('email') ?? null,
    });
  }, []);

  const handleInputState = (
    inputName: keyof EditProfileInputValues,
    value: string,
  ) => {
    if (isInputFocused[inputName]) {
      setEditProfileInputValues(prevState => ({
        ...prevState,
        [inputName]: value,
      }));
      storageInstance.set(inputName, value);
    }
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const requestTimer = setTimeout(async () => {
      try {
        // TODO: Introduce the real HTTPS URL
        const res = await fetch('');
        const data = await res.json();

        if (res.ok) {
          Alert.alert('Deu certo!', data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1500);
    return () => clearTimeout(requestTimer);
  }, [editProfileInputValues]);

  return (
    <SafeAreaView>
      <Text>Edit Profile Screen</Text>
      <Text>{editProfileInputValues.name}</Text>
      <Text>{editProfileInputValues.email}</Text>
    </SafeAreaView>
  );
};
