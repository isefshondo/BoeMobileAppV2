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
  const isStatistics = type === 'CURRENT_POSITIVE_CASES';
  const hasAnalyticsData = value && value !== 0;
  const valueWithOrWithoutPerc = isStatistics ? `${value}%` : value;

  return (
    <View
      style={
        !isStatistics
          ? [styles.container, styles.registeredAnimalsContainer]
          : styles.container
      }>
      <View style={isStatistics ? styles.statisticsContainer : null}>
        <Text style={styles.textValue}>
          {hasAnalyticsData ? valueWithOrWithoutPerc : '--'}
        </Text>
        {isStatistics && (
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
