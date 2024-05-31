import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {AnalysisResultsContext} from '@/context/AnalysisResults';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';
import {CameraView, useCameraPermissions} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type NavigationProps = NativeStackScreenProps<
  RootStackParams,
  'ProcessAnalysisCamera'
>;

export const ProcessAnalysisCameraScreen: React.FC<NavigationProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const cameraRef = React.useRef(null);

  const storeCowId = route.params?.id;
  const {setAnalysisResults} = React.useContext(AnalysisResultsContext);
  const [jwt, setJwt] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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

    data.append('analysis_img', analysisImage);
    data.append('animal_id', storeCowId);

    try {
      setIsLoading(true);

      const res = await fetch('http://192.168.3.105:3000/api/analysis', {
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

      console.log(resData);

      setAnalysisResults(resData);
      // navigation.navigate('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.cameraView} ref={cameraRef}>
        <View style={styles.actionsContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => handleTakePhotoButton()}>
              <Text style={styles.buttonsTexts}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePickImageButton()}>
              <Text style={styles.buttonsTexts}>Galeria</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleTakePhotoButton()}
            style={styles.mainCameraButtonContainer}>
            <View style={styles.mainCameraButton} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};
