import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {AnalysisResultsContext} from '@/context/AnalysisResults';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';
import {CameraView, useCameraPermissions} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

type NavigationProps = NativeStackScreenProps<
  RootStackParams,
  'ProcessAnalysisCamera'
>;

export const ProcessAnalysisCameraScreen: React.FC<NavigationProps> = ({
  route,
}) => {
  // Como guardar a foto que eu tirei pelo aplicativo e mandar para a minha API?
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
    const userJWT = loggedInData ? JSON.parse(loggedInData).data.jwt : '';
    setJwt(userJWT);
  }

  React.useEffect(() => {
    getJWTFromStorage();
  }, []);

  async function handleSendPhotoRequest(photo: any) {
    const data = new FormData();
    const response = await fetch(photo.uri);
    const blob = await response.blob();

    data.append('file', blob, `BOE_PHOTO_${Date.now()}.jpg`);
    data.append('animal_id', storeCowId);

    try {
      setIsLoading(true);

      const res = await fetch('http://192.168.3.105:3000/api/analysis', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }

      const resData = await res.json();

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleSendPhotoRequest(result);
    }
  }

  if (!permission || !galleryPermission) {
    return <View />;
  }

  if (!permission.granted || !galleryPermission.granted) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Precisamos da sua permissão para acessar a câmera e galeria</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Dar acesso à câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestGalleryPermission}>
          <Text>Dar acesso à galeria</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CameraView style={{flex: 1}} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={handleTakePhotoButton}
            style={{alignSelf: 'flex-end', marginBottom: 20}}>
            <Text style={{color: 'white'}}>Tirar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePickImageButton}
            style={{alignSelf: 'flex-end', marginBottom: 20}}>
            <Text style={{color: 'white'}}>Selecionar imagem</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};
