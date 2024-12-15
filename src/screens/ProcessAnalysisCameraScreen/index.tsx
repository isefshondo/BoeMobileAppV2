import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';
import {CameraView, useCameraPermissions} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {ProcessAnalysisResultsScreen} from '../ProcessAnalysisResultsScreen';
import { useTranslation } from 'react-i18next';

interface IAnalysisResults {
  illnessName: string | null;
  illnessChancePercentage: number | null;
}

type NavigationProps = NativeStackScreenProps<
  RootStackParams,
  'ProcessAnalysisCamera'
>;

export const ProcessAnalysisCameraScreen: React.FC<NavigationProps> = ({
  route,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const cameraRef = React.useRef(null);
  const [shouldShowCamera, setShowCamera] = React.useState(true);

  const storeCowId = route.params?.id;
  const [analysisResults, setAnalysisResults] =
    React.useState<IAnalysisResults>({
      illnessName: null,
      illnessChancePercentage: null,
    });
  const [jwt, setJwt] = React.useState<string>('');
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJWT);
  }

  React.useEffect(() => {
    getJWTFromStorage();
  }, []);

  async function handleSendPhotoRequest(photo: any) {
    const data = new FormData();
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    const imageExt = photo.uri.split('.').pop();

    const analysisImage = {
      name: `BOE_PHOTO_${Date.now()}.${imageExt}`,
      uri: photo.uri,
      type: blob.type,
    };

    // @ts-ignore
    data.append('analysis_img', analysisImage);
    data.append('animal_id', storeCowId);

    try {
      const res = await fetch('http://192.168.3.118:4000/api/analysis', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: data,
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }

      const resData = await res.json();

      setAnalysisResults({
        illnessName: resData.newAnalysis.disease_class,
        illnessChancePercentage: Math.round(resData.newAnalysis.accuracy),
      });

      setShowCamera(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTakePhotoButton() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      handleSendPhotoRequest(photo);
    }
  }

  async function handlePickImageButton() {
    console.log('Starting selection of image from gallery...');

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const assets = result.assets[0];
        handleSendPhotoRequest(assets);
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  }

  if (!permission || !galleryPermission) {
    return <View />;
  }

  if (!permission.granted || !galleryPermission.granted) {
    Alert.alert(
      'Conceive permission to Boe App',
      'Please allow camera and gallery permissions to use this feature.',
      [
        {
          text: 'Allow',
          onPress: () => {
            requestPermission();
            requestGalleryPermission();
          },
        },
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ],
    );
    return <View />;
  }

  return shouldShowCamera ? (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.cameraView} ref={cameraRef}>
        <View style={styles.cameraActionsContainer}>
          <View style={styles.actionsContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleTakePhotoButton()}>
                <Text style={styles.buttonsTexts}>{t('camera.buttons.register')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePickImageButton()}>
                <Text style={styles.buttonsTexts}>{t('camera.buttons.gallery')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleTakePhotoButton()}
              style={styles.mainCameraButtonContainer}>
              <View style={styles.mainCameraButton} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  ) : (
    <ProcessAnalysisResultsScreen {...analysisResults} />
  );
};
