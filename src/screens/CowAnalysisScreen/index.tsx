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
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from './styles';
import {arrayToBase64} from '@/utils/array-to-base64/index.utils';
import LoadingCow from '../../assets/loading_cow.svg';
import {colors} from '@/themes/colors/index.themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import GoBack from '../../assets/back_left_icon.svg';
import {Avatar} from '@/components/avatar.component';
import {Status} from '@/components/status.component';
import {Button} from '@/components/button.component';
import Plus from '../../assets/plus_icon.svg';
import {DiseasesLabels} from '@/components/diseases-labels.component';
import CircularProgress from '@/components/test.component';
import ToggleCardArrowDown from '../../assets/toggle-card-arrow-down.svg';
import {HistoryCard} from '@/components/history-card.component';

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
    React.useState<CowAnalysisProps | null>({
      image: '',
      mostRecentAnalysis: new Date(),
      name: 'Isabelle',
      numberIdentification: 'AU',
      selectedCowHistoric: [],
    });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
      const res = await fetch(
        `http://192.168.3.105:3000/api/animal/${storeCowId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      const {animal, analysisHistoric} = await res.json();

      const selectedCowHistoric = analysisHistoric.map(item => ({
        illnessName: item.disease_class,
        treatmentStatus: item.treatment_status,
        chancePercentage: item.accuracy,
        analysisDate: item.created_at,
        analysisDescription: getDescriptions(item.accuracy),
        analysisImage: arrayToBase64(item.analysis_img.data),
      }));

      const mostRecentAnalysis = analysisHistoric.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      )[0];

      setSelectedCowData({
        numberIdentification: animal.number_identification,
        name: animal.name,
        selectedCowHistoric,
        image: arrayToBase64(animal.image.data),
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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (jwt) {
  //       fetchSelectedCowData();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [jwt]),
  // );

  const [isExpandedCard, setIsExpandedCard] = React.useState(false);

  const handleHistoryCardClick = React.useCallback(() => {
    setIsExpandedCard(!isExpandedCard);
  }, [isExpandedCard, setIsExpandedCard]);

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <LoadingCow />
        <Text>Carregando...</Text>
      </View>
    );
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#fff'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{width: '100%', paddingLeft: responsiveHorizontalScale(34)}}>
            <GoBack width={33} height={33} />
          </View>
          <View
            style={{
              width: '100%',
              height: responsiveVerticalScale(268),
              justifyContent: 'space-between',
              paddingLeft: responsiveHorizontalScale(32),
              paddingRight: responsiveHorizontalScale(42),
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexGrow: 1}}>
                <Avatar width={95} height={95} isBorderedDisplay />
              </View>
              <View
                style={{
                  flexGrow: 3,
                  height: responsiveVerticalScale(80),
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 22, fontWeight: '600'}}>AU0278</Text>
                <TextInput
                  value="Chica"
                  style={{width: '100%', fontSize: 23, fontWeight: '300'}}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: responsiveVerticalScale(116),
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '300'}}>Resultado</Text>
                <DiseasesLabels diseases="Dermatofitose bovina" />
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 17, fontWeight: '600'}}>
                  Status de tratamento
                </Text>
                <Status label="Sem tratamento" isBoxedStatusDisplay />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              gap: responsiveVerticalScale(37),
              paddingLeft: responsiveHorizontalScale(32),
              paddingRight: responsiveHorizontalScale(44),
            }}>
            <Text style={{fontSize: 21, fontWeight: '600'}}>Histórico</Text>
            <View>
              <HistoryCard
                diseasePercentage={65}
                analysisDate="06/11/2024"
                analyzedImage=""
                isExpandedCard={isExpandedCard}
                setIsExpandedCard={handleHistoryCardClick}
              />
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  color: colors.LIGHT_BLUE,
                  textAlign: 'right',
                }}>
                Ver todas as análises
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          width: '100%',
          height: responsiveVerticalScale(119),
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 98, 119, .16)',
              shadowRadius: 30,
              shadowOpacity: 0.3,
              shadowOffset: {width: 0, height: 10},
            },
            android: {
              elevation: 15,
            },
          }),
        }}>
        <Button
          width={354}
          height={72}
          leftAssets={
            <View>
              <Text>+</Text>
            </View>
          }
          isRoundedButton>
          nova análise
        </Button>
      </View>
    </>
  );
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
