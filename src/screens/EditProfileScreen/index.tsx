import React from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
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

  async function updateUserDataInStorage(inputName: keyof EditProfileInputValues, value: string) {
    try {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      if (loggedInData) {
        const parsedData = JSON.parse(loggedInData);
        parsedData.data[inputName] = value;
        await StorageInstance.setInStorage('loggedInData', JSON.stringify(parsedData));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (inputName: keyof EditProfileInputValues, value: string) => {
    setEditProfileInputValues(prevState => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const handleInputBlur = (inputName: keyof EditProfileInputValues) => {
    const value = editProfileInputValues[inputName];
    if (value !== null) {
      updateUserDataInStorage(inputName, value);
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.bodyContainer, styles.bodyJustifiedContainer]}>
        <View style={styles.titleAndFormSection}>
          <View>
            <Text>Editar Perfil</Text>
            <Text>Edite as informações pessoais da sua conta</Text>
          </View>
          <View style={styles.formSection}>
            <TextInput
              style={styles.input}
              value={editProfileInputValues.email || ''}
              onChangeText={(text) => handleInputChange('email', text)}
              onBlur={() => handleInputBlur('email')}
            />
            <TextInput
              style={styles.input}
              value={editProfileInputValues.name || ''}
              onChangeText={(text) => handleInputChange('name', text)}
              onBlur={() => handleInputBlur('name')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
