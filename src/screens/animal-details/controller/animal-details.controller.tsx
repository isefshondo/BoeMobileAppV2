import { RootStackParams } from "@/navigation/RootStack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import * as StorageInstance from '../../../utils/storage/index.utils';
import axios from "axios";
import { arrayToBase64 } from "@/utils/array-to-base64/index.utils";
import { AnimalDetails } from "../view/animal-details.view";

type AnimalDetailsProps = NativeStackScreenProps<RootStackParams, 'CowDetails'>;
export interface AnimalDetailsRes {
  image?: string;
  identifier: string;
  name: string;
  mostRecentAnalysis: any;
  animalAnalysisHistory: any[];
}

export const AnimalDetailsController: React.FC<AnimalDetailsProps> = ({route}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const animalId = route.params?.id;
  const [isLoading, setIsLoading] = React.useState(true);
  const [animalDetails, setAnimalsDetails] = React.useState<AnimalDetailsRes>({
    image: '',
    identifier: '',
    name: '',
    mostRecentAnalysis: [],
    animalAnalysisHistory: [],
  });
  const [jwt, setJwt] = React.useState('');
  const [isExpandedCard, setIsExpandedCard] = React.useState(false);

  function handleNewAnalysisPress() {
    navigation.navigate('ProcessAnalysisCamera', {id: animalId});
  }

  async function getJwtFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJwt = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJwt);
  }

  useFocusEffect(
    useCallback(() => {
      getJwtFromStorage();
    }, [])
  );

  const handleHistoryCardPress = React.useCallback(() => {
    setIsExpandedCard(!isExpandedCard);
  }, [isExpandedCard, setIsExpandedCard]);

  async function getAnimalDetails() {
    console.log('Oi')
    try {
      const res = await axios.get(`http://192.168.3.105/api/animal/${animalId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      });
      const {animal, analysisHistoric} = await res.data;
      const animalAnalysisHistory = analysisHistoric.map(item => ({
        disease: item.disease_class,
        status: item.treatment_status,
        percentage: item.accuracy,
        creationDate: item.created_at,
        image: arrayToBase64(item.analysis_img.data),
      }));
      const mostRecentAnalysis = analysisHistoric.sort((a, b) => new Date(b.created_at) -  new Date(a.created_at))[0];
      setAnimalsDetails({
        mostRecentAnalysis,
        animalAnalysisHistory,
        image: arrayToBase64(animal.image.data),
        identifier: animal.number_identification,
        name: animal.name,
      })
    } catch (error) {} finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    getAnimalDetails();
  }, [jwt]));

  return <AnimalDetails isLoading={isLoading} isExpandedCard={isExpandedCard} animalDetails={animalDetails} handleHistoryCardPres={handleHistoryCardPress} handleNewAnalysisPress={handleNewAnalysisPress} />
};