import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import BackButton from '../../assets/back_left_icon.svg';
import CameraIcon from '../../assets/camera.svg';
import UploadIcon from '../../assets/upload.svg';
import * as StorageInstance from '../../utils/storage/index.utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';

interface IAnimalData {
  numberIdentification: string | null;
  name: string | null;
}

type NavigationProps = NativeStackNavigationProp<RootStackParams>;

export const RegisterCowScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [jwt, setJwt] = React.useState<string>('');
  const [animalData, setAnimalData] = React.useState<IAnimalData>({
    numberIdentification: null,
    name: null,
  });
  const [shouldShowError, setShouldShowError] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>('');
  const [imageMime, setImageMime] = React.useState<string>('');

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJWT);
  }

  useFocusEffect(
    React.useCallback(() => {
      getJWTFromStorage();
    }, []),
  );

  function handleInputChange(inputName: keyof IAnimalData, value: string) {
    setAnimalData(prevState => ({...prevState, [inputName]: value}));
  }

  async function handleStartAnalysisButton() {
    if (!animalData.numberIdentification || !animalData.name || !image) {
      setShouldShowError(true);
      return;
    }

    try {
      // const res = await fetch('http://192.168.3.105:3000/api/animal', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({...animalData, image}),
      // });

      // if (!res.ok) {
      //   throw new Error(
      //     `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
      //   );
      // }

      // const data = await res.json();

      navigation.navigate('ProcessAnalysisCamera');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUploadImage() {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access camera roll was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.base64);
      setImageMime(asset.type);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.screenDescriptionContainer}>
        <Text style={styles.screenTitle}>Cadastro do animal</Text>
        <Text style={styles.screenDescription}>
          Cadastre os dados do animal e uma imagem de identificação para iniciar
          a análise
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formInputsContainer}>
          <TouchableOpacity
            style={styles.profilePictureContainer}
            onPress={handleUploadImage}>
            <View style={styles.profilePictureHolder}>
              {image && (
                <Image
                  source={{uri: `data:image/${imageMime};base64,${image}`}}
                  style={styles.profilePictureHolder}
                />
              )}
            </View>
            <UploadIcon style={styles.uploadIcon} />
          </TouchableOpacity>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Nº de identificação"
              onChangeText={value =>
                handleInputChange('numberIdentification', value)
              }
            />
            <View>
              <TextInput
                style={[styles.nameInputContainer, styles.inputText]}
                placeholder="Nome do animal"
                onChangeText={value => handleInputChange('name', value)}
              />
              {shouldShowError && (
                <Text>Nenhum dos campos podem ser vazios</Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStartAnalysisButton}>
          <View style={styles.buttonLabelContainer}>
            <Text style={styles.buttonText}>Iniciar análise</Text>
            <CameraIcon style={styles.buttonIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
