import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ResultsBackground from '../../assets/result_bg.svg';
import {getDescriptions} from './getDescriptions';
import IllnessPhaseIndicator from '../../assets/illness_phase_indicator.svg';
import FutureComplicationIcon from '../../assets/future_complications.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';

interface ProcessAnalysisResultsScreenProps {
  illnessName: string;
  illnessChancePercentage: number;
}

export const ProcessAnalysisResultsScreen: React.FC<
  ProcessAnalysisResultsScreenProps
> = ({illnessName = 'Dermatite', illnessChancePercentage = 0.504}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {illnessPhase, futureComplications, backgroundColor, infectionLevel} =
    getDescriptions(illnessChancePercentage);
  const isNormal = illnessName === 'Normal';

  const listingInformation = isNormal ? 'de acurácia' : 'de chance de infecção';
  const infectionLevelText = isNormal
    ? 'Baixas chances de se ter infecção'
    : infectionLevel;

  function handleSaveAnalysis() {
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultsCardContainer}>
        <View style={styles.resultsCard}>
          <View style={styles.artificialIntelligenceResult}>
            <Text style={styles.artificialIntelligenceResultLabel}>
              Resultado:
            </Text>
            <View>
              <Text style={styles.artificialIntelligenceResultValue}>
                {illnessName}
              </Text>
            </View>
          </View>
          <View style={styles.chancePercentage}>
            <View style={styles.chancePercentageInfoContainer}>
              <View
                style={[styles.chancePercentageIndicator, {backgroundColor}]}>
                <View style={styles.chancePercentageHolder}>
                  <View style={styles.resultsTextsContainer}>
                    <Text style={styles.chancePercentageText}>
                      {illnessChancePercentage}
                    </Text>
                    <Text style={styles.percentageFontSize}>%</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>{`${illnessChancePercentage}% ${listingInformation}`}</Text>
                <Text>{infectionLevelText}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.extraInformationContainer}>
        <ResultsBackground style={styles.resultsBackground} />
        <View style={styles.actionsContentContainer}>
          <View style={styles.resultsContentContainer}>
            <View style={styles.contentBlock}>
              <View style={styles.contentHeader}>
                <IllnessPhaseIndicator style={styles.contentIcons} />
                <View style={styles.headerSpacer} />
                <Text style={styles.contentTitle}>Fase de contaminação</Text>
              </View>
              <Text style={styles.contentText}>
                {isNormal
                  ? 'Existem baixas chances de o animal estar infectado, logo não apresenta nenhuma fase'
                  : illnessPhase}
              </Text>
            </View>
            <View style={styles.contentBlock}>
              <View style={styles.contentHeader}>
                <FutureComplicationIcon style={styles.contentIcons} />
                <View style={styles.headerSpacer} />
                <Text style={styles.contentTitle}>Complicações</Text>
              </View>
              <Text style={styles.contentText}>
                {isNormal
                  ? 'Existem baixas chances de o animal estar infectado, logo não apresenta nenhuma complicação'
                  : futureComplications}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonSaveAnalysis}
            onPress={handleSaveAnalysis}>
            <Text style={styles.buttonLabel}>Salvar análise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
