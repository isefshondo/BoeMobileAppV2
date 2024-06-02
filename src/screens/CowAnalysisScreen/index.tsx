import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {useNavigation} from '@react-navigation/native';
import {CowAnalysisProps} from './types';

// type NavigationProps = NativeStackScreenProps<>;

export const CowAnalysisScreen: React.FC<NavigationProps> = ({route}) => {
  const navigation = useNavigation();

  const [jwt, setJwt] = React.useState<string>('');
  const [selectedCowData, setSelectedCowData] =
    React.useState<CowAnalysisProps | null>(null);

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const useJWT = loggedInData ? JSON.parse(loggedInData).data.jwt : '';
    setJwt(useJWT);
  }

  async function fetchSelectedCowData() {
    try {
      const res = await fetch('', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await res.json();
      setSelectedCowData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNewAnalysisButtonPress() {
    navigation.navigate('ProcessAnalysisCameraScreen');
  }

  React.useEffect(() => {
    getJWTFromStorage();
  }, []);

  React.useEffect(() => {
    if (jwt) {
      fetchSelectedCowData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);
};
