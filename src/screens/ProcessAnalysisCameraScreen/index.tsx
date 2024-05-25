import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {AnalysisResultsContext} from '@/context/AnalysisResults';
import {useNavigation} from '@react-navigation/native';

// type NavigationProps = NativeStackScreenProps<>;

export const ProcessAnalysisCameraScreen: React.FC<NavigationProps> = ({
  route,
}) => {
  // Como guardar a foto que eu tirei pelo aplicativo e mandar para a minha API?
  const navigation = useNavigation();
  const storeCowId = route.params.id ?? null;
  const {setAnalysisResults} = React.useContext(AnalysisResultsContext);
  const [jwt, setJwt] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
    data.append('image', blob, `BOE_PHOTO_${Date.now()}.jpg`);

    try {
      setIsLoading(true);
      const res = await fetch('', {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTakePhotoButton() {
    // Chamada da função para tirar a foto
    handleSendPhotoRequest();
    navigation.navigate('AnalysisResultsScreen', {id: storeCowId});
  }
};
