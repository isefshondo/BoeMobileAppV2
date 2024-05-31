import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {CowAnalyticsCardProps} from './types';
import UpGreenIcon from '../../assets/up_green.svg';
import DownRedIcon from '../../assets/down_red.svg';

const displayCardsLabel = {
  CURRENT_REGISTERED_COWS: 'Registrados',
  CURRENT_POSITIVE_CASES: 'Casos Positivos',
};

export const CowAnalyticsCard: React.FC<CowAnalyticsCardProps> = ({
  type,
  value,
  increasedCasesValue,
  decreasedCasesValue,
}) => {
  const hasStatisticsInfo = type === 'CURRENT_POSITIVE_CASES';
  const hasAnalyticsData = value && value !== 0;

  return (
    <View style={styles.container}>
      <View style={hasStatisticsInfo ? styles.statisticsContainer : null}>
        <Text style={styles.textValue}>{hasAnalyticsData ? value : '--'}</Text>
        {hasStatisticsInfo && (
          <View style={styles.statisticsIconsContainer}>
            <View style={styles.visualRepresentationContainer}>
              <UpGreenIcon />
              <Text style={styles.textVisualRepresentation}>
                {increasedCasesValue}
              </Text>
            </View>
            <View style={styles.visualRepresentationContainer}>
              <DownRedIcon />
              <Text style={styles.textVisualRepresentation}>
                {decreasedCasesValue}
              </Text>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.textLabel}>{displayCardsLabel[type]}</Text>
    </View>
  );
};
