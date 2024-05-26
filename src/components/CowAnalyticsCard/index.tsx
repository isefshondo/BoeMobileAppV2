import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {CowAnalyticsCardProps, StatisticsInfoProps} from './types';
import UpGreenIcon from '../../assets/up_green.svg';
import DownRedIcon from '../../assets/down_red.svg';

const displayCardsLabel = {
  CURRENT_REGISTERED_COWS: 'Registrados',
  CURRENT_POSITIVE_CASES: 'Casos Positivos',
};

const StatisticsInfo: React.FC<StatisticsInfoProps> = ({
  elementIcon,
  statisticsValue,
  color,
}) => (
  <View style={styles.visualRepresentationContainer}>
    {elementIcon}
    <Text style={[styles.textVisualRepresentation, {color}]}>
      {statisticsValue}
    </Text>
  </View>
);

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
        {hasAnalyticsData && hasStatisticsInfo && (
          <View style={{justifyContent: 'space-evenly'}}>
            <StatisticsInfo
              elementIcon={<UpGreenIcon />}
              statisticsValue={increasedCasesValue}
              color="#00A140"
            />
            <StatisticsInfo
              elementIcon={<DownRedIcon />}
              statisticsValue={decreasedCasesValue}
              color="#C30000"
            />
          </View>
        )}
      </View>
      <Text style={styles.textLabel}>{displayCardsLabel[type]}</Text>
    </View>
  );
};
