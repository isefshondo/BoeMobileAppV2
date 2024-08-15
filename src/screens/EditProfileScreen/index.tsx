import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as StorageInstance from '../../utils/storage/index.utils';
import {styles} from './styles';
import {DefaultInput} from '../../components/DefaultInput';
import GoBackIcon from '../../assets/back_left_icon.svg';
import TrashIcon from '../../assets/trash_icon.svg';
import {ChangePasswordInput} from '@/components/ChangePasswordInput';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';

export type EditProfileInputValues = {
  name: string | null;
  email: string | null;
  password?: string | null;
};

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const {signOut} = React.useContext(AuthContext);
  const [editProfileInputValues, setEditProfileInputValues] =
    React.useState<EditProfileInputValues>({
      name: null,
      email: null,
    });
  const [lastEditedField, setLastEditedField] = React.useState<
    keyof EditProfileInputValues | null
  >(null);
  const [jwt, setJwt] = React.useState<string>('');
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  async function getUserDataFromStorage() {
    try {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      const storedName = loggedInData ? JSON.parse(loggedInData).data.name : '';
      const storedEmail = loggedInData
        ? JSON.parse(loggedInData).data.email
        : '';
      const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
      setEditProfileInputValues({
        name: storedName,
        email: storedEmail,
      });
      setJwt(userJWT);
    } catch (error) {
      console.log(error);
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

  async function updateUserDataInDB(
    inputName: keyof EditProfileInputValues,
    value: string,
  ) {
    try {
      await updateUserDataInStorage(inputName, value);

      const res = await fetch('http://192.168.3.105:3000/api/user/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editProfileInputValues,
          [inputName]: value,
        }),
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
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
    setIsTyping(true);
    setLastEditedField(inputName);
    setEditProfileInputValues(prevState => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const showAlert = (field: keyof EditProfileInputValues) => {
    if (editProfileInputValues[field]) {
      Alert.alert(
        'Confirmação',
        `Deseja realmente alterar o campo ${field} para ${editProfileInputValues[field]}?`,
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              updateUserDataInDB(field, editProfileInputValues[field]),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleTimeout = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setIsTyping(false);
      if (lastEditedField && editProfileInputValues[lastEditedField]) {
        showAlert(lastEditedField);
      }
    }, 3000);
  };

  React.useEffect(() => {
    if (isTyping) {
      handleTimeout();
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping, editProfileInputValues]);

  async function handleDeleteAccount() {
    try {
      const res = await fetch('http://192.168.3.105:3000/api/user/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }

      await StorageInstance.removeFromStorage('loggedInData');
      signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackIcon
        style={styles.goBackIcon}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.actionsContainer}>
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
            inputCurrentValue={
              editProfileInputValues.password || 'D3f@ultP@ssw0rd'
            }
            onInputChange={value => handleInputChange('password', value)}
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}>
          <View style={styles.labelIconBtnContainer}>
            <Text style={styles.deleteAccountButtonLabel}>Excluir conta</Text>
            <TrashIcon style={styles.trashIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
