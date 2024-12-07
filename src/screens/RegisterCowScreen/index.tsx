import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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
import {responsiveVerticalScale} from '@/utils/metrics/index.utils';
import {useTranslation} from 'react-i18next';
import {Avatar} from '@/components/avatar.component';
import {Button} from '@/components/button.component';

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

  async function registerAnimal() {
    if (!animalData.numberIdentification) {
      setShouldShowError(true);
      return;
    }

    const res = await fetch('http://192.168.3.118:4000/api/animal', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...animalData, image}),
    });

    if (!res.ok) {
      throw new Error(
        `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
      );
    }

    const data = await res.json();

    navigation.navigate('ProcessAnalysisCamera', {
      id: data.cowId,
    });
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

  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#fff'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: responsiveVerticalScale(85),
          paddingBottom: responsiveVerticalScale(158),
        }}>
        <View style={styles.header}>
          <BackButton
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.screenDescriptionContainer}>
          <Text style={styles.screenTitle}>
            {t('animal_registration.title')}
          </Text>
          <Text style={styles.screenDescription}>
            {t('animal_registration.description')}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formInputsContainer}>
            <Avatar
              width={96}
              height={96}
              badgeTop={73}
              badge={<UploadIcon style={styles.profilePictureHolder} />}
              handleSetImage={handleUploadImage}
            />
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.inputText}
                placeholder={t(
                  'animal_registration.inputs.characteristics.placeholder.identifier',
                )}
                onChangeText={value =>
                  handleInputChange('numberIdentification', value)
                }
              />
              <View>
                <TextInput
                  style={[styles.nameInputContainer, styles.inputText]}
                  placeholder={t(
                    'animal_registration.inputs.characteristics.placeholder.name',
                  )}
                  onChangeText={value => handleInputChange('name', value)}
                />
                {shouldShowError && (
                  <Text>{t('animal_registration.inputs.error')}</Text>
                )}
              </View>
            </View>
          </View>
          <Button
            width={320}
            height={76}
            handlePress={registerAnimal}
            rightAssets={<CameraIcon style={styles.buttonIcon} />}>
            {t('animal_registration.button')}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
