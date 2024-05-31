import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {TreatmentStatus} from './enums/status.enum';
import {colors} from '@/themes/colors/index.themes';
import {Illness} from './enums/illness.enum';
import BovineDermatophytosisIcon from '../../assets/bovine_dermatophytosis_icon.svg';
import BovineDermatophilosisIcon from '../../assets/bovine_dermatophilosis_icon.svg';
import {ICowInfosCard} from './types';

interface IChancePercentageComponent {
  illness: Illness;
  percentage: number;
}

const ChancePercentageComponent: React.FC<IChancePercentageComponent> = ({
  illness,
  percentage,
}) => {
  // TODO: Implement the visual representation of CONTAGIOUS_NODULAR_DERMATITIS
  function displayVisualRepresentationCP(): React.ReactNode {
    switch (illness) {
      case Illness.BOVINE_DERMATOPHYTOSIS:
        return (
          <BovineDermatophytosisIcon
            width={responsiveHorizontalScale(15)}
            height={responsiveVerticalScale(15)}
          />
        );
      case Illness.BOVINE_DERMATOPHILOSIS:
        return (
          <BovineDermatophilosisIcon
            width={responsiveHorizontalScale(15)}
            height={responsiveVerticalScale(15)}
          />
        );
      default:
        return;
    }
  }
  return (
    <View style={styles.displayChancesPercentage}>
      {displayVisualRepresentationCP()}
      <Text>{`${Math.round(percentage)}%`}</Text>
    </View>
  );
};

interface ITreatmentStatusComponent {
  status: TreatmentStatus;
}

const TreatmentStatusComponent: React.FC<ITreatmentStatusComponent> = ({
  status,
}) => {
  const displayVisualTreatmentStatus = {
    [TreatmentStatus.NO_TREATMENT]: {
      backgroundColor: colors.PURPLE,
    },
    [TreatmentStatus.IN_TREATMENT]: {
      backgroundColor: colors.ORANGE,
    },
    [TreatmentStatus.CONCLUDED_TREATMENT]: {
      backgroundColor: colors.LIGHT_BLUE,
    },
  };
  return (
    <View style={styles.displayTreatmentStatus}>
      <View
        style={[
          styles.displayVisualRepresentationST,
          {
            backgroundColor:
              displayVisualTreatmentStatus[status].backgroundColor,
          },
        ]}
      />
      <Text>{status}</Text>
    </View>
  );
};

export const CowInfosCard: React.FC<ICowInfosCard> = ({
  numberIdentification,
  name,
  treatmentStatus = TreatmentStatus.NO_TREATMENT,
  illness = Illness.BOVINE_DERMATOPHYTOSIS,
  chancePercentage = 30,
  onPress,
}) => {
  function displayChancePercentageIndicator() {
    switch (true) {
      case chancePercentage >= 10 && chancePercentage <= 39:
        return colors.LIGHT_GREEN;
      case chancePercentage >= 40 && chancePercentage <= 79:
        return colors.YELLOW;
      case chancePercentage >= 80:
        return colors.LIGHT_RED;
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: displayChancePercentageIndicator(),
        },
      ]}
      onPress={onPress}>
      <View style={styles.displayInformation}>
        <ImageBackground style={styles.displayCowImage} />
        <View style={styles.displayCowData}>
          <View
            style={[
              styles.displaySpacer,
              {width: responsiveHorizontalScale(147)},
            ]}>
            <Text>{numberIdentification}</Text>
            <Text>{name}</Text>
          </View>
          <View
            style={[
              styles.displaySpacer,
              {width: responsiveHorizontalScale(194)},
            ]}>
            <TreatmentStatusComponent status={treatmentStatus} />
            <ChancePercentageComponent
              illness={illness}
              percentage={chancePercentage}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
