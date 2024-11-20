import { responsiveHorizontalScale, responsiveVerticalScale } from '@/utils/metrics/index.utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type Diseases =
  | 'Dermatofitose bovina'
  | 'Dermatofilose bovina'
  | 'Dermatite nodular'
  | 'Berne'
  | 'Saudável';

interface DiseasesLabels {
  diseases?: Diseases;
  isCardComponent?: boolean;
}

export const DiseasesLabels: React.FC<DiseasesLabels> = ({
  diseases,
  isCardComponent,
}) => {
  const formattedDiseaseLabel = !isCardComponent
    ? diseases
    : diseases.split(' ')[0];
  const fontSize = !isCardComponent ? 23 : 10;
  const diseasesLabels = {
    'Dermatofitose bovina': {
      width: !isCardComponent ? 257 : 84,
      height: !isCardComponent ? 32 : 18,
      backgroundColor: '#ff12cb',
      color: '#fff',
      paddingHorizontal: 0,
    },
    'Dermatofilose bovina': {
      width: !isCardComponent ? 257 : 84,
      height: !isCardComponent ? 32 : 18,
      backgroundColor: '#8515e8',
      color: '#fff',
      paddingHorizontal: 0,
    },
    'Dermatite nodular': {
      width: !isCardComponent ? 257 : 63,
      height: !isCardComponent ? 32 : 18,
      backgroundColor: '#00dab6',
      color: '#001f3c',
      paddingHorizontal: 0,
    },
    'Berne': {
      width: !isCardComponent ? 0 : 43,
      height: !isCardComponent ? 28 : 18,
      backgroundColor: '#4a65cf',
      color: '#fff',
      paddingHorizontal: !isCardComponent ? 9 : 0,
    },
    'Saudável': {
      width: !isCardComponent ? 0 : 84,
      height: !isCardComponent ? 28 : 18,
      backgroundColor: '#ff12cb',
      color: '#fff',
    },
  };
  const defaultDisease = {
    width: 33,
    height: !isCardComponent ? 28 : 18,
    backgroundColor: '#f2f2f5',
    color: '#717171',
  };
  const {width, height, backgroundColor, color} = diseasesLabels[diseases] ?? defaultDisease;
  return (
    <View style={[{width: responsiveHorizontalScale(width), height: responsiveVerticalScale(height), backgroundColor}, styles.container]}>
      <Text style={[{color, fontSize}, styles.fontWeight]}>
        {formattedDiseaseLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  fontWeight: {
    fontWeight: 'bold',
  },
});
