import React from 'react';
import * as StorageInstance from '../../utils/storage/index.utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {CowAnalysisProps} from './types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';
import {getDescriptions} from '../ProcessAnalysisResultsScreen/getDescriptions';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from './styles';
import GoBackIcon from '../../assets/back_left_icon.svg';
import {arrayToBase64} from '@/utils/array-to-base64/index.utils';
import LoadingCow from '../../assets/loading_cow.svg';
import {colors} from '@/themes/colors/index.themes';

function displayIllnessSeverity(chancePercentage: number) {
  switch (true) {
    case chancePercentage >= 10 && chancePercentage < 39:
      return {
        text: 'baixa',
        color: colors.LIGHT_RED,
        textDescription: 'Poucas chances de infecção',
        analysisDescription:
          'As lesões ou sintomas observados não correspondem aos sinais típicos da doença.',
      };
    case chancePercentage >= 40 && chancePercentage < 79:
      return {
        text: 'moderado',
        color: colors.YELLOW,
        textDescription: 'Médias chances de infecção',
        analysisDescription:
          'As lesões ou sintomas observados correspondem aos sinais típicos da doença.',
      };
    case chancePercentage >= 80 && chancePercentage <= 100:
      return {
        text: 'alta',
        color: colors.LIGHT_RED,
        textDescription: 'Altas chances de infecção',
        analysisDescription:
          'As lesões ou sintomas observados correspondem aos sinais típicos da doença.',
      };
  }
}

type NavigationProps = NativeStackScreenProps<RootStackParams, 'CowDetails'>;

export const CowAnalysisScreen: React.FC<NavigationProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const storeCowId = route.params?.id;
  const [jwt, setJwt] = React.useState<string>('');
  const [selectedCowData, setSelectedCowData] =
    React.useState<CowAnalysisProps | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [illnessSeverity, setIllnessSeverity] = React.useState({
    text: '',
    color: '',
    textDescription: '',
    analysisDescription: '',
  });

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const useJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(useJWT);
  }

  async function fetchSelectedCowData() {
    try {
      // const res = await fetch(
      //   `http://192.168.3.105:3000/api/animal/${storeCowId}`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //   },
      // );

      const {animal, analysisHistoric} = {
        animal: {
          _id: '66ac2c450206d3ff098d8dbc',
          number_identification: 'AU0123',
          user_id: '66ac25df0044baaefefa3a59',
          name: 'Mimosa',
          created_at: '2024-08-02T00:46:37.238Z',
          disease_class: 'Dermatite',
          result: 'positivo',
          treatment_status: 'Sem tratamento',
          image: {
            data: new Uint8Array([255, 216, 255, 224, 0, 16, 74, 70, 73]),
          },
        },
        analysisHistoric: [
          {
            _id: '66ac2c450206d3ff098d8dbc',
            animal_id: '66ac2c450206d3ff098d8dbc',
            disease_class: 'Dermatite',
            treatment_status: 'Sem tratamento',
            accuracy: 0.5094009041786194,
            created_at: '2024-08-02T00:46:37.238Z',
            analysis_img: {
              data: new Uint8Array([255, 216, 255, 224, 0, 16, 74, 70, 73]),
            },
          },
        ],
      };

      const selectedCowHistoric = analysisHistoric.map(item => ({
        illnessName: item.disease_class,
        treatmentStatus: item.treatment_status,
        chancePercentage: item.accuracy,
        analysisDate: item.created_at,
        analysisDescription: getDescriptions(item.accuracy),
        // analysisImage: arrayToBase64(item.analysis_img.data),
      }));

      const mostRecentAnalysis = analysisHistoric.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      )[0];

      setSelectedCowData({
        numberIdentification: animal.number_identification,
        name: animal.name,
        selectedCowHistoric,
        // image: arrayToBase64(animal.image.data),
        mostRecentAnalysis,
      });
      setIllnessSeverity(
        displayIllnessSeverity(Math.round(mostRecentAnalysis.accuracy * 100)),
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNewAnalysisButtonPress() {
    navigation.navigate('ProcessAnalysisCamera', {id: storeCowId});
  }

  useFocusEffect(
    React.useCallback(() => {
      getJWTFromStorage();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (jwt) {
        fetchSelectedCowData();
      }
    }, [jwt]),
  );

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <LoadingCow />
        <Text>Carregando...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled
        nestedScrollEnabled
        style={styles.scrollViewContainer}>
        <View style={styles.header}>
          <GoBackIcon style={styles.goBackButton} onPress={navigation.goBack} />
        </View>
        <View style={styles.firstSpacer} />
        <View style={styles.mainDataContainer}>
          <View style={styles.cowDetailsContainer}>
            {/* <Image
              source={{uri: `data:image/jpeg;base64,${selectedCowData.image}`}}
              style={styles.cowProfilePicture}
            /> */}
            <View style={styles.cowPersonalInfoContainer}>
              <Text style={styles.numberIdentificationText}>
                {selectedCowData.numberIdentification}
              </Text>
              <TextInput
                value={selectedCowData.name}
                style={styles.nameTextInput}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.illnessInfoContainer}>
            <View>
              <Text style={styles.resultTextLabel}>Resultado</Text>
              <Text style={styles.resultText}>
                {selectedCowData.mostRecentAnalysis.disease_class}
              </Text>
            </View>
            <View style={styles.treatmentStatusContainer}>
              <Text style={styles.treatmentStatusTextLabel}>
                Status de tratamento
              </Text>
              <View style={styles.treatmentStatusText}>
                <View style={styles.treatmentStatusVR} />
                <Text style={styles.treatmentStatusTextRes}>
                  {selectedCowData.mostRecentAnalysis.treatment_status}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondSpacer} />
        <View style={styles.mostRecentAnalysisContainer}>
          <View style={styles.mostRecentAnalysisTitle}>
            <Text style={styles.lastAnalysisLabel}>Última análise</Text>
            <Text style={styles.dateText}>
              {`${new Date(
                selectedCowData.mostRecentAnalysis.created_at,
              ).getDay()}/${new Date(
                selectedCowData.mostRecentAnalysis.created_at,
              ).getMonth()}/${new Date(
                selectedCowData.mostRecentAnalysis.created_at,
              ).getFullYear()}`}
            </Text>
          </View>
          <View style={styles.lastAnalysisInfoContainer}>
            <View style={styles.accuracyContainer}>
              <View style={styles.circleResult}>
                <Text style={{fontSize: 32}}>
                  {Math.round(
                    selectedCowData.mostRecentAnalysis.accuracy * 100,
                  )}
                </Text>
                <Text style={{fontSize: 13}}>%</Text>
              </View>
              <View style={styles.resultsLastAnalysis}>
                <Text style={{fontSize: 17, color: illnessSeverity.color}}>
                  {illnessSeverity.text}
                </Text>
                <Text>{illnessSeverity.textDescription}</Text>
              </View>
            </View>
            <View style={styles.analysisDescriptionContainer}>
              {/* <Image
                source={{
                  uri: `data:image/jpeg;base64,${btoa(
                    arrayToBase64(
                      new Uint8Array(
                        selectedCowData.mostRecentAnalysis.analysis_img.data,
                      ),
                    ),
                  )}`,
                }}
                style={styles.analysisImage}
              /> */}
              <View style={styles.analysisDescriptionText}>
                <Text>Descrição da análise</Text>
                <Text>{illnessSeverity.analysisDescription}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
