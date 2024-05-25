import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {AnalysisResultsContext} from '@/context/AnalysisResults';

// type NavigationProps = NativeStackScreenProps<>;

export const ProcessAnalysisCameraScreen: React.FC<> = ({route}) => {
  // Como guardar a foto que eu tirei pelo aplicativo e mandar para a minha API?
  const storeCowId = route.params.id ?? null;
  const {setAnalysisResults} = React.useContext(AnalysisResultsContext);
  const [jwt, setJwt] = React.useState<string>('');

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJWT = loggedInData ? JSON.parse(loggedInData).data.jwt : '';
    setJwt(userJWT);
  }

  React.useEffect(() => {
    getJWTFromStorage();
  }, []);

  // Será chamada por outra função que será chamada quando o usuário clicar no botão da câmera - Nela vai ter o navigate para a tela de Resultados - Vou precisar o Loading
  async function handleSendPhotoRequest() {
    try {
      const res = await fetch('', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          cowId: storeCowId,
          photo: 'base64',
        }),
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }

      const data = await res.json();

      setAnalysisResults(data);
    } catch (error) {
      console.error(error);
    }
  }
};
