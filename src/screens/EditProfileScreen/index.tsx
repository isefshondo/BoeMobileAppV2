import React from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as StorageInstance from '../../utils/storage/index.utils';
import {styles} from './styles';
import {DefaultInput} from '../../components/DefaultInput';
import {ChangePasswordInput} from '../../components/ChangePasswordInput';

export type EditProfileInputValues = {
  name: string | null;
  email: string | null;
  password?: string | null;
};

export const EditProfileScreen: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean | null>(null);
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

  async function getUserDataFromStorage() {
    try {
      setIsLoading(true);
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      const storagedName = loggedInData
        ? JSON.parse(loggedInData).data.name
        : '';
      const storagedEmail = loggedInData
        ? JSON.parse(loggedInData).data.email
        : '';
      setEditProfileInputValues({
        name: storagedName,
        email: storagedEmail,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getUserDataFromStorage();
  }, []);

  // const handleInputState = (inputName: keyof EditProfileInputValues, value: string) => {
  //   if (isInputFocused[inputName]) {
  //     setEditProfileInputValues(prevState => ({
  //       ...prevState,
  //       [inputName]: value,
  //     }));

  //   }
  // };

  // const isFirstRender = React.useRef<boolean>(true);

  // React.useEffect(() => {
  //   setEditProfileInputValues({
  //     name: storageInstance.getString('name') ?? null,
  //     email: storageInstance.getString('email') ?? null,
  //   });
  // }, []);

  // const handleInputState = (
  //   inputName: keyof EditProfileInputValues,
  //   value: string,
  // ) => {
  //   if (isInputFocused[inputName]) {
  //     setEditProfileInputValues(prevState => ({
  //       ...prevState,
  //       [inputName]: value,
  //     }));
  //     storageInstance.set(inputName, value);
  //   }
  // };

  // React.useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   const requestTimer = setTimeout(async () => {
  //     try {
  //       // TODO: Introduce the real HTTPS URL
  //       const res = await fetch('');
  //       const data = await res.json();

  //       if (res.ok) {
  //         Alert.alert('Deu certo!', data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 1500);
  //   return () => clearTimeout(requestTimer);
  // }, [editProfileInputValues]);

  return (
    <SafeAreaView>
      <View style={[styles.bodyContainer, styles.bodyJustifiedContainer]}>
        <View style={styles.titleAndFormSection}>
          <View>
            <Text>Editar Perfil</Text>
            <Text>Edite as informações pessoais da sua conta</Text>
          </View>
          <View style={styles.formSection}>
            <DefaultInput
              inputIcon="name"
              inputLabel="Nome"
              inputCurrentValue={editProfileInputValues.name ?? ''}
              onInputChange={() => handleInputState}
            />
            <DefaultInput
              inputIcon="email"
              inputLabel="E-mail"
              inputCurrentValue={editProfileInputValues.email ?? ''}
              onInputChange={() => handleInputState}
            />
            <ChangePasswordInput
              onInputChange={() => handleInputState}
              inputCurrentValue="D3F4U1T_P4SSW0RD"
            />
          </View>
        </View>
      </View>
      <Text>Edit Profile Screen</Text>
      <Text>{editProfileInputValues.name}</Text>
      <Text>{editProfileInputValues.email}</Text>
    </SafeAreaView>
  );
};
