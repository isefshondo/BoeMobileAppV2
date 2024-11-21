import React from 'react';
import {Diseases, DiseasesLabels} from './diseases-labels.component';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {colors} from '@/themes/colors/index.themes';
import {Avatar} from './avatar.component';
import {Status, StatusTypes} from './status.component';

interface AnimalListingCardProps {
  id: string;
  identifier: string;
  name: string;
  image?: string;
  treatmentStatus?: StatusTypes;
  disease?: Diseases;
  diseasePercentage?: number;
}

export const AnimalListingCard: React.FC<AnimalListingCardProps> = ({
  id,
  identifier,
  name,
  image,
  treatmentStatus,
  disease,
  diseasePercentage,
}) => {
  function getBottomBorderColor() {
    switch (true) {
      case diseasePercentage >= 10 && diseasePercentage < 40:
        return colors.LIGHT_GREEN;
      case diseasePercentage >= 40 && diseasePercentage < 80:
        return colors.YELLOW;
      case diseasePercentage >= 80:
        return colors.LIGHT_RED;
    }
  }
  const borderBottomColor = diseasePercentage
    ? getBottomBorderColor()
    : '#F2F2F5';
  return (
    <TouchableOpacity style={[styles.container, {borderBottomColor}]}>
      <Avatar width={72} height={71} image={image} isSquaredDisplay />
      <View style={styles.details}>
        <View style={styles.identifiers}>
          <Text style={styles.identifier}>{identifier}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.status}>
          <DiseasesLabels diseases={disease} isCardComponent />
          <Status label={treatmentStatus} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(119),
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: responsiveHorizontalScale(21),
    paddingBottom: responsiveVerticalScale(24),
    borderBottomWidth: responsiveVerticalScale(11),
    flexDirection: 'row',
    gap: responsiveHorizontalScale(25),
    elevation: 15,
    alignItems: 'center',
  },
  details: {
    width: responsiveHorizontalScale(221),
    height: responsiveVerticalScale(49),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  identifiers: {
    width: responsiveHorizontalScale(147),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  identifier: {
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
  },
  name: {
    fontSize: responsiveFontSize(22),
    fontWeight: '300',
  },
  status: {
    width: responsiveHorizontalScale(159),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
