import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as StorageInstance from '../../utils/storage/index.utils';
import {styles} from './styles';
import {DefaultInput} from '../../components/DefaultInput';
import GoBackIcon from '../../assets/back_left_icon.svg';
import TrashIcon from '../../assets/trash_icon.svg';
import {ChangePasswordInput} from '@/components/ChangePasswordInput';

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
      const storedName = loggedInData ? JSON.parse(loggedInData).data.name : '';
      const storedEmail = loggedInData
        ? JSON.parse(loggedInData).data.email
        : '';
      setEditProfileInputValues({
        name: storedName,
        email: storedEmail,
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

  async function updateUserDataInStorage(
    inputName: keyof EditProfileInputValues,
    value: string,
  ) {
    try {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      if (loggedInData) {
        const parsedData = JSON.parse(loggedInData);
        parsedData.data[inputName] = value;
        await StorageInstance.setInStorage(
          'loggedInData',
          JSON.stringify(parsedData),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (
    inputName: keyof EditProfileInputValues,
    value: string,
  ) => {
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
    <SafeAreaView style={styles.container}>
      <GoBackIcon style={styles.goBackIcon} />
      <View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.screenTitle}>Editar perfil</Text>
            <Text style={styles.screenDescription}>
              Edite as informações pessoais da sua conta
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <DefaultInput
              inputIcon="name"
              inputLabel="Nome"
              onInputChange={(value: string) =>
                handleInputChange('name', value)
              }
              inputCurrentValue={editProfileInputValues.name || ''}
            />
            <DefaultInput
              inputIcon="email"
              inputLabel="E-mail"
              onInputChange={(value: string) =>
                handleInputChange('email', value)
              }
              inputCurrentValue={editProfileInputValues.email || ''}
            />
          </View>
          <ChangePasswordInput
            inputCurrentValue={'D3F4ULT_P4SSWORD'}
            onInputChange={value => handleInputChange('password', value)}
          />
        </View>
        <TouchableOpacity style={styles.deleteAccountButton}>
          <View style={styles.labelIconBtnContainer}>
            <Text style={styles.deleteAccountButtonLabel}>Excluir conta</Text>
            <TrashIcon style={styles.trashIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
