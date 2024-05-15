import { colors } from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(119),
    borderRadius: 10,
    borderBottomWidth: responsiveVerticalScale(11),
    backgroundColor: '#ff0000',
    paddingLeft: responsiveHorizontalScale(21),
    paddingRight: responsiveHorizontalScale(56),
    paddingBottom: responsiveVerticalScale(24),
  },
  displayInformation: {
    width: '100%',
  },
  displayCowData: {
    width: responsiveHorizontalScale(194),
    height: responsiveVerticalScale(49),
    justifyContent: 'space-between',
  },
  displaySpacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayTreatmentStatus: {
    width: responsiveHorizontalScale(126),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayVisualRepresentationST: {
    width: responsiveHorizontalScale(17),
    height: responsiveVerticalScale(9),
    borderRadius: 13,
  },
  displayChancesPercentage: {
    width: responsiveHorizontalScale(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayCowImage: {
    width: responsiveHorizontalScale(72),
    height: responsiveVerticalScale(71),
    borderRadius: 10,
    backgroundColor: colors.LIGHT_GRAY,
  }
});
